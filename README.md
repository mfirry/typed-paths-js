## An experiment on porting [Flow](https://flowtype.org) types into [paths-js](https://github.com/andreaferretti/paths-js).

### Low level API: Path

A first example is the simple example of the use of paths-js [low level API](https://github.com/andreaferretti/paths-js/wiki/Low%20level%20API):

  ```js
  var path = Path()
    .moveto(10, 20)
    .lineto(30, 50)
    .lineto(25, 28)
    .qcurveto(27, 30, 32, 27)
    .closepath();
  ```

Note that `Path`s are immutable objects, so most of the functions on them will return a new one.

The definition of `Path` declares the `moveto` function with an easy-to-guess signature:

  `function moveto(x: number, y: number): Path`

Same goes for `lineto`; while `vlineto` and `hlineto` would be like:

  `function hlineto(y: number): Path`

Following [flow-typed](https://github.com/flowtype/flow-typed) instructions one could put all of these function definitions inside a class like this:

  ```js
  declare class Path {
    lineto(x: number, y: number): Path;
    hlineto(x: number): Path;
    vlineto(y: number): Path;
  }
  ```

Whenever we reason about geometric plotting and drawing we cannot but start by defining `point`s.
Using Flow, a `Point` (in two-dimension) can be thought of a simple tuple:

  `declare type Point = [number, number]`

### Mid level API: Shapes

An higher level of usage of `paths-js` is its [mid level APi](https://github.com/andreaferretti/paths-js/wiki/Mid%20level%20API).

This part basically defines a few different shapes.
```
A module for a shape defines a function that takes as input some geometric data and returns a shape object. Shape objects have the two properties path and centroid.
```
Easy then! Let's give it a look then.

#### Shape

A simple shape will then look like this:

  ```js
  declare class Shape {
    path: Path;
    centroid: Point;
  }
  ```

#### Polygon

`Polygon` is the first kind of shapes. In js one would write something like this:

  ```js
  var points = [[1, 3], [2, 5], [3, 4], [2, 0]];
  var polygon = Polygon({
    points: points,
    closed: true
  });
  ```

Let's add our declaration:

  ```js
  declare class Polygon extends Shape {
    constructor(points: Array<Point>, closed?: boolean): Polygon;
  }
  ```

#### Semi-regular polygon

A semi-regular polygon has a `center` point and `radii` the distances of each point from the center:

  ```js
  declare class SemiRegularPolygon extends Shape {
    constructor(point: Point, radii: Array<Point>): SemiRegularPolygon;
  }
  ```

Following these two examples we can define more polygons, such as `Rectangle`s and `Curved Rectangle`s, `Bezier` curves, circular `Sector`s and `Connector`s.

