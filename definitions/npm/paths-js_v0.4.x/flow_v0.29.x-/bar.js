declare module "paths-js/bar" {

  declare class Bar<A> {
    constructor(options:
      { data: Array<Array<A>>,
        accessor?: (a: A) => number,
        width: number,
        height: number,
        max: number,
        min: number,
        gutter?: number }): Bar<A>;
  }

}