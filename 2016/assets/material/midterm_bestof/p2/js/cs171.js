// cs171.js
// Set of useful functions to re-use
(function(ns, jQuery) {
    'use strict';

    // d3.cs171 is our namespace
    var cs171 = ns.cs171 = (ns.cs171 || {});

    cs171.translate = function(x, y) {
        return "translate(" + x + "," + y + ")";
    };

    cs171.pluck = function(attribute) {
        return function(obj) {
            return obj[attribute];
        };
    };

    // Given function f and function g, returns
    // a function that does f(g())
    cs171.compose = function(f, g) {
        return function() {
            return f(g.apply(null, arguments));
        };
    };

    // Logs to console and returns
    cs171.log = function(value) {
        console.log(value);
        return value;
    };

    // Takes an extent ([x, y] tuple) and pads bottom and top with the
    // amounts specified. Top padding defaults to same as bottom.
    cs171.pad = function(extent, bottom, top) {
        bottom = bottom || 0;
        top = top || bottom;
        return [extent[0] - bottom, extent[1] + top];
    };

    // Converts a string value to an integer (of base 10)
    cs171.int = function int(str) {
        return parseInt(str, 10);
    };

    // Trigger an artificial click event on an svg node -- implemented
    // as a jQuery plugin. Found on stackoverflow!
    jQuery.fn.d3click = function() {
        this.each(function(i, e) {
            var evt = new MouseEvent("click");
            e.dispatchEvent(evt);
        });
    };

}(window.d3, window.jQuery));