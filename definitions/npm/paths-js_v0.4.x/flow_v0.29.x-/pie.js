declare module "paths-js/pie" {

  declare class Pie<A> {
    constructor(options:
      {| data: Array<A>,
        accessor?: (a: A) => number,
        center: Point,
        r: number,
        R: number |}): Pie<A>;
  }

}
