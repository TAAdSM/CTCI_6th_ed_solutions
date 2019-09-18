function checkIfAtMostOneEditAway(str1, str2) {
    if (str1 === str2) {
        return true;
    }

    let n = str1.length;
    let m = str2.length;

    let index1 = 0;
    let index2 = 0;
    let diffsSeen = 0;

    if (Math.abs(n-m) > 1) {
        return false;
    }

    while(!(index1 > n-1) || !(index2 > m-1)) {
        if (str1[index1] !== str2[index2]) {
            diffsSeen += 1;
            if (index1 < n-1 && (str1[index1+1] === str2[index2])) {
                index1 += 1;
            }
            if (index2 < m-1 && (str2[index2+1] === str1[index1])) {
                index2 +=1;
            }
        }

        index1 += 1;
        index2 += 1;
    }

    return diffsSeen < 2;
}

console.log(checkIfAtMostOneEditAway('', '') === true);
console.log(checkIfAtMostOneEditAway('', '123') === false);
console.log(checkIfAtMostOneEditAway('123', '132') === true);

console.log(checkIfAtMostOneEditAway('1234', '123') === true);
console.log(checkIfAtMostOneEditAway('123', '1234') === true);

console.log(checkIfAtMostOneEditAway('12345', '12365') === true);
console.log(checkIfAtMostOneEditAway('16346', '12345') === false);
