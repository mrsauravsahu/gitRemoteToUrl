#!/usr/bin/env node
const shell = require('shelljs');
const gitRemoteToUrl = require('../git-remote-to-url');

// make shelljs silent
shell.config.silent = true;

const location = process.argv[2] || shell.pwd().stdout;

const commandCheckDirectoryExists = directory =>
  `test -d "${directory}"`;
const commandCheckGitRepo = 'git rev-parse --is-inside-work-tree';
const commandGetGitRemote = (remote = 'origin') =>
  `bash -c 'git remote get-url ${remote}'`;

// check if directory passed exists && it is a git repo
const doesDirectoryExist = shell.exec(commandCheckDirectoryExists(location)).code === 0;

if (doesDirectoryExist) {
  const isGitRepo = shell.exec(commandCheckGitRepo, {
    cwd: location,
  }).stdout.match(/true/) !== null;

  if (isGitRepo) {
    const gitRemote = shell.exec(commandGetGitRemote(), {
      cwd: location,
    });
    if (gitRemote.code === 0) {
      console.log(gitRemoteToUrl(gitRemote.stdout));
      process.exit(0);
    } else {
      console.log('Error: could not return repository url.');
    }
  } else {
    console.log('Error: the directory specified is not a git repository.');
  }
} else console.log('Error: the directory specified does not exist.');
