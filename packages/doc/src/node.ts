// node.ts
import * as Y from 'yjs';
import { NodeType, id } from './types';
import { Context } from './context';
import { Attributes } from './attributes';

type YNode = Y.Map<Y.Map<any> | Y.Text | string | NodeType>;

export class Node {
  private constructor(
    readonly doc: Y.Doc,
    readonly id: id
  ) {}

  /* -------- factories -------- */
static create(doc: Y.Doc, type: NodeType, value = ''): Node {
  const id = crypto.randomUUID();
  const nodes = doc.getMap('nodes');

  const nodeMap = new Y.Map<any>();
  nodeMap.set('type', type);
  nodeMap.set('value', type === 'text' ? new Y.Text(value) : value);
  nodeMap.set('context', new Y.Map());
  nodeMap.set('attrs', new Y.Map());

  // сначала добавляем в nodes
  nodes.set(id, nodeMap);

  // теперь безопасно выставлять nodeId в context
  (nodeMap.get('context') as Y.Map<any>).set('nodeId', id);

  return new Node(doc, id);
}


  static from(doc: Y.Doc, id: id): Node | null {
    return doc.getMap('nodes').has(id) ? new Node(doc, id) : null;
  }

  /* -------- internals -------- */
  private get ynode(): YNode {
    return this.doc.getMap('nodes').get(this.id) as YNode;
  }

  /* -------- fields -------- */
  get type(): NodeType {
    return this.ynode.get('type') as NodeType;
  }

  get value(): string | Y.Text {
    return this.ynode.get('value') as string | Y.Text;
  }

  set value(v: string) {
    const val = this.ynode.get('value');
    if (val instanceof Y.Text) {
      val.delete(0, val.length);
      val.insert(0, v);
    } else {
      this.ynode.set('value', v);
    }
  }

  get context(): Context {
    return new Context(this.ynode.get('context') as Y.Map<any>, this.doc);
  }

  get attributes(): Attributes {
    return new Attributes(this.ynode.get('attrs') as Y.Map<any>);
  }

  /* -------- CHILDREN / TREE -------- */
  get children(): Node[] {
    return this.context.structure
      .toArray()
      .map(id => Node.from(this.doc, id))
      .filter(Boolean) as Node[];
  }

append(child: Node) {
  // Добавляем child в структуру родителя
  this.context.structure.push([child.id]);
  // Указываем родителя у ребенка
  child.context.parent = this.id;
}

remove(child: Node) {
  const idx = this.context.structure.toArray().indexOf(child.id);
  if (idx !== -1) this.context.structure.delete(idx, 1);
  // Удаляем ссылку на родителя
  child.context.parent = undefined;
}


  /* -------- lifecycle -------- */
  destroy() {
    this.children.forEach(child => child.destroy());
    this.doc.getMap('nodes').delete(this.id);
  }
}
