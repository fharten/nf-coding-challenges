import { isString } from './isString';

test(`'hello' is a string`, () => {
  expect(isString('hello')).toBe(true);
});

test(`123 is not a string`, () => {
  expect(isString(123)).toBe(false);
});

test(`{} is not a string`, () => {
  expect(isString({})).toBe(false);
});

test(`'' is a string`, () => {
  expect(isString('')).toBe(true);
});

test(`undefined is not a string`, () => {
  expect(isString(undefined)).toBe(false);
});
