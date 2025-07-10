"use strict";
const formatNames = (names) => {
    if (names.length < 1)
        return '';
    if (names.length === 1)
        return names[0].name;
    if (names.length === 2)
        return `${names[0].name} & ${names[1].name}`;
    const nameMap = names.map((i) => i.name);
    return `${nameMap.slice(0, -1).join(', ')} & ${nameMap[names.length - 1]}`;
};
const list = [{ name: 'Bart' }, { name: 'Lisa' }, { name: 'Maggie' }];
console.log(formatNames(list));
