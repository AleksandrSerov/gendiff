import fs from 'fs';
import diff from '../src/diff';

describe('Testing diff.js', () => {
  const firstConfigAbsolutePath = `${__dirname}/__fixtures__/flat/first`;
  const secondConfigAbsolutePath = `${__dirname}/__fixtures__/flat/second`;

  // const firstNestedConfigAbsulutePath = `${__dirname}/__fixtures__/nested/first`;
  // const secondNestedConfigAbsulutePath = `${__dirname}/__fixtures__/nested/second`;

  const firstConfigRelativePath = './__tests__/__fixtures__/flat/first';
  const secondConfigRelativePath = './__tests__/__fixtures__/flat/second';

  // const firstNestedConfigRelativePath = './__tests__/__fixtures__/nested/first';
  // const secondNestedConfigRelativePath =
  // ('./__tests__/__fixtures__/nested/second');

  const extNames = ['.json', '.yml', '.ini'];
  const flatExpectedPath = `${__dirname}/__fixtures__/flat/expected`;

  test.each(extNames)('Test flat diff absolute paths %s', (extName) => {
    const expected = fs.readFileSync(flatExpectedPath, 'utf-8');
    const actual = diff(
      `${firstConfigAbsolutePath}${extName}`,
      `${secondConfigAbsolutePath}${extName}`,
    );

    expect(actual).toBe(expected);
  });

  test.each(extNames)('Test flat diff relative paths %s', (extName) => {
    const expected = fs.readFileSync(flatExpectedPath, 'utf-8');
    const actual = diff(
      `${firstConfigRelativePath}${extName}`,
      `${secondConfigRelativePath}${extName}`,
    );

    expect(actual).toBe(expected);
  });

  // test.each(extNames)('Test nested diff relative paths %s', (extName) => {
  //   const expected = resultNestedConfig;
  //   const actual = diff(
  //     `${firstNestedConfigRelativePath}${extName}`,
  //     `${secondNestedConfigRelativePath}${extName}`,
  //   );

  //   expect(actual).toBe(expected);
  // });

  // test.each(extNames)('Test nested diff absolute paths %s', (extName) => {
  //   const expected = resultNestedConfig;
  //   const actual = diff(
  //     `${firstNestedConfigAbsulutePath}${extName}`,
  //     `${secondNestedConfigAbsulutePath}${extName}`,
  //   );

  //   expect(actual).toBe(expected);
  // });
});
