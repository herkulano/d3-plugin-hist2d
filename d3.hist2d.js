(function() {

  d3.hist2d = function() {
    var b = 0; // bins
    var d; // domain
    var s; // size [width, height]
    var xi = 0; // array index for x
    var yi = 1; // array index for y
    var x; // row scale
    var y; // column scale
    var t = 12; // interval in ms to compute data between animation frames

    function hist2d(data, callback) {
      x = _quantize(d[0]);
      y = _quantize(d[1]);

      var hist = new Array(b * b);
      i = hist.length;
      while (i--) {
        hist[i] = [];
      }

      var id = 0;
      var hx = 0;
      var hy = 0;
      var now = 0;
      var then = 0;
      var i = data.length;

      var iterate = function() {
        if (i > 0) {
          now = then = Date.now();
          while (then - now < t && i-- > 0) {
            hx = x(data[i][xi]);
            hy = y(data[i][yi]);
            id = hx * b + hy;

            hist[id][hist[id].length] = data[i];

            if (!hist[id].k) {
              hist[id].x = hx;
              hist[id].y = hy;
              hist[id].k = true;
            }
            then = Date.now();
          }
          requestAnimationFrame(iterate);
        } else {
          hist = hist.filter(function(d) {
            return d.k;
          });
          requestAnimationFrame(terminate);
        }
      };
      requestAnimationFrame(iterate);

      var terminate = function() {
        callback(hist);
      };

      return hist2d;
    }

    // hist2d.bins(number) => b
    hist2d.bins = function(_) {
      if (!arguments.length) { return b; }
      b = _;
      return hist2d;
    };

    // hist2d.indices([x, y]) => [x, y]
    hist2d.indices = function(_) {
      if (!arguments.length) { return [xi, yi]; }
      xi = _[0];
      yi = _[1];
      return hist2d;
    };

    // hist2d.interval(number) => t
    hist2d.interval = function(_) {
      if (!arguments.length) { return t; }
      t = _;
      return hist2d;
    };

    // hist2d.domain([[x],[y]]) => d
    hist2d.domain = function(_) {
      if (!arguments.length) { return d; }
      d = _;
      return hist2d;
    };

    // hist2d.size([width, height]) => s
    hist2d.size = function(_) {
      if (!arguments.length) { return s; }
      s = [_[0] / b, _[1] / b];
      return hist2d;
    };

    /**
     * Quantize Credits:
     * Mike Bostock (@mbostock)
     * https://github.com/d3/d3-scale/blob/master/src/quantize.js
     */

    var _quantize = function(domain) {
      var x0 = +domain[0];
      var x1 = +domain[domain.length - 1];
      var kx = b / (x1 - x0);
      var i = b - 1;

      return function(x) {
        return Math.max(0, Math.min(i, Math.floor(kx * (x - x0))));
      };
    };

    return hist2d;
  };
})();
