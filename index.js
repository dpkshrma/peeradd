#!/usr/bin/env node

const { exec } = require('child_process');
const { options: { getOptions }, usage } = require('./cmd');

const options = getOptions();

const useYarn = options['use-yarn'];
const { dev: devDep, help } = options;

const [inputDep] = options._unknown || []; // eslint-disable-line

if (!inputDep) {
  console.log(usage);
  process.exit(1);
}
if (help) {
  console.log(usage);
  process.exit(0);
}

let pkgManager = 'npm';
if (useYarn) {
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

const getCommand = (dep) => {
  let cmd;
  if (pkgManager === 'npm') {
    cmd = `npm install ${dep}`;
    if (devDep) {
      cmd = `${cmd} --save-dev`;
    }
  } else {
    cmd = `yarn add ${dep}`;
    if (devDep) {
      cmd = `${cmd} --dev`;
    }
  }
  return cmd;
};

const installDep = (dep) => {
  console.log(`Installing ${dep} ...`);
  const cmd = getCommand(dep);
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
