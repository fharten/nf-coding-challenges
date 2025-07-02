import { greet } from './greet';

test('returns greeting with given name', () => {
  expect(greet('Lisa')).toBe('Hello, Lisa!');
});

test('returns empty string', () => {
  expect(greet('')).toBe('Hello, !');
});

test('returns greeting the world', () => {
  expect(greet('world')).toBe('Hello, world!');
});
