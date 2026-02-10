import * as Y from 'yjs';
import { Node } from './node';
import { NodeType, id } from './types';

export class Document {
  readonly doc: Y.Doc;

  constructor(doc?: Y.Doc) {
    this.doc = doc ?? new Y.Doc();
    this.doc.getMap('nodes');
    this.doc.getArray<id>('order');
  }

  /* -------- order -------- */

  get blocks(): Node[] {
    return this.doc.getArray<id>('order')
      .toArray()
      .map(id => Node.from(this.doc, id))
      .filter(Boolean) as Node[];
  }

  append(node: Node) {
    this.doc.getArray<id>('order').push([node.id]);
  }

  remove(node: Node) {
    const arr = this.doc.getArray<id>('order');
    const idx = arr.toArray().indexOf(node.id);
    if (idx !== -1) arr.delete(idx, 1);
    node.destroy();
  }

  /* -------- factories -------- */

  createNode(type: NodeType, value = ''): Node {
    return Node.create(this.doc, type, value);
  }

  createBlock(value = ''): Node {
    const block = Node.create(this.doc, 'block', value);
    this.append(block);
    return block;
  }

  getNode(id: id): Node | null {
    return Node.from(this.doc, id);
  }

  /* -------- reactivity -------- */

  observe(cb: () => void) {
    this.doc.on('update', cb);
  }
}

export function nodeToJSON(node: Node): any {
  return {
    id: node.id,
    type: node.type,
    value: node.value instanceof Y.Text ? node.value.toString() : node.value,
    attributes: node.attributes.style ?? {},
    context: {
      node_id: node.context.parent ?? null,
      semantics: node.context.semantics ?? null,
      structure: node.children.map(child => child.id) // просто id детей
    },
    children: node.children.map(child => nodeToJSON(child)) // рекурсивно строим дерево
  };
}

export function documentToJSON(doc: Document): any {
  return doc.blocks.map(block => nodeToJSON(block));
}

export function documentToUintArray(doc: Y.Doc){
     return Y.encodeStateAsUpdate(doc);
}