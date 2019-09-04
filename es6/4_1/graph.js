export class Graph {
    nodes;

    constructor(nodes=[]) {
        this.nodes = nodes;
    }
}

export class Node {
    name;
    children;
    marked;

    constructor(name, children, marked=false) {
        this.name = name;
        this.children = children;
        this.marked = marked;
    }
}
