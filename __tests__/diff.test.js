import fs from 'fs';
import diff from '../src';

describe('Testing diff.js', () => {
  const firstFlatConfigAbsolutePath = `${__dirname}/__fixtures__/flat/first`;
  const secondFlatConfigAbsolutePath = `${__dirname}/__fixtures__/flat/second`;

  const firstNestedConfigAbsulutePath = `${__dirname}/__fixtures__/nested/first`;
  const secondNestedConfigAbsulutePath = `${__dirname}/__fixtures__/nested/second`;

  const firstConfigRelativePath = './__tests__/__fixtures__/nested/first';
  const secondConfigRelativePath = './__tests__/__fixtures__/nested/second';

  const firstNestedConfigRelativePath = './__tests__/__fixtures__/nested/first';
  const secondNestedConfigRelativePath =
    './__tests__/__fixtures__/nested/second';

  const extNames = ['.json', '.yml', '.ini'];
  it('Absolute paths', () => {
    const path = `${__dirname}/__fixtures__/nested/expected/pretty`;
    const expected = fs.readFileSync(path, 'utf-8');
    const actual = diff(
      `${firstNestedConfigAbsulutePath}.json`,
      `${secondNestedConfigAbsulutePath}.json`,
    );
    expect(actual).toBe(expected);
  });

  it('Relative paths', () => {
    const path = `${__dirname}/__fixtures__/nested/expected/pretty`;
    const expected = fs.readFileSync(path, 'utf-8');
    const actual = diff(
      `${firstConfigRelativePath}.json`,
      `${secondConfigRelativePath}.json`,
    );
    expect(actual).toBe(expected);
  });

  describe('Flat configs', () => {
    test.each(extNames)('pretty && %s ', (extName) => {
      const path = `${__dirname}/__fixtures__/flat/expected/pretty`;
      const expected = fs.readFileSync(path, 'utf-8');
      const actual = diff(
        `${firstFlatConfigAbsolutePath}${extName}`,
        `${secondFlatConfigAbsolutePath}${extName}`,
        'pretty',
      );

      expect(actual).toBe(expected);
    });

    test.each(extNames)('plain && %s ', (extName) => {
      const path = `${__dirname}/__fixtures__/flat/expected/plain`;
      const expected = fs.readFileSync(path, 'utf-8');
      const actual = diff(
        `${firstFlatConfigAbsolutePath}${extName}`,
        `${secondFlatConfigAbsolutePath}${extName}`,
        'plain',
      );

      expect(actual).toBe(expected);
    });

    test.each(extNames)('json && %s ', (extName) => {
      const path = `${__dirname}/__fixtures__/flat/expected/json`;
      const expected = fs.readFileSync(path, 'utf-8');

      const actual = diff(
        `${firstFlatConfigAbsolutePath}${extName}`,
        `${secondFlatConfigAbsolutePath}${extName}`,
        'json',
      );

      expect(JSON.parse(actual)).toEqual(JSON.parse(expected));
    });
  });

  describe('Nested configs', () => {
    test.each(extNames)('pretty && %s', (extName) => {
      const path = `${__dirname}/__fixtures__/nested/expected/pretty`;

      const expected = fs.readFileSync(path, 'utf-8');
      const actual = diff(
        `${firstNestedConfigAbsulutePath}${extName}`,
        `${secondNestedConfigAbsulutePath}${extName}`,
        'pretty',
      );

      expect(actual).toBe(expected);
    });

    test.each(extNames)('plain && %s', (extName) => {
      const path = `${__dirname}/__fixtures__/nested/expected/plain`;
      const expected = fs.readFileSync(path, 'utf-8');

      const actual = diff(
        `${firstNestedConfigRelativePath}${extName}`,
        `${secondNestedConfigRelativePath}${extName}`,
        'plain',
      );

      expect(actual).toBe(expected);
    });

    test.each(extNames)('json && %s', (extName) => {
      const path = `${__dirname}/__fixtures__/nested/expected/json`;
      const expected = fs.readFileSync(path, 'utf-8');

      const actual = diff(
        `${firstNestedConfigRelativePath}${extName}`,
        `${secondNestedConfigRelativePath}${extName}`,
        'json',
      );

      expect(JSON.parse(actual)).toEqual(JSON.parse(expected));
    });
  });
});
