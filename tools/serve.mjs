// Minimal static server for dist/ — serves /path/ → /path/index.html and a real 404.
//   node tools/serve.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const PORT = Number(process.argv[2]) || 4173;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.xml': 'application/xml', '.txt': 'text/plain', '.svg': 'image/svg+xml' };

http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  let file = path.join(DIST, p);
  if (!file.startsWith(DIST)) { res.writeHead(403).end(); return; }
  const isFile = (f) => fs.existsSync(f) && fs.statSync(f).isFile();
  if (!isFile(file) && isFile(path.join(file, 'index.html'))) {
    res.writeHead(301, { Location: p + '/' }).end(); return; // trailing-slash canonical form
  }
  let status = 200;
  if (!isFile(file)) { file = path.join(DIST, '404.html'); status = 404; }
  res.writeHead(status, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`ROS prototype → http://localhost:${PORT}/`));
