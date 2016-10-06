"use strict";


var R = require('ramda');

var user = {
    id: 1,
    name: "Tom",
    age: 1,
    deprecatedField: 'myOldValue'
};


var f1 = R.over(R.lensPath(['name']), R.concat(R.__, " Johnson"));
var f2 = R.over(R.lensPath(['age']), R.inc);

var f3 = R.dissocPath(['deprecatedField']);
var f4 = R.assocPath(['newGroup', 'newField'], 'newValue');

var ff = R.compose(f1, f2, f3, f4);
console.log(ff(user));
