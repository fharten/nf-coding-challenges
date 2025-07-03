import { isPalindrome } from './palindrome';

test('noon is a palindrome', () => {
  expect(isPalindrome('noon')).toBe(true);
});

test('test is no palindrome', () => {
  expect(isPalindrome('test')).toBe(false);
});

test('madam is a palindrome', () => {
  expect(isPalindrome('madam')).toBe(true);
});

test(' is a palindrome', () => {
  expect(isPalindrome('')).toBe(true);
});
