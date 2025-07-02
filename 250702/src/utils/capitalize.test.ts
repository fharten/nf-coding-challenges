import { capitalize } from './capitalize';

test('capitalizes a single lowercase word', () => {
  expect(capitalize('hello')).toBe('Hello');
});

test('capitalizes a single lowercase word', () => {
  expect(capitalize('h')).toBe('H');
});

test('capitalizes a single lowercase word', () => {
  expect(capitalize('')).toBe('');
});

test('capitalizes a single lowercase word', () => {
  expect(capitalize('javaScript')).toBe('JavaScript');
});
