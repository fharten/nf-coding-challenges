const usersLiked = ['Alex', 'Jacob', 'Mark', 'Max', 'Sabine'];

function likeText(input) {
  if (input.length === 0) {
    return 'no one likes this';
  } else if (input.length === 1) {
    return `${input[0]} likes this`;
  } else if (input.length === 2) {
    return `${input[0]} and ${input[1]} like this`;
  } else if (input.length === 3) {
    return `${input[0]}, ${input[1]} and ${input[2]} like this`;
  } else {
    return `${input[0]}, ${input[1]} and ${input.length - 2} like this`;
  }
}

console.log(likeText(usersLiked));
