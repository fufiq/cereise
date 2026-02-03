export type NodeType = 'block' | 'word' | 'morphem' | 'text';

export type id = ReturnType<typeof crypto.randomUUID>;

export interface Interpretation {
  lemma: string;
  sense: string;
}

export class Context {
  _node?: id;
  semantics?: Interpretation;
  styles?: Partial<CSSStyleDeclaration>;
  _structure?: id[];

  constructor() {}

  get node(): Node | undefined {
    const id = this._node;
    return id ? Node.registry.get(id) : undefined;
  }

  set node(node: Node) {
    this._node = node.id;
  }

  get structure() {
    const nodes: Node[] = [];
    this._structure?.forEach((id) => {
      const node = Node.registry.get(id);
      if (node) nodes.push(node);
    });
    return nodes;
  }
}

export class Attributes {
  constructor() {}
  style?: Partial<CSSStyleDeclaration>;
}

export class Node {
  id: id = crypto.randomUUID();
  type: NodeType;
  value: string;
  context: Context;
  attributes: Attributes;
  static registry: Map<id, Node> = new Map();
  constructor(type: NodeType, value: string, context?: Context, attributes?: Attributes) {
    this.type = type;
    this.value = value;
    this.context = context ?? new Context();
    this.attributes = attributes ?? new Attributes();
    Block.registry.set(this.id, this);
  }

  destroy() {
    Block.registry.delete(this.id);
    this.context.structure?.forEach((node) => Node.registry.get(node.id)?.destroy());
  }
}

export class Block extends Node {
  styles?: CSSStyleDeclaration;

  constructor(value: string) {
    super('block', value);
  }

  attach(node: Node) {
    node.context.node = this;
  }
}
