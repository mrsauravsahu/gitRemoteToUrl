const gitRemoteToUrl = (remote) => {
  const HOSTCOLONREGEX = /@[a-zA-Z0-9\.]+:/;
  const HOSTREPOREGEX = /[a-zA-Z0-9]+@[a-zA-Z0-9\.]+/;

  const http = 'http';
  let gitRemote = remote;

  if (typeof gitRemote !== 'string' || gitRemote === '') {
    return '';
  } else if (gitRemote.startsWith(http)) return gitRemote;
  else if (gitRemote.startsWith('ssh')) {
    // Replace 'ssh://' with 'http://'
    gitRemote = gitRemote.replace(/^ssh/, http);
  } else {
    gitRemote = `${http}://${gitRemote}`;
  }
  // Remove : after host and repo
  const hostRepoMatches = gitRemote.match(HOSTCOLONREGEX) || [];
  if (hostRepoMatches.length > 0) {
    gitRemote = gitRemote.replace(HOSTCOLONREGEX, p => `${p.substr(0, p.length - 1)}/`);
  }

  // Remove user from user@host format for ssh
  const userAtHostMatches = gitRemote.match(HOSTREPOREGEX) || [];
  if (userAtHostMatches.length > 0) {
    gitRemote = gitRemote.replace(HOSTREPOREGEX, p => p.split('@')[1]);
  }
  return gitRemote;
};

module.exports = gitRemoteToUrl;
