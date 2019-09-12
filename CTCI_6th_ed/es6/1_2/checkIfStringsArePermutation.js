function getCharCounts(str) {
    let charCounts = {};
    for (let index = 0; index < str.length; index++) {
        if (charCounts[str[index]]) {
            charCounts[str[index]] += 1;
        } else {
            charCounts[str[index]] = 1;
        }
    }

    return charCounts;
}

function checkIfPermutation(str1, str2) {
    const charCounts1 = getCharCounts(str1);
    const charCounts2 = getCharCounts(str2);

    return _.isEqual(charCounts1, charCounts2);
}

console.log(checkIfPermutation('a','a') === true);
console.log(checkIfPermutation('abcd', 'dcba') === true);
console.log(checkIfPermutation('cbda', 'cbd') === false);
console.log(checkIfPermutation('', '') === true);
