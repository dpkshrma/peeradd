#!/usr/bin/env node

const { exec } = require('child_process');

const [,, inputDep, opt] = process.argv;

let pkgManager = 'npm';
if (opt === '--use-yarn' || opt === '-y') {
  pkgManager = 'yarn';
}

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

const installDep = (dep) => {
  console.log(`Installing ${dep} ...`);
  let cmd;
  if (pkgManager === 'npm') {
    cmd = `npm install ${dep}`;
  } else {
    cmd = `yarn add ${dep}`;
  }
  return new Promise((resolve) => {
    exec(cmd, (peerError, peerStdout, peerStderr) => {
      handleErrors(peerError, peerStderr);
      console.log(peerStdout);
      resolve(peerStdout);
    });
  });
};

const syncInstallDeps = (deps) => {
  if (!deps.length) return;

  installDep(deps[0])
    .then(() => {
      syncInstallDeps(deps.slice(1));
    });
};

const formatDeps = deps => Object.keys(deps).map((depName) => {
  const depVersion = deps[depName];
  return `${depName}@${depVersion}`;
});

const run = () => {
  exec(`npm info ${inputDep} peerDependencies --json`, (error, stdout, stderr) => {
    handleErrors(error, stderr);

    if (stdout.length) {
      const deps = JSON.parse(stdout); // TODO: handle exception
      // install all deps
      console.log(`${Object.keys(deps).length} peer dependencies found.`);
      syncInstallDeps(formatDeps(deps));
    } else {
      console.log('No peer dependencies found');
      process.exit(0);
    }
  });
};

run();
