#!/usr/bin/env node
/*
  Simple file watcher that auto-adds, commits and pushes changes.
  WARNING: Automatic commits and pushes can overwrite remote history and push unintended changes.
  Use with care. Make sure your local branch is correctly set and you have working credentials (SSH or cached credentials).
*/
const { execSync } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');

const WATCH_GLOB = [
  'src/**',
  'public/**',
  'package.json',
  'vite.config.js',
  'my-portfolio/**'
];

const DEBOUNCE_MS = 1500;

let timeout = null;
let pendingFiles = new Set();

function git(cmd) {
  return execSync(`git ${cmd}`, { stdio: 'pipe' }).toString().trim();
}

function pushChanges() {
  if (pendingFiles.size === 0) return;
  const files = Array.from(pendingFiles).slice(0, 10).join(', ');
  const msg = `Auto: update ${files}`;
  try {
    console.log('[autoPush] Staging...');
    git('add -A');
    console.log('[autoPush] Committing...');
    git(`commit -m "${msg.replace(/"/g, '\\"')}" || true`);
    console.log('[autoPush] Pushing to origin...');
    git('push');
    console.log('[autoPush] Push complete');
  } catch (err) {
    console.error('[autoPush] Git error:', err.message || err);
  } finally {
    pendingFiles.clear();
  }
}

const watcher = chokidar.watch(WATCH_GLOB, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true,
});

watcher.on('all', (event, filePath) => {
  const rel = path.relative(process.cwd(), filePath);
  pendingFiles.add(rel);
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    pushChanges();
  }, DEBOUNCE_MS);
});

console.log('[autoPush] Watching for file changes. Press Ctrl+C to stop.');
