import { divide } from './divide';

test('10 divided by 2 equals 5', () => {
  expect(divide(10, 2)).toBe(5);
});

test('7 divided by -1 equals -7', () => {
  expect(divide(7, -1)).toBe(-7);
});

test('0 divided by 10 equals 0', () => {
  expect(divide(0, 10)).toBe(0);
});

test('1 divided by 0 equals error', () => {
  expect(() => {
    divide(1, 0);
  }).toThrow('Cannot divide by zero');
});
