!function(a){"object"==typeof exports?module.exports=a():"function"==typeof define&&define.amd?define(a):"undefined"!=typeof window?window.storage=a():"undefined"!=typeof global?global.storage=a():"undefined"!=typeof self&&(self.storage=a())}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){/*!
Copyright (c) 2013 Derek Petersen https://github.com/tuxracer/simple-storage MIT Licensed
*/
var c;c=function(a){return"session"!==a&&(a="local"),window[a+"Storage"]},b.exports={set:function(a,b,d){if(!(arguments.length>=2))throw new Error("Not enough arguments");if("function"==typeof b)throw new TypeError("Cannot store functions");return"object"==typeof b&&(b=JSON.stringify(b)),c(d).setItem(a,b)},get:function(a,b){var d,e;if(null==a)return null;e=c(b).getItem(a);try{return JSON.parse(e)}catch(f){return d=f,e}},remove:function(a,b){if(null==a)throw new Error("Not enough arguments");return c(b).removeItem(a)},clear:function(a){return c(a).clear()}}},{}]},{},[1])(1)});