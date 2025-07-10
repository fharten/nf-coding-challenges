"use strict";
const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];
const arr3 = ['x', 'y'];
const arr4 = [10, 20];
const arr5 = [true, false];
const arr6 = ['yes', 'no'];
const arr7 = ['left', 'right', 'center'];
const arr8 = [0, 1, 2];
const meshArrays = (a1, a2) => {
    let meshed = [];
    for (let i = 0; i < a1.length; i++) {
        meshed.push(a1[i], a2[i]);
    }
    return meshed;
};
console.log(meshArrays(arr5, arr6));
