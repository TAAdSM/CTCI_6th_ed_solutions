// This tree class is just for show and not used in the solution.
class Tree {
    root;

    constructor(root=new TreeNode()) {
        this.root = root;
    }
}

class TreeNode {
    value;
    children;
    parent;
    constructor(value='', children=[], parent=null) {};
}

class BinarySearchTree {
    root;
    constructor(root=new BinarySearchTreeNode()) {
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
