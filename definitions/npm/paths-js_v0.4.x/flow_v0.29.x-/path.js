// @flow
declare module "paths-js/path" {

  declare type Point = [number, number];

  declare class Path {
    constructor(): Path;
    points(): Array<Point>;
    connect(path: Path): Path;
    moveto(x: number, y: number): Path;
    lineto(x: number, y: number): Path;
    hlineto(x: number): Path;
    vlineto(y: number): Path;
    curveto(x1: number, y1: number, x2: number, y2: number, x: number, y: number): Path;
    smoothcurveto(x2: number, y2: number, x: number, y: number): Path;
    qcurveto(x1: number, y1: number, x: number, y: number): Path;
    smoothqcurveto(x: number, y: number): Path;
    arc(rx: number, ry: number, xrot: number, largeArcFlag: number, sweepFlag: number, x: number, y: number): Path;
    closepath(): Path;
    print(): string;
  }

  declare module.exports: {
    Path: typeof Path,
    Point: Point,
  };

}
