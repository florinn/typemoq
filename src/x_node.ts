if (typeof require !== "undefined") {
    var _: _.UnderscoreStatic = require("underscore");
}

if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
        exports = module.exports = typemoq;
    }
    exports.typemoq = typemoq;
} else {
    this.typemoq = typemoq;
}