type Student = {
  firstName: string;
  lastName: string;
  age: number;
  grades: (string | number | undefined)[];
};

const Anton: Student = {
  firstName: 'Anton',
  lastName: 'Meier',
  age: 17,
  grades: [1, 4, 3, 1, 3, 2, 1, 2],
};

const Anton2: Student = {
  firstName: 'Anton',
  lastName: 'Meier',
  age: 17,
  grades: ['A', 2, 'F', 3, 1, 'B', 2, 5],
};

const Anton3: Student = {
  firstName: 'Anton',
  lastName: 'Meier',
  age: 17,
  grades: ['A', 2, undefined, 3, 1, 'B', undefined, 5],
};

const Anton4: Student = {
  firstName: 'Anton',
  lastName: 'Meier',
  age: 16,
  grades: [1, 4, 3, 1, 'A', undefined, 1, 2],
};

const Berta: Student = {
  firstName: 'Berta',
  lastName: 'Müller',
  age: 17,
  grades: ['A', undefined, 1],
};

const Caesar: Student = {
  firstName: 'Cäsar',
  lastName: 'Schmidt',
  age: 17,
  grades: ['A', 1, undefined, 3, 2, 4, 5],
};

const line1 = (student: Student) => {
  const { firstName, lastName, age } = student;

  return `${firstName} ${lastName} (${age})`;
};

const line3 = (student: Student) => {
  const { grades } = student;

  const newGrades = grades.map((e) => (e === undefined ? '*' : e));

  return `Grades: ${newGrades}`;
};

console.log(line1(Anton4));
console.log('==============================');
console.log(line3(Anton4));

console.log(line1(Berta));
console.log('==============================');
console.log(line3(Berta));

console.log(line1(Caesar));
console.log('==============================');
console.log(line3(Caesar));
