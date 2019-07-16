import diff from '../src/diff';

describe('Testing diff.js', () => {
  test('Absolute paths json', () => {
    const firstConfig = `${__dirname}/__fixtures__/firstConfig.json`;
    const secondConfig = `${__dirname}/__fixtures__/secondConfig.json`;
    const expected = `
    {
        host: hexlet.io
      + timeout: 20
      - timeout: 50
      - proxy: 123.234.53.22
      - follow: false
      + verbose: true
    }`;
    const actual = diff(firstConfig, secondConfig);
    expect(actual).toBe(expected);
  });
  test('Relative paths json', () => {
    const firstConfig = './__tests__/__fixtures__/firstConfig.json';
    const secondConfig = './__tests__/__fixtures__/secondConfig.json';
    const expected = `
    {
        host: hexlet.io
      + timeout: 20
      - timeout: 50
      - proxy: 123.234.53.22
      - follow: false
      + verbose: true
    }`;
    const actual = diff(firstConfig, secondConfig);
    expect(actual).toBe(expected);
  });
  test('Absolute paths yml', () => {
    const firstConfig = `${__dirname}/__fixtures__/firstConfig.yml`;
    const secondConfig = `${__dirname}/__fixtures__/secondConfig.yml`;
    const expected = `
    {
        host: hexlet.io
      + timeout: 20
      - timeout: 50
      - proxy: 123.234.53.22
      - follow: false
      + verbose: true
    }`;
    const actual = diff(firstConfig, secondConfig);
    expect(actual).toBe(expected);
  });
  test('Relative paths yml', () => {
    const firstConfig = './__tests__/__fixtures__/firstConfig.yml';
    const secondConfig = './__tests__/__fixtures__/secondConfig.yml';
    const expected = `
    {
        host: hexlet.io
      + timeout: 20
      - timeout: 50
      - proxy: 123.234.53.22
      - follow: false
      + verbose: true
    }`;
    const actual = diff(firstConfig, secondConfig);
    expect(actual).toBe(expected);
  });
});
