import { IterableClass } from "../types";

export class CustomTreeWalker implements IterableClass<Node> {
  private readonly walker: TreeWalker;

  constructor(root: Node, nodeFilter?: NodeFilter) {
    this.walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      nodeFilter,
    );
  }

  *[Symbol.iterator]() {
    while (this.walker.nextNode()) {
      yield this.walker.currentNode;
    }
  }
}
