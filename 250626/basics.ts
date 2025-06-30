const age: number = 37;

const agecheck = (input: number) => {
  if (!input) return 'Please specify your age.';

  for (let i = 0; i < input + 1; i++) {
    const age = i;

    if (age > 18) return 'You are old enough to visit this page.';

    return 'You are not old enogh to visit this page.';
  }
};
console.log(agecheck(age));

const score: number = 1;

const scoreAvailibilityCheck = (input: number): string => {
  if (input && input !== 0) return 'Score available';
  return 'Score unavailable';
};

const scoreTruthyCheck = (input: number): string => {
  if (input) return 'Score is evaluated as truthy.';
  return 'Score is evaluated as falsy';
};

console.log(scoreTruthyCheck(score));
console.log(scoreAvailibilityCheck(score));

const username: string = '';

const usernameCheck = (input: string): string => {
  if (input) return 'username available';
  return 'username unavailable';
};

const usernameTruhtyCheck = (input: string): string => {
  if (input) return 'Username is evaluated as truthy.';
  return 'Username is evaluated as falsy.';
};

console.log(usernameCheck(username));
console.log(usernameTruhtyCheck(username));

const isAdmin: boolean = false;

const isAdminTruthyCheck = (input: boolean): string => {
  if (isAdmin) return 'isAdmin is evaluated as truthy.';
  return 'isAdmin is evaluated as falsy.';
};

const isAdminCheck = (input: boolean): string => {
  if (isAdmin) return 'isAdmin is true.';
  return 'isAdmin is false.';
};

console.log(isAdminCheck(isAdmin));
console.log(isAdminTruthyCheck(isAdmin));
