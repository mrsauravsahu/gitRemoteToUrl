const gitRemoteToUrl = require('./git-remote-to-url');

describe(gitRemoteToUrl.name, () => {
  describe('should return empty string', () => {
    test('when input is null', () => {
      expect(gitRemoteToUrl(null)).toBe('');
    });

    test('when input is undefined', () => {
      expect(gitRemoteToUrl()).toBe('');
    });

    test('when input is of invalid type', () => {
      expect(gitRemoteToUrl([1, 2, 3])).toBe('');
    });
  });

  describe('should return the input string', () => {
    test('when remote url is a valid http url', () => {
      expect(gitRemoteToUrl('https://github.com/saurav-sahu/tdd-addArrays.git'))
        .toBe('https://github.com/saurav-sahu/tdd-addArrays.git');
    });
  });

  describe('should return the url', () => {
    test('when input is an ssh git remote', () => {
      expect(gitRemoteToUrl('ssh://git@github.com/saurav-sahu/git-remote-to-url.git'))
        .toBe('http://github.com/saurav-sahu/git-remote-to-url.git');
    });

    test('when the input remote\'s host and repo are separated by a \':\'', () => {
      expect(gitRemoteToUrl('git@github.com:saurav-techuniv2018/scoring-bowling.git'))
        .toBe('http://github.com/saurav-techuniv2018/scoring-bowling.git');
    });
  });
});

