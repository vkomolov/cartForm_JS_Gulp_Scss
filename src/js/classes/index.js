'use strict';

/**@description: creates a new product item from the given properties; *
 * **/
exports.Sku = class {
    /**constructor
     * @param: {object} itemsObj; initial data
     */
    constructor ( itemsObj ) {
        if (Object.keys(itemsObj).length) {
            for (let prop in itemsObj) {
                this[prop] = itemsObj[prop];
            }
        } else throw new Error('no data in the given obj' + itemsObj.toString());
    }

    getAllProps() {
        return Object.keys(this);
    }

    initProperty(prop, value=null) {
        if (prop in this) {
            if ( !value ) {
                return this[prop];
            }

            this[prop] = value;
            return this[prop];
        } else throw new Error("no such property found");
    }

    getSum() {
        let sum = Math.round((this.price * this.itemQnty) * 100) / 100;
        return sum.toFixed(2);
    }
};

/*
exports.Sku = (itemsObj) => {
    if (Object.keys(itemsObj).length) {
        for (let prop in itemsObj) {
            this[prop] = itemsObj[prop];
        }
    }

    Sku.prototype.getAllProps = function () {
        return Object.keys(this);
    };

    Sku.prototype.initProperty = function (property, value) {
        let prop = property;
        if (prop in this) {
            if (arguments.length === 1) {
                return this[prop];
            }
            this[prop] = value;
        }
        else throw new Error("no such property found");
    };

    Sku.prototype.getSum = function () {
        let sum = Math.round((this.price * this.itemQnty) * 100) / 100;
        return sum.toFixed(2);
    }
};*/
