import * as readline from 'readline';
class Queue<T> {
    private elements: T[];

    constructor() {
        this.elements = [];
    }

    enqueue(element: T): void {
        this.elements.push(element);
    }

    dequeue(): T | undefined {
        return this.elements.shift();
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }
}

class Graph {
    private adjacencyList: Map<number, number[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex: number): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(start: number, end: number): void {
        this.addVertex(start);
        this.addVertex(end);
        this.adjacencyList.get(start)?.push(end);
    }

    getNeighbors(vertex: number): number[] | undefined {
        return this.adjacencyList.get(vertex);
    }
}

function isValid(graph: Graph, start: number, end: number): boolean {
    if (start === end) {
        return true;
    }

    const visited: Set<number> = new Set();
    const queue: Queue<number> = new Queue();
    queue.enqueue(start);
    visited.add(start);

    while (!queue.isEmpty()) {
        const current: number | undefined = queue.dequeue();
        if (current === undefined) {
            break;
        }

        const neighbors = graph.getNeighbors(current);
        if (neighbors) {
            for (const neighbor of neighbors) {
                if (neighbor === end) {
                    return true;
                }

                if (!visited.has(neighbor)) {
                    queue.enqueue(neighbor);
                    visited.add(neighbor);
                }
            }
        }
    }

    return false;
}

function main(): void {
    const graph: Graph = new Graph();
    const n: number = parseInt(readline(), 10);
    const v1: number[] = readline().split(' ').map(Number);
    const m: number = parseInt(readline(), 10);
    const v2: number[] = readline().split(' ').map(Number);
    const t: number = parseInt(readline(), 10);

    for (let i = 0; i < t; i++) {
        const [a, b] = readline().split(' ').map(Number);
        graph.addEdge(a, b);
    }

    let result: boolean = true;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const start: number = v1[i];
            const end: number = v2[j];
            if (!isValid(graph, start, end)) {
                result = false;
                break;
            }
        }
        if (!result) {
            break;
        }
    }
    console.log(result);
}

main();
