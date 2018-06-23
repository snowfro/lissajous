// M_2_5_02
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * explore different parameters of drawing lissajous figures
 *
 * KEYS
 * s                   : save png
 */

'use strict';

var sketch = function( p ) {

  var pointCount = 1300;
  var pointIndex = 0;
  var lissajousPoints = [];

  var freqX = allSlices[1]/25;
//var freqX = 15;
  var freqY = allSlices[2]/25;
  //var freqY = 15;

  var phi = (allSlices[0] % 100);
  //var phi = 100;


  var modFreqX = allSlices[3]/150;
  var modFreqY = allSlices[4]/150;

  var modFreq2X = allSlices[5]/150;
  var modFreq2Y = allSlices[6]/150;
  var modFreq2Strength = allSlices[7]/255;

  var randomOffset = allSlices[8]/126;
//if (allSlices[9]<125){
  //var invertBackground = false;} else {
  var invertBackground = true;
//}
  console.log(invertBackground);
  var lineWeight = 1;
  var lineAlpha = 30;

  var connectAllPoints = true;
  var connectionRadius = 90;
  var minHueValue = allSlices[11];
  var hueSpread = allSlices[31];
  //var minHueValue = 200;
  console.log("minHue" + minHueValue);
  console.log("spread" + hueSpread);
  console.log("maxHue" + (minHueValue + hueSpread));
  var maxHueValue = minHueValue + hueSpread;
  //var maxHueValue = (allSlices[11]+125) % 255;
  console.log("maxHue" + maxHueValue);
  //var saturationValue = 100;
  var saturationValue = allSlices[25] % 100;
  console.log("satslice: " + allSlices[13]);
  console.log("satvalue: " + saturationValue);
  //var brightnessValue = allSlices[14]/2.55;
  var brightnessValue = 0;
  console.log("brtvalue: " + brightnessValue);
  var invertHue = false;

  p.setup = function() {

    p.createCanvas(650, 650);

    p.colorMode(p.HSB, 255, 100, 100, 100);

    p.strokeWeight(lineWeight);
    p.noFill();

    var backgroundColor = invertBackground ? p.color(0) : p.color(0, 0, 100);
    p.background(backgroundColor);


    calculateLissajousPoints();
  }



  p.draw = function() {

    if (!connectAllPoints) {
      for (var i = 0; i < pointCount - 1; i++) {
        drawLine(lissajousPoints[i], lissajousPoints[i + 1]);
      }
    } else {
      // Don't draw all lines at once. Draw them in steps of 10 milliseconds to improve performance.
      var drawEndTime = window.performance.now() + 10;
      for (var i1 = pointIndex; i1 < pointCount && window.performance.now() < drawEndTime; i1++) {
        for (var i2 = 0; i2 < i1; i2++) {
          drawLine(lissajousPoints[i1], lissajousPoints[i2]);
        }
        pointIndex = i1;
      }
    }

    if (pointIndex >= pointCount - 1) {
      p.noLoop();
    }
  }

  p.keyPressed = function() {
    if (p.key == 's' || p.key == 'S') {
      p.saveCanvas(gd.timestamp(), 'png');
    }
  }

  var calculateLissajousPoints = function() {
    p.randomSeed(0);

    for (var i = 0; i <= pointCount; i++) {
      var angle = p.map(i, 0, pointCount, 0, p.TAU);

      var fmx = p.sin(angle * modFreq2X) * modFreq2Strength + 1;
      var fmy = p.sin(angle * modFreq2Y) * modFreq2Strength + 1;

      var x = p.sin(angle * freqX * fmx + p.radians(phi)) * p.cos(angle * modFreqX);
      var y = p.sin(angle * freqY * fmy) * p.cos(angle * modFreqY);

      var rx = p.random(-randomOffset, randomOffset);
      var ry = p.random(-randomOffset, randomOffset);

      x = (x * (p.width / 2 - 30 - randomOffset) + p.width / 2) + rx;
      y = (y * (p.height / 2 - 30 - randomOffset) + p.height / 2) + ry;

      lissajousPoints[i] = p.createVector(x, y);
    }
  }

  var drawLine = function(vector1, vector2) {
    var distance = p5.Vector.dist(vector1, vector2);
    var angle = p.pow(1 / (distance / connectionRadius + 1), 6);

    if (distance <= connectionRadius) {
      var hue = p.lerp(minHueValue, maxHueValue, (invertHue ? 1 - angle : angle)) % 255;
      p.stroke(
        hue,
        saturationValue,
        invertBackground ? 100 - brightnessValue : brightnessValue,
        angle * lineAlpha + (pointIndex % 2 * 2));
      p.line(vector1.x, vector1.y, vector2.x, vector2.y);
    }
  }

};
