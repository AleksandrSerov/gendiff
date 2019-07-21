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

  const resultRecursiveConfig = `
    {
        common: {
          + follow: false
            setting1: Value 1
          - setting2: 200
          - setting3: true
          + setting3: {
                key: value
            }
            setting6: {
                key: value
              + ops: vops
            }
          + setting4: blah blah
          + setting5: {
                key5: value5
            }
        }
        group1: {
          + baz: bars
          - baz: bas
            foo: bar
          - nest: {
                key: value
            }
          + nest: str
        }
      - group2: {
            abc: 12345
        }
      + group3: {
            fee: 100500
        }
    }`;

  const firstConfigAbsolutePath = `${__dirname}/__fixtures__/flatConfigs/firstConfig`;
  const secondConfigAbsolutePath = `${__dirname}/__fixtures__/flatConfigs/secondConfig`;

  const firstRecursiveConfigAbsulutePath = `${__dirname}/__fixtures__/recursiveConfigs/firstRecursiveConfig`;
  const secondRecursiveConfigAbsulutePath = `${__dirname}/__fixtures__/recursiveConfigs/secondRecursiveConfig`;

  const firstConfigRelativePath = './__tests__/__fixtures__/flatConfigs/firstConfig';
  const secondConfigRelativePath = './__tests__/__fixtures__/flatConfigs/secondConfig';

  const firstRecursiveConfigRelativePath = './__tests__/__fixtures__/recursiveConfigs/firstConfig';
  const secondRecursiveConfigRelativePath = './__tests__/__fixtures__/recursiveConfigs/secondConfig';

  const extNames = ['.json', '.yml', '.ini'];
  test.each(extNames)('Test flat diff absolute paths %s', (extName) => {
    const expected = resultConfig;
    const actual = diff(
      `${firstConfigAbsolutePath}${extName}`,
      `${secondConfigAbsolutePath}${extName}`,
    );

    expect(actual).toBe(expected);
  });

  test.each(extNames)('Test flat diff relative paths %s', (extName) => {
    const expected = resultConfig;
    const actual = diff(
      `${firstConfigRelativePath}${extName}`,
      `${secondConfigRelativePath}${extName}`,
    );

    expect(actual).toBe(expected);
  });

  test.each(extNames)('Test recursive diff relative paths %s', (extName) => {
    const expected = resultRecursiveConfig;
    const actual = diff(
      `${firstRecursiveConfigRelativePath}${extName}`,
      `${secondRecursiveConfigRelativePath}${extName}`,
    );

    expect(actual).toBe(expected);
  });

  test.each(extNames)('Test recursive diff absolute paths %s', (extName) => {
    const expected = resultRecursiveConfig;
    const actual = diff(
      `${firstRecursiveConfigAbsulutePath}${extName}`,
      `${secondRecursiveConfigAbsulutePath}${extName}`,
    );

    expect(actual).toBe(expected);
  });
});
