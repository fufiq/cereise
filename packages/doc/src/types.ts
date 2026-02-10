export type NodeType = 'block' | 'text' | 'word' | 'morphem';
export type id = string;

export interface Interpretation {
  lemma: string;
  sense?: string;
}
