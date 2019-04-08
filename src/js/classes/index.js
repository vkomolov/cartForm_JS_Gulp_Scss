'use strict';

/**@description: creates a new product item from the given properties;
 * creates prototype methods on:
 * - getAllProps(): returns all properties except .prototype methods;
 * - initProperty({string} prop, {boolean} value -(optional)):
 * if 'arguments[value]' equals null, then it returns the 'prop' value,
 * else it changes the 'prop' value to 'arguments[value]' and returns new 'prop' value;
 * - getSum(): it calculates and returns the sum by multiplying the qnty and the
 * price of the product; rounding the sum to 2 decimals;
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

/**@description: creates a new Order, based on the chosen goods;
 * It calculates the total Sum to pay with account to the taxes and the shipment cost; *
 * **/
exports.Order = class {
    /**constructor
     * @param {array} skuArr: Array of Sku samples;
     * @param {number} tax: taxes as the share, percentage in {number};
     * @param {number} shippingCost: cost as the share, percentage in {number};
     */
    constructor(skuArr, tax=0, shippingCost=0) {
        this.orderNo = null;
        this.payer = null; //will be added when the form is filled
        this.recipient = null; //will be added when the form is filled
        this.skuArr = skuArr;
        this.tax = tax;
        this.shipping = shippingCost;
        this.orderDate = new Date();
    }

    /**@description it calculates the total sum from each chosen item;
     * */
    getSubtotalSum() {
        let subtotal = 0;
        this.skuArr.forEach(sku => {
            subtotal += +sku.getSum();
        });

        if (subtotal) {
            return Math.round(subtotal * 100) / 100;
        }
        else {
            throw new Error("Something is wrong with price or qnty of sku");
        }
    }

    /**@description it calculates the tax value from the total sum of the chosen goods;
     * The tax is calculated as the share of the given sum;
     * @param {number} subtotal;  subtotal sum
     * @return {number};
     * */
    getTax() {
        let subtotal = this.getSubtotalSum();
        return Math.round(((subtotal / 100) * this.tax) * 100) / 100;
    }

    /**@description it calculates the shipment value from the total sum of the chosen goods;
     * The shipment is calculated as the share of the given sum;
     * @param {number} subtotal; subtotal sum
     * @return {number};
     * */
    getShipping() {
        let subtotal = this.getSubtotalSum();
        return Math.round(((subtotal / 100) * this.shipping) * 100) / 100;
    }

    /**@description it calculates the shipment value from the total sum of the chosen goods;
     * The shipment is calculated as the share of the given sum;
     * @param {number} subtotal;
     * @return {number};
     * */
    getTotalSum() {
        let subtotal = this.getSubtotalSum();
        let result = subtotal + this.getTax() + this.getShipping();
        return Math.round(result * 100) / 100;
    }

    /**@description Getter/Setter combination:
     * - if value !== null, then to set the given property with the given value
     * and to return new value of the property;
     * - else, to return the value of the given property;
     * @param {string} prop; the property name;
     * @param {null} value; it can take all types;
     * */
    initProperty(prop, value=null) {
        if (prop in this) {
            if (!value) {
                return this[prop];
            }
            this[prop] = value;
            return this[prop];
        } else {
            throw new Error("no such property found");
        }
    }
};