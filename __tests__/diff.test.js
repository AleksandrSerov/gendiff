import diff from '../src/diff';

describe('Testing diff.js', () => {
  const resultConfig = `
    {
        host: hexlet.io
      + timeout: 20
      - timeout: 50
      - proxy: 123.234.53.22
      - follow: false
      + verbose: true
    }`;
  const firstConfigAbsolutePath = `${__dirname}/__fixtures__/firstConfig`;
  const secondConfigAbsolutePath = `${__dirname}/__fixtures__/secondConfig`;

  const firstConfigRelativePath = './__tests__/__fixtures__/firstConfig';
  const secondConfigRelativePath = './__tests__/__fixtures__/secondConfig';

  const extNames = ['.json', '.yml', '.ini'];
  test.each(extNames)('Test diff absolute paths %s', (extName) => {
    const expected = resultConfig;
    const actual = diff(
      `${firstConfigAbsolutePath}${extName}`,
      `${secondConfigAbsolutePath}${extName}`,
    );

    expect(actual).toBe(expected);
  });

  test.each(extNames)('Test diff relative paths %s', (extName) => {
    const expected = resultConfig;
    const actual = diff(
      `${firstConfigRelativePath}${extName}`,
      `${secondConfigRelativePath}${extName}`,
    );

    expect(actual).toBe(expected);
  });
});
