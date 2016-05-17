/// <reference path='../src/_exports.ts' />

/// <reference path='../bower_components/DefinitelyTyped/node/node.d.ts' /> 
/// <reference path='../bower_components/DefinitelyTyped/mocha/mocha.d.ts' /> 
/// <reference path='../bower_components/DefinitelyTyped/chai/chai.d.ts' /> 
/// <reference path='../bower_components/DefinitelyTyped/sinon-chai/sinon-chai.d.ts' /> 
/// <reference path='../bower_components/DefinitelyTyped/sinon/sinon.d.ts' />


function isPhantomJS(): boolean {
    var userAgent = navigator.userAgent;
    var found = userAgent.toLocaleLowerCase().indexOf('phantomjs');
    return found > 0 ? true : false;
}

function isNodeJS(): boolean {
    var found = false;
    if (typeof module !== 'undefined' && module.exports)
        found = true;
    return found;
}

if (isNodeJS()) {
    chai = require('chai');
    _ = require('underscore');
    typemoq = require('../../../dist/typemoq.js');
}

var assert = chai.assert;
var expect = chai.expect;
