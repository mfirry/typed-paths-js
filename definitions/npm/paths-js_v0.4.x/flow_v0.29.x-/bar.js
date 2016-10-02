declare module "paths-js/bar" {

  declare class Bar<A> {
    constructor(data: Array<Array<A>>, accessor: (a: A) => number,  width: number, height: number, gutter: number): Bar<A>;
  }

}