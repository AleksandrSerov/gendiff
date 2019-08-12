import fs from 'fs';
import diff from '../src';

describe('Testing diff.js', () => {
  const firstConfigAbsulutePath = `${__dirname}/__fixtures__/first`;
  const secondConfigAbsulutePath = `${__dirname}/__fixtures__/second`;

  const firstConfigRelativePath = './__tests__/__fixtures__/first';
  const secondConfigRelativePath = './__tests__/__fixtures__/second';

  const extNames = ['.json', '.yml', '.ini'];
  it('Relative paths', () => {
    const path = `${__dirname}/__fixtures__/expected/pretty`;
    const expected = fs.readFileSync(path, 'utf-8');
    const actual = diff(
      `${firstConfigRelativePath}.json`,
      `${secondConfigRelativePath}.json`,
    );
    expect(actual).toBe(expected);
  });

  describe('Formats', () => {
    test.each(extNames)('pretty && %s', (extName) => {
      const path = `${__dirname}/__fixtures__/expected/pretty`;

      const expected = fs.readFileSync(path, 'utf-8');
      const actual = diff(
        `${firstConfigAbsulutePath}${extName}`,
        `${secondConfigAbsulutePath}${extName}`,
        'pretty',
      );

      expect(actual).toBe(expected);
    });

    test.each(extNames)('plain && %s', (extName) => {
      const path = `${__dirname}/__fixtures__/expected/plain`;
      const expected = fs.readFileSync(path, 'utf-8');

      const actual = diff(
        `${firstConfigRelativePath}${extName}`,
        `${secondConfigRelativePath}${extName}`,
        'plain',
      );

      expect(actual).toBe(expected);
    });

    test.each(extNames)('json && %s', (extName) => {
      const path = `${__dirname}/__fixtures__/expected/json`;
      const expected = fs.readFileSync(path, 'utf-8');

      const actual = diff(
        `${firstConfigRelativePath}${extName}`,
        `${secondConfigRelativePath}${extName}`,
        'json',
      );

      expect(JSON.parse(actual)).toEqual(JSON.parse(expected));
    });
  });
});
