const input = ['O', 'Q', 'R', 'S'];

function findLetter(array) {
  for (let i = 0; i < array.length; i++) {
    let currentLetter = array[i].charCodeAt(0);
    let nextLetter = array[i + 1].charCodeAt(0);

    if (currentLetter + 1 !== nextLetter)
      return String.fromCharCode(currentLetter + 1);
  }
}

console.log(findLetter(input));
