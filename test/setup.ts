/// <reference path='../.tmp/src/typemoq.d.ts' />

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
    _ = require('lodash');
    typemoq = require('../../dist/typemoq.js');
}

let assert = chai.assert;
let expect = chai.expect;
