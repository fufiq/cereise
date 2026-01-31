import { Node } from '@editor/doc';

export function renderNode(node: Node): string {
  switch (node.type) {
    case 'paragraph':
      return `<p>${node.text ?? ''}</p>`;
    case 'heading':
      return `<h1>${node.text ?? ''}</h1>`;
    default:
      return '';
  }
}
