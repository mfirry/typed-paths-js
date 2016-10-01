declare module "paths-js/connector" {

  declare class Connector extends Shape {
    constructor(start: Point, end: Point, tension: number): Connector;
  }

  declare module.exports: {
    Connector: Connector
  }

}