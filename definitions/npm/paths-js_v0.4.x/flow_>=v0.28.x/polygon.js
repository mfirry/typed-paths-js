declare module "paths-js/polygon" {

  declare class Polygon extends Shape {
    constructor(points: Array<Point>, closed?: boolean): Polygon;
  }

  declare module.exports: {
    Polygon: typeof Polygon
  }
}