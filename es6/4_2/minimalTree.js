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

const arraysForTestingHalvingFunctions = {
    halvesArraySize1: [1],
    halvesArraySize2: [1, 2],
    halvesArraySize4: [1, 2, 3, 4],
    halvesArraySize5: [1, 2, 3, 4, 5],
    halvesArraySize10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    halvesArraySize11: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

function getLeftHalf(vals) {
    if (vals.length <= 2) {
        return [];
    }

    return vals.slice(0, (vals.length - 1) / 2);
}

function logTestingGetHalf(halfFunctionName, arrayIndex) {
    console.log(`Testing ${halfFunctionName} with: 
    ${Object.keys(arraysForTestingHalvingFunctions)[arrayIndex]}: 
    ${Object.values(arraysForTestingHalvingFunctions)[arrayIndex]}`);
}

console.log('Testing getLeftHalf ...');
logTestingGetHalf('getLeftHalf', 0);
console.log(getLeftHalf(arraysForTestingHalvingFunctions.halvesArraySize1));
logTestingGetHalf('getLeftHalf', 1);
console.log(getLeftHalf(arraysForTestingHalvingFunctions.halvesArraySize2));
logTestingGetHalf('getLeftHalf', 3);
console.log(getLeftHalf(arraysForTestingHalvingFunctions.halvesArraySize5));
logTestingGetHalf('getLeftHalf', 4);
console.log(getLeftHalf(arraysForTestingHalvingFunctions.halvesArraySize10));
logTestingGetHalf('getLeftHalf', 5);
console.log(getLeftHalf(arraysForTestingHalvingFunctions.halvesArraySize11));

function getRightHalf(vals) {
    if (vals.length <= 1) {
        return [];
    }

    return vals.slice((vals.length - 1) / 2 + 1, vals.length);
}

console.log('Testing getRightHalf ...');
logTestingGetHalf('getRightHalf', 0);
console.log(getRightHalf(arraysForTestingHalvingFunctions.halvesArraySize1));
logTestingGetHalf('getRightHalf', 1);
console.log(getRightHalf(arraysForTestingHalvingFunctions.halvesArraySize2));
logTestingGetHalf('getRightHalf', 3);
console.log(getRightHalf(arraysForTestingHalvingFunctions.halvesArraySize5));
logTestingGetHalf('getRightHalf', 4);
console.log(getRightHalf(arraysForTestingHalvingFunctions.halvesArraySize10));
logTestingGetHalf('getRightHalf', 5);
console.log(getRightHalf(arraysForTestingHalvingFunctions.halvesArraySize11));

function generateMinHeightBSTHelper(vals) {
    if (vals.length === 0) {
        return null;
    }

    const node = new BinarySearchTree(vals[(vals.length - 1) / 2]);
    node.left = generateMinHeightBSTHelper(getLeftHalf(vals));
    node.right = generateMinHeightBSTHelper(getRightHalf(vals));

    return node;
}

function generateMinHeightBST(vals) {
    const numVals = vals.length;

    if (numVals === 0) {
        return new BinarySearchTree();
    }

    const root = new BinarySearchTreeNode(vals[(numVals - 1) / 2]);
    const result = new BinarySearchTree(root);

    result.root.left = generateMinHeightBSTHelper(getLeftHalf(vals));
    result.root.right = generateMinHeightBSTHelper(getRightHalf(vals));
    return result;
}
