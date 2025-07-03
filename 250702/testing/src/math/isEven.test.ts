import { isEven } from './isEven';

test('2 is even', () => {
  expect(isEven(2)).toBe(true);
});

test('3 is not even', () => {
  expect(isEven(3)).toBe(false);
});

test('0 is even', () => {
  expect(isEven(0)).toBe(true);
});

test('-4 is even', () => {
  expect(isEven(-4)).toBe(true);
});

test('2.5 is not even', () => {
  expect(isEven(2.5)).toBe(false);
});

test('returns true for even numbers', () => {
  expect(isEven(4)).toBe(true);
});

test('returns false for odd numbers', () => {
  expect(isEven(3)).toBe(false);
});

test('returns true for even numbers', () => {
  expect(isEven(-2)).toBe(true);
});

test('returns true for even numbers', () => {
  expect(isEven(0)).toBe(true);
});

test('returns false for odd numbers', () => {
  expect(isEven(101)).toBe(false);
});
