function canPermuteToPalindrome(str) {
    if (str.length === 0) {
        return false;
    }

    let charCounts = {};
    for (let index = 0; index < str.length; index++) {
        if (charCounts[str[index]]) {
            charCounts[str[index]] += 1;
        } else {
            charCounts[str[index]] = 1;
        }
    }

    let oddCharCount = 0;

    for (let char in charCounts) {
        if (charCounts.hasOwnProperty(char)) {
            if (charCounts[char] % 2 === 1) {
                oddCharCount++;
            }
        }
    }

    return (str.length % 2 === 0 && oddCharCount === 0) ||
        (str.length % 2 === 1 && oddCharCount === 1);
}

console.log(canPermuteToPalindrome('') === false);
console.log(canPermuteToPalindrome('abc') === false);
console.log(canPermuteToPalindrome('aba') === true);
console.log(canPermuteToPalindrome('aa') === true);
// implicit assumption: the identity permutation is treated as a valid
// permutation for the purposes of this exercise and as such aa can be 'permuted'
// to itself

// odd length case
console.log(canPermuteToPalindrome('abcdcba') === true);
console.log(canPermuteToPalindrome('cadcabb') === true);

// even length case
console.log(canPermuteToPalindrome('eabcdedcbae') === true);
console.log(canPermuteToPalindrome('eeeaabbccdd') === true);
