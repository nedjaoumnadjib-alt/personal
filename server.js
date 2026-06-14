import dotenv from "dotenv";
dotenv.config();

import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const PORT = Number(process.env.PORT || 10);
const API_TARGET = process.env.API_GATEWAY_TARGET || "http://localhost:5000";
const ORIGIN = process.env.CORS_ORIGIN || "*";
const SUPABASE_URL = (process.env.VITE_SUPABASE_URL || "").replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

const app = express();

// Security headers
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: ORIGIN }));
app.use(express.json());

// Global rate limiter for all requests
const globalLimiter = rateLimit({
  windowMs: Number(process.env.GLOBAL_RATE_WINDOW_MS || 60_000),
  max: Number(process.env.GLOBAL_RATE_MAX || 80),
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      status: "error",
      error: "Too many requests",
      message: "Global rate limit exceeded. Please wait and try again."
    });
  }
});

// API-specific rate limiter
const apiLimiter = rateLimit({
  windowMs: Number(process.env.API_RATE_WINDOW_MS || 60_000),
  max: Number(process.env.API_RATE_MAX || 30),
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      status: "error",
      error: "Too many requests",
      message: "API rate limit exceeded. Please slow down and retry later."
    });
  }
});

const formLimiter = rateLimit({
  windowMs: Number(process.env.FORM_RATE_WINDOW_MS || 15 * 60_000),
  max: Number(process.env.FORM_RATE_MAX || 5),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    error: "Too many submissions",
    message: "Too many form submissions from this IP. Please wait before trying again."
  }
});

const readLimiter = rateLimit({
  windowMs: Number(process.env.READ_RATE_WINDOW_MS || 60_000),
  max: Number(process.env.READ_RATE_MAX || 60),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    error: "Too many requests",
    message: "Too many reads from this IP. Please slow down."
  }
});

const adminLimiter = rateLimit({
  windowMs: Number(process.env.ADMIN_RATE_WINDOW_MS || 15 * 60_000),
  max: Number(process.env.ADMIN_RATE_MAX || 20),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    error: "Too many admin actions",
    message: "Too many admin updates from this IP. Please wait before trying again."
  }
});

const API_VERSION = process.env.API_VERSION || "v1";
const API_VERSION_PREFIX = `/${API_VERSION}`;
const versionedPath = (route) => [route, `${API_VERSION_PREFIX}${route}`];

function registerRoute(method, path, ...handlers) {
  versionedPath(path).forEach((routePath) => app[method](routePath, ...handlers));
}

function requireSupabaseConfig(res) {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) return true;

  res.status(500).json({
    status: "error",
    error: "Supabase is not configured",
    message: "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY on the server."
  });
  return false;
}

async function supabaseRest(path, { method = "GET", body, query = "", prefer = "return=representation" } = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}${query}`, {
    method,
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: prefer
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || data?.error || "Supabase request failed";
    throw new Error(message);
  }

  return data;
}

app.use(globalLimiter);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    gateway: true,
    target: API_TARGET,
    timestamp: new Date().toISOString()
  });
});

registerRoute("get", "/requests", readLimiter, async (req, res) => {
  if (!requireSupabaseConfig(res)) return;

  try {
    const data = await supabaseRest("requests", {
      query: "?select=*&order=date.desc"
    });
    res.json({ status: "ok", data });
  } catch (error) {
    res.status(502).json({ status: "error", error: "Supabase request failed", message: error.message });
  }
});

registerRoute("post", "/requests", formLimiter, async (req, res) => {
  if (!requireSupabaseConfig(res)) return;

  const request = req.body || {};
  if (!request.id || !request.name || !request.email || !request.type) {
    res.status(400).json({ status: "error", error: "Invalid request", message: "Name, email, type, and id are required." });
    return;
  }

  try {
    const data = await supabaseRest("requests", {
      method: "POST",
      body: [request]
    });
    res.status(201).json({ status: "ok", data });
  } catch (error) {
    res.status(502).json({ status: "error", error: "Supabase request failed", message: error.message });
  }
});

registerRoute("patch", "/requests/:id/status", adminLimiter, async (req, res) => {
  if (!requireSupabaseConfig(res)) return;

  const { id } = req.params;
  const { status } = req.body || {};
  const allowedStatuses = new Set(["pending", "reviewed", "accepted", "declined"]);

  if (!allowedStatuses.has(status)) {
    res.status(400).json({ status: "error", error: "Invalid status", message: "Status is not allowed." });
    return;
  }

  try {
    await supabaseRest("requests", {
      method: "PATCH",
      query: `?id=eq.${encodeURIComponent(id)}`,
      body: { status },
      prefer: "return=minimal"
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.status(502).json({ status: "error", error: "Supabase request failed", message: error.message });
  }
});

registerRoute("get", "/testimonials", readLimiter, async (req, res) => {
  if (!requireSupabaseConfig(res)) return;

  try {
    const data = await supabaseRest("testimonials", {
      query: "?select=request_id,name,role,text,rating,created_at&order=created_at.desc"
    });
    res.json({ status: "ok", data });
  } catch (error) {
    res.status(502).json({ status: "error", error: "Supabase request failed", message: error.message });
  }
});

registerRoute("post", "/testimonials", formLimiter, async (req, res) => {
  if (!requireSupabaseConfig(res)) return;

  const testimonial = req.body || {};
  if (!testimonial.name || !testimonial.text) {
    res.status(400).json({ status: "error", error: "Invalid testimonial", message: "Name and review text are required." });
    return;
  }

  try {
    const data = await supabaseRest("testimonials", {
      method: "POST",
      body: [testimonial]
    });
    res.status(201).json({ status: "ok", data });
  } catch (error) {
    res.status(502).json({ status: "error", error: "Supabase request failed", message: error.message });
  }
});

app.use(
  "/api",
  apiLimiter,
  createProxyMiddleware({
    target: API_TARGET,
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
    onProxyReq(proxyReq, req) {
      proxyReq.setHeader("X-Forwarded-Host", req.headers.host || "");
      proxyReq.setHeader("X-Forwarded-Proto", req.protocol);
    },
    onError(err, req, res) {
      console.error("API Gateway proxy error:", err.message);
      if (!res.headersSent) {
        res.status(502).json({
          status: "error",
          error: "Bad Gateway",
          message: "Unable to reach backend service."
        });
      }
    }
  })
);

app.use((req, res) => {
  res.status(404).json({ status: "error", error: "Not Found", message: "The requested resource was not found on the API gateway." });
});

app.listen(PORT, () => {
  console.log(`API Gateway started on http://localhost:${PORT}`);
  console.log(`Forwarding /api requests to ${API_TARGET}`);
});
