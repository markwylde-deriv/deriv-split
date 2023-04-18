import http from 'http';
import { promises as fs } from 'fs';
import servatron from 'servatron/http.js';
import chokidar from 'chokidar';
import debounce from 'debounce';
import { spawn } from 'child_process';

function exec (command, cwd) {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');
    const childProcess = spawn(cmd, args, { cwd, stdio: 'inherit' });

    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command "${command}" exited with code ${code}`));
      }
    });

    childProcess.on('error', (error) => {
      reject(error);
    });
  });
}

async function copyFiles(srcDestPairs) {
  for (const [src, dest] of srcDestPairs) {
    await fs.cp(src, dest, { errorOnExist: false, force: true, recursive: true });
  }
}

async function build(entrypoint, destination = '') {
  await exec('npm run build', entrypoint);;
  await copyFiles([[`${entrypoint}/dist`, `dist/${destination}`]]);
}

async function buildAll () {
  console.log('building...');

  await build(
    'packages/deriv-browser-client'
  );
  
  build(
    'packages/dashboard',
  );
  
  build(
    'packages/example1',
    'example1',
  );
  
  build(
    'packages/example2',
    'example2',
  );
}

await fs.rm('dist', { recursive: true, force: true });

chokidar.watch(`packages/*/src/**/*`, { ignoreInitial: false }).on('all', debounce(buildAll, 100));


const staticHandler = servatron({
  directory: './dist',
  spa: true,
  spaIndex: 'index.html'
});

http.createServer(staticHandler).listen(8000);

console.log('Listening on', 'http://localhost:8000');
