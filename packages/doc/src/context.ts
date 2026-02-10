// context.ts
import * as Y from 'yjs';
import { Node} from './node';
import { Interpretation, id } from './types';

export class Context {
  constructor(
    private readonly yctx: Y.Map<any>,
    private readonly doc: Y.Doc
  ) {}

  /* -------- semantics -------- */
  get semantics(): Interpretation | undefined {
    return this.yctx.get('semantics');
  }
  set semantics(v: Interpretation | undefined) {
    v ? this.yctx.set('semantics', v) : this.yctx.delete('semantics');
  }

  /* -------- structure -------- */
  get structure(): Y.Array<id> {
    let arr = this.yctx.get('structure') as Y.Array<id>;
    if (!arr) {
      arr = new Y.Array<id>();
      this.yctx.set('structure', arr);
    }
    return arr;
  }

  /* -------- parent -------- */
  get parent(): id | undefined {
    return this.yctx.get('parent');
  }
  set parent(v: id | undefined) {
    v ? this.yctx.set('parent', v) : this.yctx.delete('parent');
  }
}
