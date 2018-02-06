#!/usr/bin/env node

const { exec } = require('child_process');

const handleErrors = (error, stderr) => {
  if (error !== null) {
    console.log(`exec error: ${error}`);
    process.exit(1);
  }
  if (stderr.length) {
    console.log(`stderr: ${stderr}`);
    process.exit(1);
  }
};

const [,, dep, opt] = process.argv;

let pkgManager = 'npm';
if (opt === '--use-yarn' || opt === '-y') {
  pkgManager = 'yarn';
}

exec(`npm info ${dep} peerDependencies --json`, (error, stdout, stderr) => {
  handleErrors(error, stderr);

  if (stdout.length) {
    const deps = JSON.parse(stdout); // TODO: handle exception
    // install all deps
    Object.keys(deps).forEach((depName) => {
      const depVersion = deps[depName];
      let cmd;
      if (pkgManager === 'npm') {
        cmd = `npm install ${depName}@${depVersion}`;
      } else {
        cmd = `yarn add ${depName}@${depVersion}`;
      }
      exec(cmd, (peerError, peerStdout, peerStderr) => {
        handleErrors(peerError, peerStderr);
        console.log(peerStdout);
      });
    });
  } else {
    console.log('no peer dependencies found');
    process.exit(0);
  }
});
