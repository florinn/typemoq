module TypeMoq {
    export class PropertyRetriever {

        static getOwnEnumerables(obj) {
            return this._getPropertyNames(obj, true, false, this._enumerable);
            // Or could use for..in filtered with hasOwnProperty or just this: return Object.keys(obj);
        }

        static getOwnNonenumerables(obj) {
            return this._getPropertyNames(obj, true, false, this._notEnumerable);
        }

        static getOwnEnumerablesAndNonenumerables(obj) {
            return this._getPropertyNames(obj, true, false, this._enumerableAndNotEnumerable);
            // Or just use: return Object.getOwnPropertyNames(obj);
        }

        static getPrototypeEnumerables(obj) {
            return this._getPropertyNames(obj, false, true, this._enumerable);
        }

        static getPrototypeNonenumerables(obj) {
            return this._getPropertyNames(obj, false, true, this._notEnumerable);
        }

        static getPrototypeEnumerablesAndNonenumerables(obj) {
            return this._getPropertyNames(obj, false, true, this._enumerableAndNotEnumerable);
        }

        static getOwnAndPrototypeEnumerables(obj) {
            return this._getPropertyNames(obj, true, true, this._enumerable);
            // Or could use unfiltered for..in
        }

        static getOwnAndPrototypeNonenumerables(obj) {
            return this._getPropertyNames(obj, true, true, this._notEnumerable);
        }

        static getOwnAndPrototypeEnumerablesAndNonenumerables(obj) {
            return this._getPropertyNames(obj, true, true, this._enumerableAndNotEnumerable);
        }

        // Private static property checker callbacks
        private static _enumerable(obj, prop) {
            return obj.propertyIsEnumerable(prop);
        }

        private static _notEnumerable(obj, prop) {
            return !obj.propertyIsEnumerable(prop);
        }

        private static _enumerableAndNotEnumerable(obj, prop) {
            return true;
        }

        private static _getPropertyNames(obj, iterateSelfBool, iteratePrototypeBool, includePropCb): Array<{ name: string; desc: PropertyDescriptor }> {
            var result: Array<{ name: string; desc: PropertyDescriptor }> = [];

            do {
                if (iterateSelfBool) {

                    var props = Object.getOwnPropertyNames(obj);
                    _.forEach(props, prop => {
                        var duplicate = _.find(result, p => p.name === prop);

                        if (!duplicate && includePropCb(obj, prop)) {
                            var propDesc = Object.getOwnPropertyDescriptor(obj, prop);
                            result.push({ name: prop, desc: propDesc });
                        }
                    });
                }

                if (!iteratePrototypeBool) {
                    break;
                }

                iterateSelfBool = true;

            } while (obj = Object.getPrototypeOf(obj));

            return result;
        }

    }
} 