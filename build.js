const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'www');

// Ensure www folder exists and is clean
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

// Files to copy
const files = [
  'index.html',
  'service-details.html',
  'settings.html',
  'manifest.webmanifest',
  'sw.js'
];

files.forEach(file => {
  const src = path.join(__dirname, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(outDir, file));
  }
});

// Directories to copy
const dirs = ['css', 'js', 'images'];

dirs.forEach(dir => {
  const src = path.join(__dirname, dir);
  if (fs.existsSync(src)) {
    fs.cpSync(src, path.join(outDir, dir), { recursive: true });
  }
});

console.log('Build complete: Assets copied to www/ successfully!');
