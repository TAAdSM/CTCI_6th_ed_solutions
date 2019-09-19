function coordinateIsInMiddleCross(i, j, n) {
    let s = Math.floor(n / 2);
    return i === s + 1 || j === s + 1;
}

function findNextCoordinateInOrbitNGreaterThanTwo(n, i, j) {
    if (n % 2 === 1 && coordinateIsInMiddleCross(i, j, n)) {
        let s = Math.floor(n / 2);
        if (i !== s + 1 && j === s + 1) {
            return {iCoord: s + 1, jCoord: n - i + 1};
        } else return {iCoord: j, jCoord: s + 1};
    }

    let horizInterDistance = n - 2 * Math.max(Math.min(i, n - i), 1);
    let vertInterDistance = n - 2 * Math.max(Math.min(j, n - j), 1);

    if (i > n - i && j > n - j) {
        return {iCoord: i, jCoord: j - (horizInterDistance + 1)};
    } else if (i < n - i && j < n - j) {
        return {iCoord: i, jCoord: j + (horizInterDistance + 1)};
    } else if (i > n - i && j < n - j) {
        return {iCoord: i - (vertInterDistance + 1), jCoord: j};
    }
    return {iCoord: i + (vertInterDistance + 1), jCoord: j};
}

function findNextCoordinateInOrbitNEqualsTwoHardCodedCase(i, j) {
    if (i === 1 && j === 1) {
        return {iCoord: i, jCoord: j + 1};
    } else if (i === 1 && j === 2) {
        return {iCoord: i + 1, jCoord: j};
    } else if (i === 2 && j === 2) {
        return {iCoord: i, jCoord: j - 1};
    }
    return {iCoord: i - 1, jCoord: j};
}

// Assumption: i,j are 1-based indices, n is the side length
// of the square matrix
// function findNextCoordinateInOrbit(i, j, n) {
//     if (i > n || j > n) {
//         return -1;
//     }
//
//     if (n < 2) {
//         return {iCoord: i, jCoord: j};
//     }
//
//     if (n === 2) {
//         return findNextCoordinateInOrbitNEqualsTwoHardCodedCase(i, j);
//     }
//
//     return findNextCoordinateInOrbitNGreaterThanTwo(n, i, j);
// }

function findNextCoordinateInOrbit(i, j, n) {
    return  n===0 ? -1 : {iCoord: j, jCoord: n - i + 1};
}

console.log('n === 0 test');
console.log(findNextCoordinateInOrbit(1, 1, 0) === -1);
console.log('n === 1 test');
console.log(_.isEqual(findNextCoordinateInOrbit(1, 1, 1), {
    iCoord: 1,
    jCoord: 1
}) === true);

console.log('n === 2 tests ...');
console.log(_.isEqual(findNextCoordinateInOrbit(1, 1, 2), {
    iCoord: 1,
    jCoord: 2
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(1, 2, 2), {
    iCoord: 2,
    jCoord: 2
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(2, 2, 2), {
    iCoord: 2,
    jCoord: 1
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(2, 1, 2), {
    iCoord: 1,
    jCoord: 1
}) === true);

console.log('n === 3 tests ...');
console.log('corner element tests ...');
console.log(_.isEqual(findNextCoordinateInOrbit(1, 1, 3), {
    iCoord: 1,
    jCoord: 3
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(1, 3, 3), {
    iCoord: 3,
    jCoord: 3
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(3, 3, 3), {
    iCoord: 3,
    jCoord: 1
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(3, 1, 3), {
    iCoord: 1,
    jCoord: 1
}) === true);


console.log('middle cross element tests ...');
console.log(_.isEqual(findNextCoordinateInOrbit(1, 2, 3), {
    iCoord: 2,
    jCoord: 3
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(2, 3, 3), {
    iCoord: 3,
    jCoord: 2
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(3, 2, 3), {
    iCoord: 2,
    jCoord: 1
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(2, 1, 3), {
    iCoord: 1,
    jCoord: 2
}) === true);

function performFourWayInPlaceSwap(rowIndex, colIndex, n, arr) {
    let nextElementInOrbit = findNextCoordinateInOrbit(rowIndex+1, colIndex+1, n);
    let secondElementInOrbit = findNextCoordinateInOrbit(nextElementInOrbit.iCoord - 1, nextElementInOrbit.jCoord - 1, n);
    let thirdElementInOrbit = findNextCoordinateInOrbit(secondElementInOrbit.iCoord - 1, secondElementInOrbit.jCoord - 1, n);

    let temp1 = arr[nextElementInOrbit.iCoord - 1][nextElementInOrbit.jCoord - 1];
    arr[nextElementInOrbit.iCoord - 1][nextElementInOrbit.jCoord - 1] = arr[rowIndex][colIndex];

    let temp2 = arr[secondElementInOrbit.iCoord - 1][secondElementInOrbit.jCoord - 1];
    arr[secondElementInOrbit.iCoord - 1][secondElementInOrbit.jCoord - 1] = temp1;

    temp1 = arr[thirdElementInOrbit.iCoord - 1][thirdElementInOrbit.jCoord - 1];
    arr[thirdElementInOrbit.iCoord - 1][thirdElementInOrbit.jCoord - 1] = temp2;

    arr[rowIndex][colIndex] = temp1;
}

function rotateMatrix(arr) {
    let n = arr.length;

    if (n < 2) {
        return arr;
    }

    for (let rowIndex = 0; rowIndex < n/2; rowIndex++) {
        for (let colIndex = rowIndex; colIndex < n - 1 - rowIndex; colIndex++) {
            performFourWayInPlaceSwap(rowIndex, colIndex, n, arr);
        }
    }

    return arr;
}

function testRotateMatrix(arr, expected=[]) {
    console.log('testing rotateMatrix with:');
    console.table(arr);
    let result = rotateMatrix(arr);
    if (!_.isEqual(expected, [])) {
        console.log('Yields:');
        console.table(result);
        console.log(_.isEqual(result, expected) ? 'As expected.' : 'Not Equal,' +
            ' test has failed');
    } else {
        console.log('Yields:');
        console.table(result);
        console.log('No expected value specified for this test.');
    }
}

// console.log('Testing rotateMatrix ...');
// testRotateMatrix();
