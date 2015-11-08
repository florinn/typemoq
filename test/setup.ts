/// <reference path='../src/_all.ts' />

/// <reference path='../bower_components/DefinitelyTyped/mocha/mocha.d.ts' /> 
/// <reference path='../bower_components/DefinitelyTyped/chai/chai.d.ts' /> 
/// <reference path='../bower_components/DefinitelyTyped/sinon-chai/sinon-chai.d.ts' /> 
/// <reference path='../bower_components/DefinitelyTyped/sinon/sinon.d.ts' />


var assert = chai.assert;
var expect = chai.expect;


function isPhantomJS(): boolean {
    var userAgent = navigator.userAgent;
    var found = userAgent.toLocaleLowerCase().indexOf("phantomjs");
    return found > 0 ? true : false;
}