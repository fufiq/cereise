export type NodeType = 'paragraph' | 'heading' | 'image' | 'svg';

export interface Node {
  id: string;
  type: NodeType;
  children?: Node[]
  text?: string;
  attrs?: Record<string, string>;
}

export function createNode(type: NodeType, text?: string): Node {
  return {
    id: crypto.randomUUID(),
    type,
    text,
    children: [],
    attrs: {}
  };
}
