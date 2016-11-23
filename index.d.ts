export interface Hist2D {
  // hist2d.bins(number) => b
  bins(): number;
  bins(n: number): this;

  // hist2d.indices([x, y]) => [x, y]
  indices(): number[];
  indices(indices?: number[]): this;

  // hist2d.interval(number) => t
  interval(): number;
  interval(n?: number[]): this;

  // hist2d.domain([[x1,x2],[y1,y2]]) => d
  domain(): Array<number[]>;
  domain(domain?: Array<number[]>): this;
}

export function hist2d(
  data: Array<number[]>,
  callback: () => Array<number[]>
): Hist2D;
