function isAllUnique(str) {
    let charCounts = {};
    for (let index = 0; index < str.length; index++) {
        if (charCounts[str[index]] === 1) {
            return false;
        }

        charCounts[str[index]] = 1;
    }

    return true;
}

console.log(isAllUnique(''));
console.log(isAllUnique('abcdefghijkl'));
console.log(isAllUnique('aa'));

function isStringAllUniqueNoExtraStructure(str) {
    const sorted = str.split('').sort();
    if (str.length <= 2) {
        return true;
    }

    for (let index=1; index < str.length; index++) {
        if (sorted[index - 1] === sorted[index]) {
            return false;
        }
    }

    return true;
}

console.log(isStringAllUniqueNoExtraStructure(''));
console.log(isStringAllUniqueNoExtraStructure('a'));
console.log(isStringAllUniqueNoExtraStructure('abcdefghijklmnopqrst'));
console.log(isStringAllUniqueNoExtraStructure('aaaaaa'));
