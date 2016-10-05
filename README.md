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

### High level API: Graphs

A first example of high level api is a simple bar graph. Let's see `paths-js` example of such a graph:

  ```js
  var bar = Bar({
    data: [
      [
        { name: 'Italy', population: 59859996 },
        { name: 'Spain', population: 46704314 },
        { name: 'France', population: 65806000 },
        { name: 'Romania', population: 20121641 },
        { name: 'Greece', population: 10815197 }
      ],
      [
        { name: 'Zambia', population: 14580290 },
        { name: 'Cameroon', population: 20386799 },
        { name: 'Nigeria', population: 173615000 },
        { name: 'Ethiopia', population: 86613986 },
        { name: 'Ghana', population: 24658823 }
      ]
    ],
    accessor: function(x) { return x.population; },
    compute: {
      color: function(i) { return somePalette[i]; }
    },
    width: 500,
    height: 400,
    gutter: 10,
    max: 200000000,
    min: 0
  });
  ```

First thing we can take into account is that our `Bar` type can be polymorphic, meaning you can build a `Bar` out of any object type. In the example above we would have a `Country` type which might look like this:

  ```js
  type Country = {
    name: string,
    population: number,
  };
  ```

Let's take a look at the declaration then. Using an option object as a parameter helps us with optional properties.

  ```js
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
  ```

Given the above declaration, we can use it this way:

  ```js
  const data: Array<Array<Country>> =[
      [
        { name: 'Italy', population: 59859996 },
        { name: 'Spain', population: 46704314 },
        { name: 'France', population: 65806000 },
        { name: 'Romania', population: 20121641 },
        { name: 'Greece', population: 10815197 }
      ],
      [
        { name: 'Zambia', population: 14580290 },
        { name: 'Cameroon', population: 20386799 },
        { name: 'Nigeria', population: 173615000 },
        { name: 'Ethiopia', population: 86613986 },
        { name: 'Ghana', population: 24658823 }
      ]
    ];

  function accessor(c: Country) { return c.population; };

  const options = {data: data, accessor: accessor, width: 1, height: 2, max: 3, min: 4, gutter: 5};

  const bar: Bar<Country> = new Bar(options);
  ```

  Similarly a `pie` can be defined like:

  ```js
  declare class Pie<A> {
    constructor(options:
      {| data: Array<A>,
        accessor?: (a: A) => number,
        center: Point,
        r: number,
        R: number |}): Pie<A>;
  }
  ```
