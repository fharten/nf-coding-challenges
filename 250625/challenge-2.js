const input = 'Nananananananananananananananana Batman!';

function maskify(text) {
  if (text.length < 5) return text;

  return (result = '#'.repeat(text.length - 4) + text.slice(-4));
}

console.log(maskify(input));
