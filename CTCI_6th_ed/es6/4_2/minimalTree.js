// This tree class is just for show and not used in the solution.
class Tree {
    root;

    constructor(root = new TreeNode()) {
        this.root = root;
    }
}

class TreeNode {
    value;
    children;
    parent;

    constructor(value = '', children = [], parent = null) {
        this.value = value;
        this.children = children;
        this.parent = parent;
    };
}

class BinarySearchTree {
    root;

    constructor(root = new BinarySearchTreeNode()) {
        this.root = root;
    }

    insert(nodeToInsert) {
        this.root.insertHelper(nodeToInsert);
    }
}

class BinarySearchTreeNode {
    value;
    left;
    right;
    parent;

    constructor(value = 0, parent = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }

    // current assumption: duplicate values will never
    // be inserted into the tree
    insertHelper(nodeToInsert) {
        if (nodeToInsert.value > this.value) {
            if (this.right == null) {
                nodeToInsert.parent = this;
                this.right = nodeToInsert;
            } else {
                this.right.insertHelper(nodeToInsert);
            }
        } else {
            if (this.left == null) {
                nodeToInsert.parent = this;
                this.left = nodeToInsert;
            } else {
                this.left.insertHelper(nodeToInsert);
            }
        }
    }
}

let bst = new BinarySearchTree(new BinarySearchTreeNode(10));
console.log(bst);

console.log(`Inserting a node into bst with value ${5}`);
bst.insert(new BinarySearchTreeNode(5));
console.log(bst);

console.log(`Inserting a node into bst with value ${7}`);
bst.insert(new BinarySearchTreeNode(7));
console.log(bst);

console.log(`Inserting a node into bst with value ${1}`);
bst.insert(new BinarySearchTreeNode(1));
console.log(bst);

const arraysForTestingBSTFunctions = {
    arraySize1: [1],
    arraySize2: [1, 2],
    arraySize4: [1, 2, 3, 4],
    arraySize5: [1, 2, 3, 4, 5],
    arraySize10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    arraySize11: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

function getLeftHalf(vals) {
    if (vals.length <= 2) {
        return [];
    }

    return vals.slice(0, (vals.length - 1) / 2);
}

function logTesting(functionName, arrayIndex) {
    console.log(`Testing ${functionName} with: 
    ${Object.keys(arraysForTestingBSTFunctions)[arrayIndex]}: 
    ${Object.values(arraysForTestingBSTFunctions)[arrayIndex]}`);
}

console.log('Testing getLeftHalf ...');
logTesting('getLeftHalf', 0);
console.log(getLeftHalf(arraysForTestingBSTFunctions.arraySize1));
logTesting('getLeftHalf', 1);
console.log(getLeftHalf(arraysForTestingBSTFunctions.arraySize2));
logTesting('getLeftHalf', 3);
console.log(getLeftHalf(arraysForTestingBSTFunctions.arraySize5));
logTesting('getLeftHalf', 4);
console.log(getLeftHalf(arraysForTestingBSTFunctions.arraySize10));
logTesting('getLeftHalf', 5);
console.log(getLeftHalf(arraysForTestingBSTFunctions.arraySize11));

function getRightHalf(vals) {
    if (vals.length <= 1) {
        return [];
    }

    return vals.slice((vals.length - 1) / 2 + 1, vals.length);
}

console.log('Testing getRightHalf ...');
logTesting('getRightHalf', 0);
console.log(getRightHalf(arraysForTestingBSTFunctions.arraySize1));
logTesting('getRightHalf', 1);
console.log(getRightHalf(arraysForTestingBSTFunctions.arraySize2));
logTesting('getRightHalf', 3);
console.log(getRightHalf(arraysForTestingBSTFunctions.arraySize5));
logTesting('getRightHalf', 4);
console.log(getRightHalf(arraysForTestingBSTFunctions.arraySize10));
logTesting('getRightHalf', 5);
console.log(getRightHalf(arraysForTestingBSTFunctions.arraySize11));

function generateMinHeightBSTHelper(vals, parentNode) {
    if (vals.length === 0) {
        return null;
    }

    let node = new BinarySearchTree(vals[(vals.length - 1) / 2]);
    node.parent = parentNode;
    node.left = generateMinHeightBSTHelper(getLeftHalf(vals, node));
    node.right = generateMinHeightBSTHelper(getRightHalf(vals, node));

    return node;
}

function generateMinHeightBST(vals) {
    const numVals = vals.length;

    if (numVals === 0) {
        return new BinarySearchTree();
    }

    const root = new BinarySearchTreeNode(vals[(numVals - 1) / 2]);
    const result = new BinarySearchTree(root);

    result.root.left = generateMinHeightBSTHelper(getLeftHalf(vals, root));
    result.root.right = generateMinHeightBSTHelper(getRightHalf(vals, root));

    return result;
}

logTesting('generateMinHeightBST', 5);
console.log(generateMinHeightBST(arraysForTestingBSTFunctions.arraySize11));
