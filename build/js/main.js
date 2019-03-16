(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
/**@description: creates a new product item from the given properties; *
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

},{}],2:[function(require,module,exports){
'use strict';
/**@description the list of variables:
 * storageChosen - the name of the localStorage of the chosen items;
 * storageArea - the name of the localStorage of the Area list, conditionally fetched;
 *               it will be used for the country search and selection in the form;
 * leftBarName - the name of the left bar with the form fields;
 * rightBarName - the name of the right bar with the cart data fields;
 * innData - {object} initial data; in project will be replaced with the real data of the
 * chosen goods and the real fetching of the countries list;
 * */

var storageChosen = 'chosen';
var storageArea = 'area';
var leftBarName = 'person-info';
var rightBarName = 'cart-info';

var innData = require('./partial/initialData');
/**@description the initial data;
 * @property {string} formName; the id-name of the form to work with;
 * @property {string} cartQnty; the id-name of the el, showing the number of the chosen items;
 * @property {string} formBlock; the class-name of three form blocks for each Registration Stage;
 * @property {string} stageWrapperName; the name of the DOM Container comprising 'stages' in <span>;
 * @property {array} chosenArr; initial data of the chosen items;
 * @property {array} areaArr; conditionally fetched list of countries;
 * @property {object} init; comprises the inner funcs;
 * @property {object} inputNamesObj; comprises the form inputs` data;
 * @property {object} regExpObj; regExp data for validating the form inputs;
 * */


var data = {
  formName: 'order-form',
  cartQnty: 'cart__qnty',
  formBlock: 'form__block',
  stageWrapperName: 'form__stage-wrapper',
  chosenArr: innData.chosenArr,
  areaArr: innData.areaArr,
  init: require('./partial/funcCollection'),
  inputNamesObj: require('./partial/inputsData'),
  regExpObj: require('./partial/regExpData')
};
/**@description checking for the initial localStorage and the Creation Date;
 * - If localStorage doesn`t exist or the Creation Date is longer than 1 day, then
 * to create the localStorage with the given data, creating the Creation Date;
 * - If the form by id-name exists, then to equal heights of the left and right bars
 * and to init App;
 * */

window.addEventListener("DOMContentLoaded", function () {
  if (data.init.checkInStorage(storageChosen, data.chosenArr) && data.init.checkInStorage(storageArea, data.areaArr) && document.forms[data.formName]) {
    data.localStore = JSON.parse(localStorage.getItem(storageChosen));
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

  /**@description comprises the main operations with inputs and DOM navigation
   * @param {object} data; the initial data;
   * **/


  function initForm(data) {
    var form = document.getElementById(data.formName),
        headerCart = document.getElementById(data.cartQnty),
        stageWrapper = document.getElementById(data.stageWrapperName),
        stageArr = stageWrapper.querySelectorAll("span"),
        //there are three stages (0, 1, 2)
    formBlockArr = form.querySelectorAll(".".concat(data.formBlock)); //three stage blocks of the form

    console.log(headerCart);

    function initCart() {}
  }
}); ///dev

function log(item) {
  console.log(item);
}

},{"./partial/funcCollection":3,"./partial/initialData":4,"./partial/inputsData":5,"./partial/regExpData":6}],3:[function(require,module,exports){
'use strict'; //imports

var _require = require('../classes'),
    Sku = _require.Sku;
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
/**@description
 * */


exports.createCart = function () {};
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
