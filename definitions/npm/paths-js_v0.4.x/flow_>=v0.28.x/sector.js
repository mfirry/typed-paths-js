declare module "paths-js/curved-rectangle" {

  declare class Sector extends Shape {
    constructor(center: Point, r: number, R: number, start: number, end: number): Sector;
  }

  declare module.exports: {
    Sector: Sector
  }

}