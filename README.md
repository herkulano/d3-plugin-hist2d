# 2D Histogram

[![bitHound Dependencies](https://www.bithound.io/github/herkulano/d3-plugin-hist2d/badges/dependencies.svg)](https://www.bithound.io/github/herkulano/d3-plugin-hist2d/master/dependencies/npm)

**d3.hist2d** plugin implements a non-blocking **rectangular binning**. It's useful for displaying a scatterplot with millions of points, aggregating the data into a more coarse representation suitable for display.

It can be used as a module of a larger application, because it doesn't block the UI, it computes the values between each animation frame.

Inspired by the work of [Mike Bostock](https://github.com/d3/d3-plugins/tree/master/hexbin).

#### Example

[http://bl.ocks.org/herkulano/4f43dbf3473dc5503052](http://bl.ocks.org/herkulano/4f43dbf3473dc5503052)

#### Usage

<a name="hist2d" href="#hist2d">#</a> <b>hist2d</b>([_data_], _callback_)

Expects [_data_] to be an array of arrays: _[[1,2],[3,4],...]_  

The _callback_ function is called when the binning is complete. It sends the data to its parameter.

```js
d3.hist2d()
  .bins(40)
  .domain([0, 100])
  (data, draw);

function draw(hist) {
  // hist is the binned data
}
```

The returned data is an array of bins. Each bin contains its position in columns and rows as x and y:

* x - the column's position
* y - the row's position

Bins that are empty are omitted.

<a name="bins" href="#bins">#</a> hist2d.__bins__(_bins_)

Sets the number of columns and rows for the bins of the rectangular histogram.
The total number of bins is `columns * rows === bins * bins`

<a name="indices" href="#indices">#</a> hist2d.__indices__([_x index_, _y index_])

Defines the indices of the data in the original array. This is useful if the data has more than two values or if the values are out of order.

Example:
```js
[
  [0, 43, 12248, 30],
  [1, 45, 12398, 40],
  [2, 46, 12456, 50],
  ...
]

// we want to use [2] as x and [1] as y
d3.hist2d()
  .bins(40)
  .indices([2, 1])
  .domain([0, 100])
  (data, draw);
```

If __indices__ is not set it defaults to `[0, 1]`.

<a name="domain" href="#domain">#</a> hist2d.__domain__([ [_x domain_], [_y domain_] ])

Sets the input domains for x and y. Expects an array with two arrays of numbers.

<a name="size" href="#size">#</a> hist2d.__size__([_width, height_])

`[width, height]` of the scatterplot. Sets the width and height of the cells `size / bins`.

<a name="size_get" href="#size_get">#</a> hist2d.__size__()

Returns an array with the width and height of the cells `[width, height]`.

<a name="interval" href="#interval">#</a> hist2d.__interval__(_interval_)

The binning function is non-blocking, so the values are computed between each animation frame for 12ms by default.

#### License & Acknowledgements

[LICENSE](https://raw.githubusercontent.com/herkulano/d3-plugin-hist2d/master/LICENSE)


[![Analytics](https://ga-beacon.appspot.com/UA-67903380-1/d3-plugin-hist2d/)](https://github.com/igrigorik/ga-beacon)
