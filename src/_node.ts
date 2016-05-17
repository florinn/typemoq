/// <reference path='../bower_components/DefinitelyTyped/node/node.d.ts' /> 

if (typeof require !== "undefined") {
    var _: UnderscoreStatic = require("underscore");
}

if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
        exports = module.exports = typemoq;
    }
    exports.typemoq = typemoq;
} else {
    this.typemoq = typemoq;
}