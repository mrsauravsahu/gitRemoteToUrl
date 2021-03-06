const shell = require('shelljs');

// make shelljs silent
shell.config.silent = true;

// Read temporary directory location from ENV
const packageName = 'git-remote-to-url';
const packageBin = process.env.GRTU_ABSOLUTE_PATH || 'grtu';
const testLocation = process.env.GRTU_TEST_DIR || `/tmp/${packageName}`;

describe(packageName, () => {
  beforeAll(() => {
    shell.mkdir(testLocation);

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
        shell.exec(`sh -c 'cd ${testLocation}/${folder} && git init && git remote add origin ${section.urlGenerator(folder)}'`);
      });
    });
  });

  afterAll(() => shell.exec(`rm -rf ${testLocation}`));

  describe('should return error', () => {
    test('when folder does not exist', () => {
      const directory = `${testLocation}/some-random-folder`;
      const output = shell.exec(`sh -c '${packageBin} ${directory}'`);
      expect(output.stdout).toContain('Error: the directory specified does not exist.');
    });
    test('when folder is not a git repository', () => {
      const directory = `${testLocation}`;
      const output = shell.exec(`sh -c 'cd ${directory} && ${packageBin}'`);
      expect(output.stdout).toContain('Error: the directory specified is not a git repository.');
    });
  });

  describe('should return git remote', () => {
    describe('when remote is https', () => {
      test('when cd\'d to folder which exists and is a git repository', () => {
        const directory = `${testLocation}/githttp1`;
        const output = shell.exec(`sh -c 'cd ${directory} && ${packageBin} .'`);

        expect(output.code === 0);
        expect(output.stdout).toContain('http://github.com/githttp1.git');
      });

      test('when folder is passed as arg and is a git repository', () => {
        const directory = `${testLocation}/githttp2`;
        const output = shell.exec(`${packageBin} ${directory}`);

        expect(output.code === 0);
        expect(output.stdout).toContain('http://github.com/githttp2.git');
      });
    });

    describe('when remote is ssh', () => {
      test('when cd\'d to folder which exists and is a git repository', () => {
        const directory = `${testLocation}/gitssh1`;
        const output = shell.exec(`sh -c 'cd ${directory} && ${packageBin} .'`);

        expect(output.code === 0);
        expect(output.stdout).toContain('http://github.com/gitssh1.git');
      });

      test('when folder is passed as arg and is a git repository', () => {
        const directory = `${testLocation}/gitssh2`;
        const output = shell.exec(`${packageBin} ${directory}`);

        expect(output.code === 0);
        expect(output.stdout).toContain('http://github.com/gitssh2.git');
      });
    });
  });
});
