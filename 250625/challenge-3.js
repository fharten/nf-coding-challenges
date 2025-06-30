function order(words) {
  if (!words) return '';

  return words
    .split(' ')
    .sort((a, b) => {
      const firstNumber = a.match(/\d/)[0];
      const secondNumber = b.match(/\d/)[0];
      return firstNumber - secondNumber;
    })
    .join(' ');
}

console.log(order('is2 Thi1s T4est 3a'));
