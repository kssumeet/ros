// Starts the static server, runs the full QA suite against it, then shuts down.
//   npm test   (after `npm install` and `npm run qa:install`)
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const server = spawn(process.execPath, [path.join(here, 'serve.mjs'), '4173'], { stdio: 'inherit' });
await new Promise((r) => setTimeout(r, 800));
const qa = spawn(process.execPath, [path.join(here, 'qa.js')], { stdio: 'pipe' });
let out = '';
qa.stdout.on('data', (d) => { out += d; process.stdout.write(d); });
qa.stderr.on('data', (d) => process.stderr.write(d));
qa.on('close', (code) => {
  server.kill();
  const failed = /FAIL (\d+)/.exec(out);
  process.exit(code || (failed && +failed[1] > 0) ? 1 : 0);
});
