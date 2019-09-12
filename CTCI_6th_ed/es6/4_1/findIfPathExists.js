class GraphAsAdjacencyList {
    nodes;

    constructor(nodes=[]) {
        this.nodes = nodes;
    }
}

class NodeAsAdjacencyList {
    name;
    children;
    marked;

    constructor(name, children=[], marked=false) {
        this.name = name;
        this.children = children;
        this.marked = marked;
    }
}

class Queue {
    data = [];

    constructor(data=[]) {
        this.data = data;
    }

    add(record) {
        this.data.unshift(record);
    };

    remove() {
        return this.data.pop();
    };

    first() {
        return this.data[0];
    };

    last() {
        return this.data[this.data.length - 1];
    };

    size() {
        return this.data.length;
    };
}

function getRandomNonNegativeInteger(n) {
    return Math.floor(Math.random() * n);
}

function getRandomNodeNames(size) {
    return new Set(new Array(size).fill(0).map(() => {
        return getRandomNonNegativeInteger(size).toString()
    }));
}

function generateRandomChildren(currNodeName, nodes) {
    let children = [];

    nodes.forEach((node) => { if (node.name !== currNodeName) {
        if (getRandomNonNegativeInteger(3) === 1) {
            children.push(node);
        }
    }});

    return children;
}

function generateRandomNodes(size) {
    const names = getRandomNodeNames(size);
    let nodes = [];
    names.forEach((name) => {nodes.push(new NodeAsAdjacencyList(name))});
    nodes = nodes.map((node) => {
        let nodeWithRandomChildren = node;
        nodeWithRandomChildren.children = generateRandomChildren(nodeWithRandomChildren.name, nodes);
        return nodeWithRandomChildren;
    });
    return nodes;
}

class RandomGraphAsAdjacencyList {
    nodes;

    constructor(size=50) {
        this.nodes = generateRandomNodes(size);
    }
}

const bfsTerminateOnDestination = (root, destination) => {
    const queue = new Queue();
    root.marked = true;
    queue.add(root);

    while(queue.size() !== 0) {
        let currNode = queue.remove();
        for (let index = 0; index < currNode.children.length; index++) {
            let currChild = currNode.children[index];
            if (currChild.name === destination.name) {
                return true;
            } else if (currChild.marked === false) {
                currChild.marked = true;
                queue.add(currChild);
            }
        }
    }

    return false;
};

const node1 = new NodeAsAdjacencyList('1', []);
const node2 = new NodeAsAdjacencyList('2', [node1]);
const node3 = new NodeAsAdjacencyList('3', [node1, node2]);
const node4 = new NodeAsAdjacencyList('4', [node1, node2, node3]);
const node5 = new NodeAsAdjacencyList('5', []);
const node6 = new NodeAsAdjacencyList('6', [node1]);

const graph1 = new GraphAsAdjacencyList([node1, node2, node3, node4, node5, node6]);
const randomGraph1 = new RandomGraphAsAdjacencyList();

console.log(JSON.stringify(graph1));
console.log(randomGraph1);

console.log('Testing bfsTerminateOnDestination');
console.log(bfsTerminateOnDestination(node4, node1) === true);
console.log(bfsTerminateOnDestination(node1, node4) === false);
console.log(bfsTerminateOnDestination(node1, node6) === false);
console.log(bfsTerminateOnDestination(node6, node1) === true);
console.log(bfsTerminateOnDestination(node5, node1) === false);

function findIfPathExists(a, b) {
    return bfsTerminateOnDestination(a, b) || bfsTerminateOnDestination(b, a);
}

console.log('Testing findIfPathExists');
console.log(findIfPathExists(node6, node2) === false);
console.log(findIfPathExists(node5, node1) === false);
console.log(findIfPathExists(node6, node1) === true);
console.log(findIfPathExists(node1, node6) === true);

console.log('Testing findIfPathExists on an instance of RandomGraphAsAdjacencyList');
console.log(findIfPathExists(randomGraph1.nodes[0], randomGraph1.nodes[randomGraph1.nodes.length - 1]));
console.log(findIfPathExists(randomGraph1.nodes[1], randomGraph1.nodes[randomGraph1.nodes.length - 2]));
