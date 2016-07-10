/// <reference path='../.tmp/src/output.d.ts' />

/// <reference path='../bower_components/DefinitelyTyped/underscore/underscore.d.ts' /> 
/// <reference path='../bower_components/DefinitelyTyped/node/node.d.ts' /> 
/// <reference path='../bower_components/DefinitelyTyped/mocha/mocha.d.ts' /> 
/// <reference path='../bower_components/DefinitelyTyped/chai/chai.d.ts' /> 
/// <reference path='../bower_components/DefinitelyTyped/sinon-chai/sinon-chai.d.ts' /> 
/// <reference path='../bower_components/DefinitelyTyped/sinon/sinon.d.ts' />


function isPhantomJS(): boolean {
    let userAgent = navigator.userAgent;
    let found = userAgent.toLocaleLowerCase().indexOf('phantomjs');
    return found > 0 ? true : false;
}

function isNodeJS(): boolean {
    let found = false;
    if (typeof module !== 'undefined' && module.exports)
        found = true;
    return found;
}

if (isNodeJS()) {
    chai = require('chai');
    _ = require('underscore');
    typemoq = require('../../dist/typemoq.js');
}

let assert = chai.assert;
let expect = chai.expect;
