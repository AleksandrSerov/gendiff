import fs from 'fs';
import diff from '../src/diff';

describe('Testing diff.js', () => {
  const firstFlatConfigAbsolutePath = `${__dirname}/__fixtures__/flat/first`;
  const secondFlatConfigAbsolutePath = `${__dirname}/__fixtures__/flat/second`;

  const firstNestedConfigAbsulutePath = `${__dirname}/__fixtures__/nested/first`;
  const secondNestedConfigAbsulutePath = `${__dirname}/__fixtures__/nested/second`;

  const firstConfigRelativePath = './__tests__/__fixtures__/flat/first';
  const secondConfigRelativePath = './__tests__/__fixtures__/flat/second';

  const firstNestedConfigRelativePath = './__tests__/__fixtures__/nested/first';
  const secondNestedConfigRelativePath =
    './__tests__/__fixtures__/nested/second';

  const extNames = ['.json', '.yml', '.ini'];

  describe('Flat configs', () => {
    test.each(extNames)('pretty && absolute paths %s ', (extName) => {
      const path = `${__dirname}/__fixtures__/flat/expected/pretty`;
      const expected = fs.readFileSync(path, 'utf-8');
      const actual = diff(
        `${firstFlatConfigAbsolutePath}${extName}`,
        `${secondFlatConfigAbsolutePath}${extName}`,
        'pretty',
      );

      expect(actual).toBe(expected);
    });

    test.each(extNames)('pretty && relative paths %s', (extName) => {
      const path = `${__dirname}/__fixtures__/flat/expected/pretty`;
      const expected = fs.readFileSync(path, 'utf-8');
      const actual = diff(
        `${firstConfigRelativePath}${extName}`,
        `${secondConfigRelativePath}${extName}`,
        'pretty',
      );

      expect(actual).toBe(expected);
    });

    test.each(extNames)('plain && absolute paths %s ', (extName) => {
      const path = `${__dirname}/__fixtures__/flat/expected/plain`;
      const expected = fs.readFileSync(path, 'utf-8');
      const actual = diff(
        `${firstFlatConfigAbsolutePath}${extName}`,
        `${secondFlatConfigAbsolutePath}${extName}`,
        'plain',
      );

      expect(actual).toBe(expected);
    });

    test.each(extNames)('plain && relative paths %s', (extName) => {
      const path = `${__dirname}/__fixtures__/flat/expected/plain`;
      const expected = fs.readFileSync(path, 'utf-8');
      const actual = diff(
        `${firstConfigRelativePath}${extName}`,
        `${secondConfigRelativePath}${extName}`,
        'plain',
      );

      expect(actual).toBe(expected);
    });
  });

  describe('Nested configs', () => {
    test.each(extNames)('pretty && absolute paths %s', (extName) => {
      const path = `${__dirname}/__fixtures__/nested/expected/pretty`;

      const expected = fs.readFileSync(path, 'utf-8');
      const actual = diff(
        `${firstNestedConfigAbsulutePath}${extName}`,
        `${secondNestedConfigAbsulutePath}${extName}`,
        'pretty',
      );

      expect(actual).toBe(expected);
    });

    test.each(extNames)('pretty && relative paths %s', (extName) => {
      const path = `${__dirname}/__fixtures__/nested/expected/pretty`;
      const expected = fs.readFileSync(path, 'utf-8');

      const actual = diff(
        `${firstNestedConfigRelativePath}${extName}`,
        `${secondNestedConfigRelativePath}${extName}`,
        'pretty',
      );

      expect(actual).toBe(expected);
    });

    test.each(extNames)('plain && relative paths %s', (extName) => {
      const path = `${__dirname}/__fixtures__/nested/expected/plain`;
      const expected = fs.readFileSync(path, 'utf-8');

      const actual = diff(
        `${firstNestedConfigRelativePath}${extName}`,
        `${secondNestedConfigRelativePath}${extName}`,
        'plain',
      );

      expect(actual).toBe(expected);
    });

    test.each(extNames)('plain && absolute paths %s', (extName) => {
      const path = `${__dirname}/__fixtures__/nested/expected/plain`;

      const expected = fs.readFileSync(path, 'utf-8');
      const actual = diff(
        `${firstNestedConfigAbsulutePath}${extName}`,
        `${secondNestedConfigAbsulutePath}${extName}`,
        'plain',
      );

      expect(actual).toBe(expected);
    });
  });
});
