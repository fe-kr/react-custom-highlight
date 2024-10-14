export class CustomHighlight {
  private readonly ranges: Range[] = [];

  constructor(
    readonly treeWalker: IterableClass<Node>,
    readonly regExp: RegExp,
    private readonly isDebugMode: boolean,
  ) {
    for (const treeNode of treeWalker) {
      this.filterRanges(treeNode, regExp);
    }
  }

  get highlight() {
    return new Highlight(...this.ranges);
  }

  private filterRanges(node: Node, regExp: RegExp) {
    try {
      if (!node.textContent) return;

      let searchIndex = 0;

      while (searchIndex < node.textContent.length) {
        const lastIndex = node.textContent.slice(searchIndex).search(regExp);

        if (lastIndex === -1) {
          break;
        }

        const startIndex = searchIndex + lastIndex;
        const endIndex = startIndex + regExp.source.length;

        const range = new Range();
        range.setStart(node, startIndex);
        range.setEnd(node, endIndex);

        this.ranges.push(range);
        searchIndex = endIndex;
      }
    } catch (err: unknown) {
      if (this.isDebugMode) console.error(err as Error);
    }
  }
}
