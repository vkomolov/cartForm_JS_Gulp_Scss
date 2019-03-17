(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

exports.Sku =
/*#__PURE__*/
function () {
  /**constructor
   * @param: {object} itemsObj; initial data
   */
  function _class(itemsObj) {
    _classCallCheck(this, _class);

    if (Object.keys(itemsObj).length) {
      for (var prop in itemsObj) {
        this[prop] = itemsObj[prop];
      }
    } else throw new Error('no data in the given obj' + itemsObj.toString());
  }

  _createClass(_class, [{
    key: "getAllProps",
    value: function getAllProps() {
      return Object.keys(this);
    }
  }, {
    key: "initProperty",
    value: function initProperty(prop) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (prop in this) {
        if (!value) {
          return this[prop];
        }

        this[prop] = value;
        return this[prop];
      } else throw new Error("no such property found");
    }
  }, {
    key: "getSum",
    value: function getSum() {
      var sum = Math.round(this.price * this.itemQnty * 100) / 100;
      return sum.toFixed(2);
    }
  }]);

  return _class;
}();
/**@description: creates a new Order, based on the chosen goods;
 * It calculates the total Sum to pay with account to the taxes and the shipment cost; *
 * **/


exports.Order =
/*#__PURE__*/
function () {
  /**constructor
   * @param {array} skuArr: Array of Sku samples;
   * @param {number} tax: taxes as the share, percentage in {number};
   * @param {number} shippingCost: shipping cost;
   * @param {object} payer;  the sample of Payer;
   * @param {object} recipient; the sample of Recipient;
   */
  function _class2(skuArr) {
    var tax = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var shippingCost = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var payer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var recipient = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, _class2);

    this.scuArr = skuArr;
    this.tax = tax;
    this.shipping = shippingCost;
    this.payer = payer; //will be added when the form is filled

    this.recipient = recipient; //will be added when the form is filled
  }
  /**@description it calculates the total sum from each chosen item;
   * */


  _createClass(_class2, [{
    key: "getSubtotalSum",
    value: function getSubtotalSum() {
      var subtotal = 0;
      this.scuArr.forEach(function (scu) {
        subtotal += +scu.getSum();
      });

      if (subtotal) {
        return Math.round(subtotal * 100) / 100;
      } else {
        throw new Error("Something is wrong with price or qnty of sku");
      }
    }
    /**@description it calculates the tax value from the total sum of the chosen goods;
     * The tax is calculated as the share of the given sum;
     * @param {number} subtotal;  subtotal sum
     * @return {number};
     * */

  }, {
    key: "getTax",
    value: function getTax(subtotal) {
      //let subtotal = this.getSubtotalSum();
      return Math.round(subtotal / 100 * this.tax * 100) / 100;
    }
    /**@description it calculates the shipment value from the total sum of the chosen goods;
     * The shipment is calculated as the share of the given sum;
     * @param {number} subtotal; subtotal sum
     * @return {number};
     * */

  }, {
    key: "getShipping",
    value: function getShipping(subtotal) {
      return Math.round((subtotal + +this.shipping) * 100) / 100;
    }
    /**@description it calculates the shipment value from the total sum of the chosen goods;
     * The shipment is calculated as the share of the given sum;
     * @param {number} subtotal;
     * @return {number};
     * */

  }, {
    key: "getTotalSum",
    value: function getTotalSum(subtotal) {
      var result = subtotal + this.getTax(subtotal) + this.getShipping(subtotal);
      return Math.round(result * 100) / 100;
    }
    /**@description Getter/Setter combination:
     * - if value !== null, then to set the given property with the given value
     * and to return new value of the property;
     * - else, to return the value of the given property;
     * @param {string} prop; the property name;
     * @param {null} value; it can take all types;
     * */

  }, {
    key: "initProperty",
    value: function initProperty(prop) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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
  }]);

  return _class2;
}();

},{}],2:[function(require,module,exports){
'use strict';
/**@description the list of variables:
 * formName - the id-name of the form to work with;
 * storageChosen - the name of the localStorage of the chosen items;
 * storageArea - the name of the localStorage of the Area list, conditionally fetched;
 *               it will be used for the country search and selection in the form;
 * leftBarName - the name of the left bar with the form fields;
 * rightBarName - the name of the right bar with the cart data fields;
 * cartQntyName - the id-name of the DOM el, showing the number of the chosen items;
 * form__block - the class-name of three form blocks for each Registration Stage;
 * stageWrapperName - the name of the DOM Container comprising 'stages' in <span>; *
 * tax - {number} percent share will be taken from the sum of the Order;
 * shippingCost - {number} the cost for the shipment in sum;
 * innData - {object} initial data; in project will be replaced with the real data of the
 * chosen goods and the real fetching of the countries list;
 * */

var formName = 'order-form';
var storageChosen = 'chosen';
var storageArea = 'area';
var leftBarName = 'person-info';
var rightBarName = 'cart-info';
var cartQntyName = 'cart__qnty';
var formBlock = 'form__block';
var stageWrapperName = 'form__stage-wrapper';
var tax = 20;
var shippingCost = 30;

var innData = require('./partial/initialData');
/**@description the initial data;
 * @property {array} chosenArr; initial data of the chosen items;
 * @property {array} areaArr; conditionally fetched list of countries;
 * @property {object} init; comprises the inner funcs;
 * @property {object} inputNamesObj; comprises the form inputs` data;
 * @property {object} regExpObj; regExp data for validating the form inputs;
 * */


var data = {
  formBlock: formBlock,
  tax: tax,
  shippingCost: shippingCost,
  chosenArr: innData.chosenArr,
  areaArr: innData.areaArr,
  init: require('./partial/funcCollection'),
  inputNamesObj: require('./partial/inputsData'),
  regExpObj: require('./partial/regExpData')
};
/**@description checking for the initial localStorage and the Creation Date;
 * - If localStorage doesn`t exist or the Creation Date is longer than 1 day, then
 * to create the localStorage with the given data, creating the Creation Date;
 * In real project the localStorage with the chosen goods will be already set;
 * - To check for the quantity of the chosen goods in the localStorage and to show this
 * quantity in the header DOM element with id name "cart__qnty"; In real project this
 * indicator should be initiated in the <header />, which is common for all pages,
 * including this form page;
 * - If the form by id-name exists, then to equal heights of the left and right bars
 * and to init App;
 * */

window.addEventListener("DOMContentLoaded", function () {
  if (data.init.checkInStorage(storageChosen, data.chosenArr) && data.init.checkInStorage(storageArea, data.areaArr) && document.forms[formName]) {
    data.form = document.getElementById(formName);
    data.headerCartQnty = document.getElementById(cartQntyName);
    data.stageWrapper = document.getElementById(stageWrapperName);
    data.localStore = JSON.parse(localStorage.getItem(storageChosen));
    /**@description to get the quantity of the chosen goods from the localStorage;
     * To show the quantity in the header at the el with '#cart__qnty';
     * */

    if (data.headerCartQnty) {
      data.headerCartQnty.textContent = data.localStore.data.length;
    } else {
      throw new Error("no id ".concat(cartQntyName, " found"));
    }
    /**@description the collection of:
     * - 'person-info', left column, which contains the form fields;
     * - 'cart-info', right column, which contains the cart data fields;
     * */


    var colsArr = [document.querySelector(".".concat(leftBarName)), document.querySelector(".".concat(rightBarName))];
    /**@description making heights of the columns in the form equal by height;
     * */

    data.init.equalHeights(colsArr);
    /**@description initiating the form;
     * */

    initForm(data);
  } else {
    throw new Error("form #'order-form' not found or localStorage init error");
  } ///FUNCTIONS

  /**@description comprises the main operations for initiating the App:
   * - it creates the Sku samples from the array of the chosen goods;
   * - it creates the Order Sample, which comprises all the purchase data and will
   * be finally ready for fetching to the server;
   * @param {object} data: the initial data;
   * **/


  function initForm(data) {
    var stageArr = data.stageWrapper.querySelectorAll("span"); //there are three stages (0, 1, 2)

    var formBlockArr = data.form.querySelectorAll(".".concat(data.formBlock)); //three stage blocks of the form

    var tax = data.tax,
        shippingCost = data.shippingCost;
    var skuArr = data.init.createSku(data.chosenArr);
    var order;

    if (skuArr.length) {
      order = data.init.makeOrder(skuArr, tax, shippingCost);
      log(order);
    }
  }
}); ///dev

function log(item) {
  console.log(item);
}

},{"./partial/funcCollection":3,"./partial/initialData":4,"./partial/inputsData":5,"./partial/regExpData":6}],3:[function(require,module,exports){
'use strict'; //imports

var _require = require('../classes'),
    Sku = _require.Sku,
    Order = _require.Order;
/**@description:
 * It checks for the localStorage to exist, then:
 * - if false, it creates the object with the Creation Date and the given Data,
 * then stores it in the localStorage;
 * - if true, it checks for the Creation Date of the stored Object. If the time
 * difference is more, than 1 day (instance), then it creates new localStorage;
 * @param {string} name; The name of the localStorage;
 * @param {array} arr; {array} of objects;
 * **/


exports.checkInStorage = function (name, arr) {
  var storage = localStorage.getItem(name);
  var innData;

  if (storage) {
    innData = JSON.parse(storage);
    var creationDate = new Date(innData.creationDate);
    var currentDate = new Date();

    if ((currentDate - creationDate) / 1000 / 60 / 60 / 24 < 1) {
      return true;
    }
  }

  setLocalStorage(name, arr);
  return !!localStorage.getItem(name);
};
/**@description equalizes the heights of the DOM elements.
 * @param {array} colsArr; the array of the DOM elements to equalize;
 * */


exports.equalHeights = function (colsArr) {
  var highestCal = 0;

  for (var i = 0; i < colsArr.length; i++) {
    if (colsArr[i].offsetHeight >= highestCal) {
      highestCal = colsArr[i].offsetHeight;
    }
  }

  colsArr.forEach(function (col) {
    return col.style.height = highestCal + "px";
  });
};
/**@description creates the array of Sku Samples from the array of the chosen goods;
 * @param {array} chosenArr; The array of the chosen goods;
 * @return {array} of Sku Samples;
 * */


exports.createSku = function (chosenArr) {
  return chosenArr.map(function (sku) {
    return new Sku(sku);
  });
};
/**@description creates a new Order Sample with the data on the chosen goods;
 * @param {array} skuArr; The array of Sku Samples with the data on the chosen goods;
 * @param {number} tax;
 * @param {number} shippingCost;
 * @return {object} new Order Sample;
 * */


exports.makeOrder = function (skuArr, tax, shippingCost) {
  return new Order(skuArr, tax, shippingCost);
}; ///FUNCTIONS

/**@description:
 * It create the localStorage with the data and the creation Date;
 * @param {string} name; The name of the localStorage;
 * @param {array} data; Contains: {string} creationDate, {array} of objects;
 * **/


function setLocalStorage(name, data) {
  var dataWithDate = {};

  if (data.length) {
    dataWithDate = {
      data: data,
      creationDate: new Date()
    };
    localStorage.setItem(name, JSON.stringify(dataWithDate));
  }
} ///dev


function log(item) {
  console.log(item);
}

},{"../classes":1}],4:[function(require,module,exports){
'use strict';

exports.chosenArr = [{
  itemName: "The Chelsea Boot",
  itemId: "18035",
  price: "235",
  itemDetail: "Black",
  itemQnty: 1,
  photoUrl: "./img/boots.png"
}, {
  itemName: "The Twill Snap Backpack",
  itemId: "22016",
  price: "65",
  itemDetail: "Reverse Denim + Brown leather",
  itemQnty: 1,
  photoUrl: "./img/backpack.png"
}, {
  itemName: "The Twill Zip Tote",
  itemId: "38049",
  price: "48",
  itemDetail: "Reverse Denim + Black leather",
  itemQnty: 1,
  photoUrl: "./img/bag.png"
}];
exports.areaArr = ["Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore"];

},{}],5:[function(require,module,exports){
'use strict';

module.exports = {
  "recipient-full-name": {
    error: "Jonathan Smith",
    type: "spacedString",
    stage: 0
  },
  "recipient-phone-number": {
    error: "+7(987)123-77-88",
    type: "phone",
    stage: 0
  },
  "recipient-street-address": {
    error: "Pushkina",
    type: "string",
    stage: 0
  },
  "optional": {
    error: "format: All except: '+', '=', '*'",
    type: "combi",
    stage: -1
  },
  "recipient-city": {
    error: "Kazan",
    type: "string",
    stage: 0
  },
  "recipient-country": {
    error: "Russia",
    type: "stringMaySpace",
    stage: 0
  },
  "recipient-zip": {
    error: "420015",
    type: "zip",
    stage: 0
  },
  "billing-full-name": {
    error: "Jonathan Smith",
    type: "spacedString",
    stage: 2
  },
  "billing-email": {
    error: "j.smith@gmail.com",
    type: "email",
    stage: 1
  },
  "billing-street-address": {
    error: "Pushkina",
    type: "string",
    stage: 1
  },
  "billing-optional": {
    error: "format: All except: '+', '=', '*'",
    type: "combi",
    stage: -1
  },
  "billing-city": {
    error: "Kazan",
    type: "string",
    stage: 1
  },
  "billing-country": {
    error: "Russia",
    type: "stringMaySpace",
    stage: 1
  },
  "billing-zip": {
    error: "420015",
    type: "zip",
    stage: 1
  },
  "card-name": {
    error: "Jonathan Smith",
    type: "spacedString",
    stage: 2
  },
  "card-number": {
    error: "3333 7777 8888 3333",
    type: "cardNumber",
    stage: 2
  },
  "card-date": {
    error: "MMYY: 0518",
    type: "cardDate",
    stage: 2
  },
  "card-code": {
    error: "0458",
    type: "cardCode",
    stage: 2
  }
};

},{}],6:[function(require,module,exports){
'use strict';
/**@description: Validating each char input;
 * */

module.exports = {
  "phone": /^[\+]?[0-9]{0,1}[(]?[0-9]{0,3}[)]?[0-9]{0,3}[-]?[0-9]{0,2}[-]?[0-9]{0,2}$/,
  "string": /^[a-z]{1,30}$/i,
  "stringMaySpace": /^([a-z]{1,15}\s?)([a-z]{0,15}\s?)[a-z]{0,15}$/i,
  "spacedString": /^([a-z]{1,15}\s?)[a-z]{0,15}$/i,
  "combi": /^[^\+\*=]+$/i,
  "zip": /^[0-9]{1,6}$/i,
  "email": /^[a-z0-9]{1,15}[\@]?[a-z0-9]{0,15}[\.]?[a-z]{0,5}$/i,
  "cardNumber": /^[0-9]{1,4}\s?[0-9]{0,4}\s?[0-9]{0,4}\s?[0-9]{0,4}$/i,
  //will be then processed
  "cardDate": /^[0-9]{1,4}$/i,
  //will be then processed
  "cardCode": /^[0-9]{1,4}$/i
};

},{}]},{},[2])
//# sourceMappingURL=main.js.map
