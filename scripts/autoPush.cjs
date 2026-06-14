#!/usr/bin/env node
/*
  CommonJS version of autoPush for projects using ESM by default.
*/
const { execSync } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');

const WATCH_GLOB = [
  'src/**',
  'public/**',
  'package.json',
  'vite.config.js'
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
    try { git(`commit -m "${msg.replace(/"/g, '\\"')}");`); } catch (e) { /* ignore commit failures */ }
    console.log('[autoPush] Pushing to origin...');
    git('push');
    console.log('[autoPush] Push complete');
  } catch (err) {
    console.error('[autoPush] Git error:', err && err.message ? err.message : err);
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
