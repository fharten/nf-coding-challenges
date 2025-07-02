import { sum } from './sum';

test('adds 1 and 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds -4 and 5 to equal 1', () => {
  expect(sum(-4, 5)).toBe(1);
});

test('adds 0 and 0 to equal 0', () => {
  expect(sum(0, 0)).toBe(0);
});

describe('sum()', () => {
  test('adds positive numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });
});

describe('sum()', () => {
  test('adds negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});
