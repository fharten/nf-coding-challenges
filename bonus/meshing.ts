const arr1: number[] = [1, 2, 3];
const arr2: string[] = ['a', 'b', 'c'];
const arr3: string[] = ['x', 'y'];
const arr4: number[] = [10, 20];
const arr5: boolean[] = [true, false];
const arr6: string[] = ['yes', 'no'];
const arr7: string[] = ['left', 'right', 'center'];
const arr8: number[] = [0, 1, 2];

const meshArrays = (
  a1: (string | number | boolean)[],
  a2: (string | number)[],
): [] => {
  let meshed: string | any = [];

  for (let i = 0; i < a1.length; i++) {
    meshed.push(a1[i], a2[i]);
  }

  return meshed;
};

console.log(meshArrays(arr5, arr6));
