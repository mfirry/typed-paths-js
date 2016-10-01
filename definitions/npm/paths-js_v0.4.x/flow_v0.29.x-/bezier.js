declare module "paths-js/curved-rectangle" {

  declare class Bezier extends Shape {
    constructor(points: Array<Point>, tension: number): Bezier;
  }

  declare module.exports: {
    Bezier: Bezier
  }

}