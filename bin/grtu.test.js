const shell = require('shelljs');

// make shelljs silent
shell.config.silent = true;

const mainCommandName = 'grtu';
const testLocation = `${__dirname}/test-folder`;

describe(mainCommandName, () => {
  beforeAll(() => {
    shell.mkdir(testLocation);
    shell.mkdir(`/tmp/${mainCommandName}`);

    const validDirectoriesWithHttpRemotes = {
      folders: ['githttp1', 'githttp2'],
      urlGenerator: folder => `http://github.com/${folder}.git`,
    };
    const validDirectoriesWithSSHRemotes = {
      folders: ['gitssh1', 'gitssh2'],
      urlGenerator: folder => `ssh://git@github.com/${folder}.git`,
    };

    [
      validDirectoriesWithHttpRemotes,
      validDirectoriesWithSSHRemotes,
    ].forEach((section) => {
      section.folders.forEach((folder) => {
        shell.mkdir(`${testLocation}/${folder}`);
        shell.exec(`bash -c 'cd ${testLocation}/${folder} && git init && git remote add origin ${section.urlGenerator(folder)}'`);
      });
    });
  });

  afterAll(() => {
    shell.exec(`rm -rf ${testLocation}`);
    shell.exec(`rm -rf /tmp/${mainCommandName}`);
  });

  describe('should return error', () => {
    test('when folder does not exist', () => {
      const directory = `${testLocation}/some-random-folder`;
      const output = shell.exec(`bash -c '${mainCommandName} ${directory}'`);
      expect(output.stdout).toContain('Error: the directory specified does not exist.');
    });
    test('when folder is not a git repository', () => {
      const directory = `/tmp/${mainCommandName}`;
      const output = shell.exec(`bash -c 'cd ${directory} && ${mainCommandName}'`);
      expect(output.stdout).toContain('Error: the directory specified is not a git repository.');
    });
  });

  describe('should return git remote', () => {
    describe('when remote is https', () => {
      test('when cd\'d to folder which exists and is a git repository', () => {
        const directory = `${testLocation}/githttp1`;
        const output = shell.exec(`bash -c 'cd ${directory} && ${mainCommandName} .'`);

        expect(output.code === 0);
        expect(output.stdout).toContain('http://github.com/githttp1.git');
      });

      test('when folder is passed as arg and is a git repository', () => {
        const directory = `${testLocation}/githttp2`;
        const output = shell.exec(`${mainCommandName} ${directory}`);

        expect(output.code === 0);
        expect(output.stdout).toContain('http://github.com/githttp2.git');
      });
    });

    describe('when remote is ssh', () => {
      test('when cd\'d to folder which exists and is a git repository', () => {
        const directory = `${testLocation}/gitssh1`;
        const output = shell.exec(`bash -c 'cd ${directory} && ${mainCommandName} .'`);

        expect(output.code === 0);
        expect(output.stdout).toContain('http://github.com/gitssh1.git');
      });

      test('when folder is passed as arg and is a git repository', () => {
        const directory = `${testLocation}/gitssh2`;
        const output = shell.exec(`${mainCommandName} ${directory}`);

        expect(output.code === 0);
        expect(output.stdout).toContain('http://github.com/gitssh2.git');
      });
    });
  });
});
