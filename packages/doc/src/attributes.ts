import * as Y from 'yjs';

export class Attributes {
  constructor(private readonly yattrs: Y.Map<any>) {}

  get style(): Partial<CSSStyleDeclaration> | undefined {
    return this.yattrs.get('style');
  }

  set style(v: Partial<CSSStyleDeclaration> | undefined) {
    v ? this.yattrs.set('style', v) : this.yattrs.delete('style');
  }
}
