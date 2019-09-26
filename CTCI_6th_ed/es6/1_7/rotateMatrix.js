function findNextCoordinateInOrbit(i, j, n) {
    return  n===0 ? -1 : {iCoord: j, jCoord: n - 1 - i };
}

console.log('n === 0 test');
console.log(findNextCoordinateInOrbit(0, 0, 0) === -1);
console.log('n === 1 test');
console.log(_.isEqual(findNextCoordinateInOrbit(0, 0, 1), {
    iCoord: 0,
    jCoord: 0
}) === true);

console.log('n === 2 tests ...');
console.log(_.isEqual(findNextCoordinateInOrbit(0, 0, 2), {
    iCoord: 0,
    jCoord: 1
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(0, 1, 2), {
    iCoord: 1,
    jCoord: 1
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(1, 1, 2), {
    iCoord: 1,
    jCoord: 0
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(1, 0, 2), {
    iCoord: 0,
    jCoord: 0
}) === true);

console.log('n === 3 tests ...');
console.log('corner element tests ...');
console.log(_.isEqual(findNextCoordinateInOrbit(0, 0, 3), {
    iCoord: 0,
    jCoord: 2
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(0, 2, 3), {
    iCoord: 2,
    jCoord: 2
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(2, 2, 3), {
    iCoord: 2,
    jCoord: 0
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(2, 0, 3), {
    iCoord: 0,
    jCoord: 0
}) === true);


console.log('middle cross element tests ...');
console.log(_.isEqual(findNextCoordinateInOrbit(0, 1, 3), {
    iCoord: 1,
    jCoord: 2
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(1, 2, 3), {
    iCoord: 2,
    jCoord: 1
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(2, 1, 3), {
    iCoord: 1,
    jCoord: 0
}) === true);
console.log(_.isEqual(findNextCoordinateInOrbit(1, 0, 3), {
    iCoord: 0,
    jCoord: 1
}) === true);

function performFourWayInPlaceSwap(rowIndex, colIndex, n, arr) {
    let nextElementInOrbit = findNextCoordinateInOrbit(rowIndex, colIndex, n);
    let secondElementInOrbit = findNextCoordinateInOrbit(nextElementInOrbit.iCoord, nextElementInOrbit.jCoord, n);
    let thirdElementInOrbit = findNextCoordinateInOrbit(secondElementInOrbit.iCoord, secondElementInOrbit.jCoord, n);

    let temp1 = arr[nextElementInOrbit.iCoord][nextElementInOrbit.jCoord];
    arr[nextElementInOrbit.iCoord][nextElementInOrbit.jCoord] = arr[rowIndex][colIndex];

    let temp2 = arr[secondElementInOrbit.iCoord][secondElementInOrbit.jCoord];
    arr[secondElementInOrbit.iCoord][secondElementInOrbit.jCoord] = temp1;

    temp1 = arr[thirdElementInOrbit.iCoord][thirdElementInOrbit.jCoord];
    arr[thirdElementInOrbit.iCoord][thirdElementInOrbit.jCoord] = temp2;

    arr[rowIndex][colIndex] = temp1;
}

function rotateMatrix(arr) {
    let n = arr.length;

    if (n < 2) {
        return arr;
    }

    for (let rowIndex = 0; rowIndex < Math.floor(n/2); rowIndex++) {
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

console.log('Testing rotateMatrix');
testRotateMatrix([[1]], [[1]]);
testRotateMatrix([[1, 2], [3, 4]], [[3, 1], [4, 2]]);
testRotateMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    [[7, 4, 1], [8, 5, 2], [9, 6, 3]]);
testRotateMatrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]],
    [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]);
testRotateMatrix([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]],
    [[21, 16, 11, 6, 1], [22, 17, 12, 7, 2], [23, 18, 13, 8, 3], [24, 19, 14, 9, 4], [25, 20, 15, 10 , 5]]);
