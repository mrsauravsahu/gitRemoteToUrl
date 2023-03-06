const gitRemoteToUrl = (remote) => {
  if (typeof remote !== 'string' || remote === '') return '';

  const hostRegex = /@[a-zA-Z0-9.]+:/;
  const hostRepositoryRegex = /[a-zA-Z0-9]+@[a-zA-Z0-9.]+/;
  const noPrefixRegex = /^[a-zA-Z]+:\/\//;
  const http = 'http';

  // Copy remote string
  let gitRemote = remote.substr();

  if (gitRemote.startsWith(http)) {
    return gitRemote;
  }

  // Replace 'ssh' prefix  with 'http'
  gitRemote = gitRemote.replace(/^ssh/, http);

  if (!gitRemote.match(noPrefixRegex)) {
    gitRemote = `http://${gitRemote}`;
  }

  // Remove ':' after host and repository
  if (gitRemote.match(hostRegex)) {
    gitRemote = gitRemote.replace(hostRegex, p => `${p.substr(0, p.length - 1)}/`);
  }

  // Remove user from user@host format for ssh
  if (gitRemote.match(hostRepositoryRegex)) {
    gitRemote = gitRemote.replace(hostRepositoryRegex, p => p.split('@')[1]);
  }
  return gitRemote;
};

module.exports = gitRemoteToUrl;
