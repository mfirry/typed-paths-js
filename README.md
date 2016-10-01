## An experiment on porting [Flow](https://flowtype.org) types into [paths-js](https://github.com/andreaferretti/paths-js).

### Path

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