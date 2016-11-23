var tape = require('tape'),
    hist2d = require('../');

var histFn = hist2d.hist2d()
  .bins(10)
  .indices([0, 1])
  .domain([[0, 9], [0, 90]]);

var mapFn = (i) => ({'l': i.length, 'x': i.x, 'y': i.y});

tape('d3.hist2d() bins are correct for case 1', function(t) {
  var data = [
    [0,0],[1,10],[2,20],[3,30],[4,40],
    [5,50],[6,60],[7,70],[8,80],[9,90]
  ];

  var ref = [
    { l: 1, x: 0, y: 0 },
    { l: 1, x: 1, y: 1 },
    { l: 1, x: 2, y: 2 },
    { l: 1, x: 3, y: 3 },
    { l: 1, x: 4, y: 4 },
    { l: 1, x: 5, y: 5 },
    { l: 1, x: 6, y: 6 },
    { l: 1, x: 7, y: 7 },
    { l: 1, x: 8, y: 8 },
    { l: 1, x: 9, y: 9 }
  ];

  histFn(data, (hist) => {
    t.deepEqual(hist.map(mapFn), ref);
    t.end();
  });


});

tape('d3.hist2d() bins are correct for case 2', function(t) {
  var data = [
    [1,10],[1,10],[2,20],[3,30],[4,40],
    [5,50],[6,60],[7,70],[8,80],[8,80]
  ];

  var ref = [
    { l: 2, x: 1, y: 1 },
    { l: 1, x: 2, y: 2 },
    { l: 1, x: 3, y: 3 },
    { l: 1, x: 4, y: 4 },
    { l: 1, x: 5, y: 5 },
    { l: 1, x: 6, y: 6 },
    { l: 1, x: 7, y: 7 },
    { l: 2, x: 8, y: 8 }
  ];

  histFn(data, (hist) => {
    t.deepEqual(hist.map(mapFn), ref);
    t.end();
  });
});


// Needs requestAnimationFrame to test in node environment
global.requestAnimationFrame = function () {
  var fps = 60;
  var delay = 1000 / fps;
  var animationStartTime = Date.now();
  var previousCallTime = animationStartTime;

  return function requestAnimationFrame(callback) {
    var requestTime = Date.now();
    var timeout = Math.max(0, delay - (requestTime - previousCallTime));
    var timeToCall = requestTime + timeout;

    previousCallTime = timeToCall;

    return global.setTimeout(function onAnimationFrame() {
      callback(timeToCall - animationStartTime);
    }, timeout);
  };
}();
