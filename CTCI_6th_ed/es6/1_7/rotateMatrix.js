function coordinateIsInMiddleCross(i, j, n) {
    let s = Math.floor(n / 2);
    return i === s + 1 || j === s + 1;
}

// Assumption: i,j are 1-based indices, n is the side length
// of the square matrix
function findNextCoordinateInOrbit(i, j, n) {
    if (i > n || j > n) {
        return -1;
    }

    if (n < 2) {
        return {iCoord: i, jCoord: j};
    }

    if (n === 2) {
        if (i === 1 && j === 1) {
            return {iCoord: i, jCoord: j + 1};
        } else if (i === 1 && j === 2) {
            return {iCoord: i + 1, jCoord: j};
        } else if (i === 2 && j === 2) {
            return {iCoord: i, jCoord: j - 1};
        }
        return {iCoord: i - 1, jCoord: j};
    }

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
