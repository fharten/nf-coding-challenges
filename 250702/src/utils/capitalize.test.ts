import { capitalize } from './capitalize';

test('capitalizes a single lowercase word', () => {
  expect(capitalize('hello')).toBe('Hello');
});
