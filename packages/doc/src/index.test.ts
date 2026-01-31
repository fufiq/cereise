import { createNode } from '@editor/doc';
import { describe, it, expect } from 'vitest';


describe('doc package', () => {
  it('should create a node', () => {
    const node = createNode('paragraph', 'Hello');
    expect(node.type).toBe('paragraph');
    expect(node.text).toBe('Hello');
    expect(node.children).toEqual([]);
  });
});
