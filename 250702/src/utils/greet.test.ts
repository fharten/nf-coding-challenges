import { greet } from './greet';

test('returns greeting with given name', () => {
  expect(greet('Lisa')).toBe('Hello, Lisa!');
});
