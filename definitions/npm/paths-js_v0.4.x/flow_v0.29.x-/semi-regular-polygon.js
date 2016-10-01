declare module "paths-js/semi-regular-polygon" {

  declare class SemiRegularPolygon extends Shape {
    constructor(point: Point, radii: Array<Point>): SemiRegularPolygon;
  }

  declare module.exports: {
    SemiRegularPolygon: SemiRegularPolygon
  }

}