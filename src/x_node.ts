if (typeof require !== "undefined") {
    var _: _.LoDashStatic = require("lodash");
}

if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
        exports = module.exports = typemoq;
    }
    exports.typemoq = typemoq;
} else {
    this.typemoq = typemoq;
}