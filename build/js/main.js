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
   * @param {number} shippingCost: cost as the share, percentage in {number};
   */
  function _class2(skuArr) {
    var tax = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var shippingCost = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, _class2);

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


  _createClass(_class2, [{
    key: "getSubtotalSum",
    value: function getSubtotalSum() {
      var subtotal = 0;
      this.skuArr.forEach(function (sku) {
        subtotal += +sku.getSum();
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
    value: function getTax() {
      var subtotal = this.getSubtotalSum();
      return Math.round(subtotal / 100 * this.tax * 100) / 100;
    }
    /**@description it calculates the shipment value from the total sum of the chosen goods;
     * The shipment is calculated as the share of the given sum;
     * @param {number} subtotal; subtotal sum
     * @return {number};
     * */

  }, {
    key: "getShipping",
    value: function getShipping() {
      var subtotal = this.getSubtotalSum();
      return Math.round(subtotal / 100 * this.shipping * 100) / 100;
    }
    /**@description it calculates the shipment value from the total sum of the chosen goods;
     * The shipment is calculated as the share of the given sum;
     * @param {number} subtotal;
     * @return {number};
     * */

  }, {
    key: "getTotalSum",
    value: function getTotalSum() {
      var subtotal = this.getSubtotalSum();
      var result = subtotal + this.getTax() + this.getShipping();
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
/**@description
 * - checking for the initial localStorage and the Creation Date;
 * If localStorage doesn`t exist or the Creation Date is longer than 1 day, then
 * to create the localStorage with the given data, creating the Creation Date;
 * In real project the localStorage with the chosen goods will be already set;
 * - To check for the quantity of the chosen goods in the localStorage and to show this
 * quantity in the header DOM element with id name "cart__qnty"; In real project this
 * indicator should be initiated in the <header />, which is common for all pages,
 * including this form page;
 * - If the form by id-name exists, then to equal heights of the left and right bars;
 * - to init App with the prepared args;
 * */

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

window.addEventListener("DOMContentLoaded", function () {
  var tax = 20;
  var shippingCost = 30;

  var innData = require('./partial/initialData');

  var cssVars = require('./partial/cssVars');

  var initForm = require('./partial/initForm');
  /**@description the initial data, will be passed as the arguments;
   * @property {array} chosenArr; initial data of the chosen items;
   * @property {array} areaArr; conditionally fetched list of countries;
   * @property {object} init; comprises the inner funcs;
   * @property {object} inputNamesObj; comprises the form inputs` data;
   * @property {object} regExpObj; regExp data for validating the form inputs;
   * @property {object} personInfo; will be set when all required inputs filled
   * */


  var data = _objectSpread({}, cssVars, {
    order: {},
    tax: tax,
    shippingCost: shippingCost,
    stage: 0,
    chosenArr: innData.chosenArr,
    areaArr: innData.areaArr,
    init: require('./partial/funcCollection'),
    inputNamesObj: require('./partial/inputsData'),
    regExpObj: require('./partial/regExpData'),
    inputValues: {}
  });
  /**@description checks for the localStorage or creates it;
   * @param {string} data.storageChosen; The name of the localStorage;
   * @param {array} data.chosenArr; The data to store in the localStorage;
   * */


  if (data.init.checkInStorage(data.storageChosen, data.chosenArr) && data.init.checkInStorage(data.storageArea, data.areaArr) && document.forms[data.formName]) {
    data.form = document.getElementById(data.formName);
    data.headerCartQnty = document.getElementById(data.cartQntyName);
    data.stageWrapper = document.getElementById(data.stageWrapperName);
    data.localStore = JSON.parse(localStorage.getItem(data.storageChosen));
    /**@description to get the quantity of the chosen goods from the localStorage;
     * To show the quantity in the header with the el '#cart__qnty';
     * */

    if (data.headerCartQnty) {
      data.headerCartQnty.textContent = data.localStore.data.length;
    } else {
      throw new Error("no id ".concat(data.cartQntyName, " found"));
    }
    /**@description the collection is used for equalizing the heights of given Els:
     * - 'person-info', left column, which contains the form fields;
     * - 'cart-info', right column, which contains the cart data fields;
     * */


    var colsArr = [document.querySelector(".".concat(data.leftBarName)), document.querySelector(".".concat(data.rightBarName))];
    /**@description making heights of the columns in the form to be equal by height;
     * @param {array} colsArr; The array of columns to equalize in height;
     * */

    data.init.equalHeights(colsArr);
    /**@description initiating the form with the prepared data;
     * @param {object} data; initial data;
     * */

    initForm(data);
  } else {
    throw new Error("form #'order-form' not found or localStorage init error");
  }
}); ///dev

function log(item) {
  console.log(item);
}

},{"./partial/cssVars":6,"./partial/funcCollection":8,"./partial/initForm":9,"./partial/initialData":10,"./partial/inputsData":11,"./partial/regExpData":12}],3:[function(require,module,exports){
'use strict';
/**@description When the order data is posted, then
 * on response OK to show final thanks in DOM.
 * @param {object} data: the initial data with funcs and variables;
 * */

module.exports = function (data) {
  var form = data.form,
      order = data.order;
  var leftBar = document.querySelector(".".concat(data.leftBarName));
  var rightBar = document.querySelector(".".concat(data.rightBarName));
  var thankU = document.querySelector(".".concat(data.thankU));
  var orderNumberSpan = document.getElementById(data.orderNoSpan);
  var payerEmailSpan = document.getElementById(data.payerEmailSpan);
  var orderDateSpan = document.getElementById(data.orderDate);
  form.remove();
  rightBar.classList.add("ready"); //giving shade layer to the cart block

  thankU.classList.add("active"); //showing 'thanks'

  orderNumberSpan.textContent = order.orderNo;
  orderDateSpan.textContent = order.orderDate.toDateString();
  payerEmailSpan.textContent = order.payer['billing-email'];
}; ///dev


function log(item) {
  console.log(item);
}

},{}],4:[function(require,module,exports){
'use strict'; ///imports

var buildThanks = require("./buildThanks");
/**@description: Checking the empty inputs for the each stage of the form:
 * 'Shipping', 'Billing', 'Payment');
 * At the next stages it checks the inputs of the current and previous stages (for safe);
 * The 'optional' inputs (with the stage "-1") will be omitted
 * The first empty input will have the alarm message above it.
 * All empty but required inputs will be marked.
 * **/


module.exports = function (data) {
  var stage = data.stage,
      active = data.active;
  var emptyInputArr = []; //refreshing previous results of the empty inputs` array
  //there are three stages (0, 1, 2)

  var stageArr = data.stageWrapper.querySelectorAll("span[data-type=\"stage\"]");
  var formBlockArr = data.form.querySelectorAll(".".concat(data.formBlock));
  data.init.removeAlerts(data); //removing previous possible alert message

  data.init.unmarkInputs(data); //unmarking all previous marking inputs

  for (var elem in data.inputNamesObj) {
    if (data.inputNamesObj[elem].stage <= stage && data.inputNamesObj[elem].stage !== -1) {
      //except inputs 'optional'...not required
      var inputEl = data.form.elements[elem];

      if (inputEl) {
        //if input exists in DOM
        if (!inputEl.value) {
          //if input is empty
          if (inputEl.name === "recipient-country" //if pseudo input in country selection
          || inputEl.name === "billing-country") {
            var pseudoInput = data.form.querySelector("span[data-type=".concat(inputEl.name, "]"));
            var pseudoInputWrapper = pseudoInput.parentElement;
            pseudoInputWrapper.classList.add("marked"); // marking pseudo input Parent

            emptyInputArr.push(pseudoInputWrapper.parentElement); //pushing the Parent of the pseudoInput Wrapper;
          } else {
            inputEl.classList.add("marked");
            emptyInputArr.push(inputEl.parentElement);
          }
        }
      } else throw new Error("no DOM input by name " + elem + "found");
    }
  }
  /**@description if some empty input(s) found, then to insert the alarm span and
   * to focus on the first empty input;
   * to mark all empty inputs;
   * if the stage is final and the inputs are filled, then to finalize the order data
   * and to init 'thankU' block;
   * */


  if (emptyInputArr.length) {
    data.init.insertAlarm(emptyInputArr[0], data);
  } else {
    if (stage < stageArr.length - 1) {
      data.stage = ++stage;
      data.init.updateStage(stage, [stageArr, formBlockArr], active);
      var buttonNext = data.form.querySelector(".".concat(data.buttonContinue));

      if (stage === 2) {
        buttonNext.textContent = 'Pay Securely';
      }
    } else {
      ///conditionally POSTing the order data and receiving the order No
      var orderNo = "12345_ab_bl11";
      data.order.initProperty('orderNo', orderNo);
      data.init.processOrder(data);
      buildThanks(data);
    }
  }
}; ///dev


function log(item) {
  console.log(item);
}

},{"./buildThanks":3}],5:[function(require,module,exports){
'use strict';
/**@description
 * - creates the DOM elements from the given 'cartData';
 * - calculates the values and shows them in the created DOM els;
 * @param {object} cartData; It contains the array of Sku Samples and CSS class-names;
 * */

module.exports = function (cartData) {
  var order = cartData.order;
  var cartContainer = document.getElementById(cartData.cartList);
  var cartInfoTotal = document.querySelector(".".concat(cartData.cartInfoTotal));
  order.skuArr.forEach(function (sku) {
    var imgSrc = sku.initProperty("photoUrl"),
        itemName = sku.initProperty("itemName"),
        itemSum = sku.getSum(),
        itemDetail = sku.initProperty("itemDetail"),
        itemQnty = sku.initProperty("itemQnty");
    var item = document.createElement("div");
    item.classList.add(cartData.cartItem);
    var imgWrapper = document.createElement("div");
    imgWrapper.setAttribute("class", cartData.imageContainer);
    item.appendChild(imgWrapper);
    var img = document.createElement("img");
    img.setAttribute("src", imgSrc);
    img.setAttribute("alt", "item image");
    imgWrapper.appendChild(img);
    var itemInfo = document.createElement("div");
    itemInfo.classList.add(cartData.cartItemInfo);
    item.appendChild(itemInfo);
    var itemInfoMain = document.createElement("div");
    itemInfoMain.setAttribute("class", "flex-box between");
    itemInfo.appendChild(itemInfoMain);
    var spanName = document.createElement("span");
    spanName.setAttribute("data-cart", "itemName");
    spanName.textContent = itemName;
    itemInfoMain.appendChild(spanName);
    var spanSum = document.createElement("span");
    spanSum.setAttribute("data-cart", "itemSum");
    spanSum.textContent = "$" + itemSum;
    itemInfoMain.appendChild(spanSum);
    var itemInfoSpec = document.createElement("div");
    itemInfoSpec.classList.add(cartData.cartItemSpec);
    itemInfo.appendChild(itemInfoSpec);
    var spanDetail = document.createElement("span");
    spanDetail.setAttribute("data-cart", "itemDetail");
    spanDetail.textContent = itemDetail;
    itemInfoSpec.appendChild(spanDetail);
    var span = document.createElement("span");
    span.textContent = "Quantity:";
    itemInfoSpec.appendChild(span);
    var spanQnty = document.createElement("span");
    spanQnty.setAttribute("data-cart", "itemQnty");
    spanQnty.textContent = itemQnty;
    span.appendChild(spanQnty);
    cartContainer.appendChild(item);
    cartContainer.appendChild(document.createElement("hr"));
  });

  if (cartInfoTotal) {
    var spanArr = cartInfoTotal.querySelectorAll("span");
    spanArr.forEach(function (item) {
      var data = item.dataset.cart;

      if (data) {
        /**@description emitting 'switch case' method by the object of funcs;
         * */
        var _cartData = {
          "subTotal": function subTotal() {
            item.textContent = "$" + order.getSubtotalSum().toFixed(2);
          },

          /**@description getting cost for shipping. If 0 than to show "free";
           * */
          "shippingCost": function shippingCost() {
            var result = order.getShipping();
            item.textContent = result ? "$" + result.toFixed(2) : 'free';
          },
          "taxCost": function taxCost() {
            item.textContent = "$" + order.getTax().toFixed(2);
          },
          "totalPrice": function totalPrice() {
            item.textContent = "$" + order.getTotalSum().toFixed(2);
          }
        };

        if (data in _cartData) {
          _cartData[data]();
        }
      }
    });
  } else {
    throw new Error("class ".concat(cartData.cartInfoTotal, " not found in DOM"));
  }
};

},{}],6:[function(require,module,exports){
'use strict';
/**@description the list of style names, used in DOM:
 * formName - the id-name of the form to work with;
 * storageChosen - the name of the localStorage of the chosen items;
 * storageArea - the name of the localStorage of the Area list, (conditionally) fetched;
 *               it will be used for the country search and selection in the form;
 * leftBarName - the name of the left bar with the form fields;
 * rightBarName - the name of the right bar with the cart data fields;
 * cartQntyName - the id-name of the DOM El, showing the number of the chosen items;
 * cartList - the id-name of the DOM Container, comprising the blocks of the goods;
 * cartInfoTotal - the class of the DOM Wrapper, showing the total
 *                 calculation values of the purchase;
 * cartInfoTotalRow - the class of the row in 'cartInfoTotal' wrapper;
 * cartItem - the DOM Container of the chosen goods-item;
 * imageContainer - the class of the DOM Wrapper, containing img;
 * cartItemInfo - the class of the DOM Wrapper, containing the Cart Item Info;
 * cartItemSpec - the class of the DOM El, containing the details of the Cart Item Info;
 * formBlock - the class of three form blocks for each Registration Stage;
 * stageWrapperName - the class of the DOM Container comprising 'stages' in <span>;
 * selectionBlock - the class of the block, which contains the selection from the list;
 * optionWrapper - the class, wraps the list of countries to choose from;
 * alertMessage - the class of the span of the alarm message;
 * marked - the class for the marked inputs
 * tax - {number} percent share will be taken from the sum of the Order;
 * shippingCost - {number} the cost for the shipment as the percent share from the sum;
 * innData - {object} initial data; in project will be replaced with the real data of the
 * chosen goods and the real fetching of the countries list;
 * */

module.exports = {
  formName: 'order-form',
  storageChosen: 'chosen',
  storageArea: 'area',
  leftBarName: 'person-info',
  rightBarName: 'cart-info',
  cartQntyName: 'cart__qnty',
  cartList: 'cart-list',
  cartInfoTotal: 'cart-info__total',
  cartInfoTotalRow: 'cart-info__total__row',
  cartItem: 'cart-item',
  imageContainer: 'image-container goods',
  cartItemInfo: 'cart-item__info',
  cartItemSpec: 'cart-item__spec',
  formBlock: 'form__block',
  stageWrapperName: 'form__stage-wrapper',
  selectionBlock: 'selection__block',
  optionWrapper: 'option-wrapper',
  alertMessage: 'alert-message',
  marked: 'marked',
  active: 'active',
  bold: 'bold',
  thankU: 'thankU-wrapper',
  orderNoSpan: 'order-number',
  payerEmailSpan: 'payer-email',
  orderDate: 'order-date',
  buttonContinue: 'button_continue'
};

},{}],7:[function(require,module,exports){
'use strict';
/**@description
 * - it hangs listeners to 'keydown', 'focus', 'blur', 'input', 'change' events;
 *
 * */

module.exports = function (data) {
  var checkForNext = require('./checkForNext');

  var form = data.form,
      active = data.active,
      bold = data.bold;
  /**@description
   * if during input the 'enter' or 'escape' keys pressed, then the input is blur
   * */

  form.addEventListener("keydown", function (ev) {
    var target = ev.target;

    if (ev.keyCode === 13 || ev.keyCode === 27) {
      target.blur();
    }
  }, true);
  /**@description
   * if target is focused, then to highlight the border of the Parent Element;
   * */

  form.addEventListener("focus", function (_ref) {
    var target = _ref.target;

    if (target.name !== "recipient-country" && target.name !== "billing-country") {
      toggleParent(target, active);
    }
  }, true);
  /**@description
   * if target is blur, then to hide the border of the Parent Element;
   * */

  form.addEventListener("blur", function (_ref2) {
    var target = _ref2.target;

    if (target.name !== "recipient-country" && target.name !== "billing-country") {
      toggleParent(target, active);
    }
  }, true); ///CLICK EVENT

  /**@description "click" events are hanged on the total form, identifying the target
   * by the dataset value of the attributes;
   * */

  form.addEventListener("click", function (_ref3) {
    var target = _ref3.target;

    if (target.closest("div").dataset.type === "continue") {
      /**@description if the button "continue" is clicked then to check all
       * inputs of the current and previous stages to be filled;
       * */
      checkForNext(data);
    }
    /**@description if pseudo-input 'country' is clicked then the selection list
     * opens in the absolute for the selection from the list of the values;
     * On filling the input the matched list of the countries is shown to select;
     * When the selection is made, then to transfer the value to the hidden input;
     * */


    if (target.closest(".".concat(data.selectionBlock))) {
      var selectBlock = target.closest(".".concat(data.selectionBlock)); //pseudo-input wrapper

      var hiddenInput = selectBlock.parentElement.querySelector("input"); //getting inner input

      var optionBlock = hiddenInput.parentElement; //intermediate wrapper of the input

      hiddenInput.value = ""; //resetting value of the search-input

      setSelectList(optionBlock, data.areaArr); //creating list of option items (span)

      optionBlock.classList.add(active); //to switch display: block from none

      selectBlock.classList.add(active); //to display the search-icon in absolute

      hiddenInput.focus();
    }

    if (target.dataset.type === "option") {
      var _optionBlock = target.parentElement.parentElement;

      var _hiddenInput = _optionBlock.querySelector("input"); // "recipient-country" or "billing-country"


      var _selectBlock = _optionBlock.parentElement;

      var pseudoInput = _selectBlock.querySelector("span[data-type=".concat(_hiddenInput.name));

      _hiddenInput.value = ""; //resetting for getting round blur event checking

      _hiddenInput.value = target.textContent;

      if (_hiddenInput.value !== "") {
        pseudoInput.textContent = _hiddenInput.value;
        pseudoInput.classList.add(bold);
        /**@description
         * - to switch block to display: none;
         * - to switch the search-icon off
         * */

        setTimeout(function () {
          _optionBlock.classList.remove(active);

          _selectBlock.querySelector(".".concat(data.selectionBlock)).classList.remove(active);
        }, 200);
      }
    }
  }); ///INPUT EVENT
  ///CHANGE EVENT
  //////FUNCTIONS

  /**@description toggles the Parent element`s border;
   * @param {object} target; DOM element, which has the Parent`s border to toggle;
   * @param {string} classActive; the class-name to highlight the DOM element;
   * */

  function toggleParent(target, classActive) {
    target.parentElement.classList.toggle(classActive);
  }
  /**@description: dynamically creates the option list of the countries, which will
   * be filtered on matching the search input value;
   * It listens to the input and sorts countries` list with the matching chars.
   * @param: {object} objTarget - the DOM Container for the option list
   * @param: {array} areaArr - the list of the countries for selection
   * */


  function setSelectList(objTarget, areaArr) {
    var optionWrapper = objTarget.querySelector(".".concat(data.optionWrapper));

    if (optionWrapper) {
      optionWrapper.parentElement.removeChild(optionWrapper); //remaking optionWrapper
    }

    optionWrapper = document.createElement("div");
    optionWrapper.classList.add(data.optionWrapper);

    for (var i = 0; i < areaArr.length; i++) {
      var option = document.createElement("span");
      option.setAttribute("data-type", "option");
      option.textContent = areaArr[i];
      optionWrapper.appendChild(option);
    }

    objTarget.insertBefore(optionWrapper, objTarget.firstChild);
  }
}; ///dev


function log(item) {
  console.log(item);
}

},{"./checkForNext":4}],8:[function(require,module,exports){
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
};
/**@description
 * - to remove the className 'active' from the array of nodes;
 * - to highlight the corresponding 'span' in the array, adding class 'active';
 * - to show the corresponding form block with the inputs, adding class 'active';
 * By adding the class, the node becomes visible/highlighted;
 * @param {number} stage; The stage of the form; Initially it is 0;
 * @param {array} blocksArr; The array of the nodeLists to work with;
 * @param {string} className; the classname to highlight the DOM el;
 * */


exports.updateStage = function () {
  var stage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var blocksArr = arguments.length > 1 ? arguments[1] : undefined;
  var className = arguments.length > 2 ? arguments[2] : undefined;

  if (blocksArr.length) {
    blocksArr.forEach(function (nodeList) {
      if (nodeList.length) {
        removeClassIn(nodeList, className);
        nodeList[stage].classList.add(className);
      } else {
        throw new Error("the nodeList is empty");
      }
    });
  } else {
    throw new Error("the array of nodeLists given in arguments is empty");
  }
};
/**@description removes alert spans opened in DOM
 * @param {object} data: the initial data with funcs and variables;
 * */


exports.removeAlerts = function (_ref) {
  var form = _ref.form,
      alertMessage = _ref.alertMessage;
  var alertArr = form.querySelectorAll(".".concat(alertMessage));

  if (alertArr.length) {
    alertArr.forEach(function (alert) {
      alert.parentElement.removeChild(alert);
    });
  }
};
/**@description unmarks the inputs in DOM;
 * @param {object} data: the initial data with funcs and variables;
 * */


exports.unmarkInputs = function (data) {
  var marked = data.form.querySelectorAll(".".concat(data.marked));

  if (marked.length) {
    marked.forEach(function (item) {
      item.classList.remove(data.marked);
    });
  }
};
/**@description creates alarm messages for DOM elements;
 * @param {object} targetObj: the DOM element will be inserted with the alarm span;
 * @param {object} data: the initial data with funcs and variables;
 * @param {string} type; 'empty', 'error' or custom as the text of the message;
 * */


exports.insertAlarm = function (targetObj, data) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "empty";
  var message = "please enter ";
  var inputName;
  var inputEl; //the inner input

  var object; //the DOM element to insert the alarm message;

  /**@description to get the input-name for inserting the alarm on the empty input;
   **/

  if (targetObj.classList.contains(data.selectionBlock)) {
    //if it is a pseudo input wrapper
    object = targetObj.parentElement;
    inputEl = object.querySelector("input");
    inputName = inputEl.name;
  } else if (targetObj.querySelector("input")) {
    inputEl = targetObj.querySelector("input");
    inputName = inputEl.name;
    data.form.elements[inputName].style.caretColor = "red";
  } else throw new Error("no input found");

  inputEl.focus();

  if (type === "empty") {
    //putting the input`s name to the message content
    message += inputName.replace(/-/g, " ");
    insertSpan(targetObj, data.alertMessage, message);
  } else if (type === "error") {
    message = "format: ";
    message += data.inputNamesObj[inputName]["error"]; //creating 'error' message from the name of the input

    insertSpan(targetObj, data.alertMessage, message);
  } else insertSpan(targetObj, data.alertMessage, type); //creating custom message

};
/**@description: separates the properties of the inputs to Recipient and Payer Data;
 * it updates the data.order with the values of Recipient and Payer Data;
 * @param {object} data: the initial data with funcs and variables;
 * ***/


exports.processOrder = function (data) {
  getAllInputs(data);
  var inputValues = data.inputValues,
      order = data.order;
  var emptyInputs = isEmptyProp(inputValues);
  var regExp = /billing/;
  /**@description processOrder runs only after all inputs are checked to be filled;
   * for development - additional check;
   * */

  if (emptyInputs.length) {
    throw new Error("found empty inputs: ".concat(emptyInputs.join(', ')));
  }
  /**@description it finalizes the data.order with all purchase details,
   * divided on the payer and recipient sections in data.order (object);
   * @param {object} inputValues; it comprises in props the values of the inputs
   * @param {object} regExp (need for the filter by regExp)
   * @param {object} data.order (all the data on the purchase, collected will be
   * kept in the object.
   * */


  separateObj(inputValues, regExp, order);
}; ///INNER FUNCTIONS

/**@description it cleans the classname in the nodeList of DOM elements;
 * @param {array} nodeList of the elements for removing the classname
 * @param {string} className to be removed;
 **/


function removeClassIn(nodeList, className) {
  nodeList.forEach(function (el) {
    el.classList.remove(className);
  });
}
/**@description
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
}
/**@description creates the Date from the input chars (yy, mm);
 * @param {string} yy - year
 * @param {string} mm - month
 * @return {object} new Date
 * **/


function stringToDate(yy, mm) {
  var month = +mm - 1; //month minus 1 (jan: 0)

  var year = +yy + 2000;
  return new Date(year, month);
}
/**@description: insert a span inside the targetObj
 * @param {object} parent; the target Object to insert alert in;
 * @param {string} alertClass; the class-name of the alert span
 * @param {string} message; the alert message;
 * **/


function insertSpan(parent, alertClass, message) {
  var span = document.createElement("span");
  span.textContent = message;
  parent.insertBefore(span, parent.firstChild);
  span.setAttribute("class", alertClass);
}
/**@description checks for the empty properties of an object except the optional
 * properties;
 * @param {object} obj for searching empty inputs;
 * @return {array} the array of empty inputs;
 **/


function isEmptyProp(obj) {
  var emptyInputs = [];

  for (var prop in obj) {
    if (!obj[prop] && !prop.match(/optional/)) {
      //if property is empty except 'optional' and 'billing-optional'
      emptyInputs.push(prop);
    }
  }

  return emptyInputs;
}
/**@description: collects all the values from the form inputs.
 * @param {object} data: the initial data with funcs and variables;
 **/


function getAllInputs(data) {
  var inputNamesObj = data.inputNamesObj,
      inputValues = data.inputValues;

  for (var elem in inputNamesObj) {
    if (elem === "card-date") {
      var inputValue = data.form.elements[elem].value;
      var inputYear = inputValue.slice(-2);
      var inputMonth = inputValue.slice(0, 2);
      inputValues[elem] = stringToDate(inputYear, inputMonth);
    } else {
      inputValues[elem] = data.form.elements[elem].value;
    }
  }
}
/**@description to devide the obj properties on two objects by filtering properties
 * with the given regExp;
 * @param {object} obj; The given object;
 * @param {object} regExp; To filter properties with regExp
 * @param {object} order;
 * */


function separateObj(obj, regExp, order) {
  var payer = {};
  var recipient = {};

  for (var elem in obj) {
    if (elem.match(regExp)) {
      payer[elem] = obj[elem];
    } else {
      recipient[elem] = obj[elem];
    }
  }

  order.initProperty('payer', payer);
  order.initProperty('recipient', recipient);
} ///dev


function log(item) {
  console.log(item);
}

},{"../classes":1}],9:[function(require,module,exports){
'use strict';
/**@description comprises the main operations for initiating the App:
 * - it runs 'createSku()' to create the Sku samples from the array of the chosen goods;
 * - it runs 'makeOrder()' to create the Order Sample, which comprises all the
 * calculations and will be finally ready for fetching to the server;
 * - it runs 'createCartDom()' to create DOM elements and to show the chosen
 * goods` details and calculation results; *
 * - it runs 'runStage()' to highlight the DOM el in the Array and
 * to show the corresponding form block to be filled by adding class name;
 * - it runs 'listen()' to hang the listeners to the form;
 * @param {object} data: the initial data;
 * **/

module.exports = function (data) {
  //creates the DOM elements from the given 'cartData';
  var createCartDom = require('./createCartDom');

  var formListen = require('./formListen'); //the stage of the form filling;


  var stage = data.stage; //there are three stages (0, 1, 2)

  var stageArr = data.stageWrapper.querySelectorAll("span[data-type=\"stage\"]"); //three stage form blocks with the inputs

  var formBlockArr = data.form.querySelectorAll(".".concat(data.formBlock));
  var skuArr = data.init.createSku(data.chosenArr);
  var tax = data.tax,
      shippingCost = data.shippingCost;

  if (skuArr.length) {
    data.order = data.init.makeOrder(skuArr, tax, shippingCost);
  }

  var cartData = {
    order: data.order,
    cartList: data.cartList,
    cartInfoTotal: data.cartInfoTotal,
    cartItem: data.cartItem,
    imageContainer: data.imageContainer,
    cartItemInfo: data.cartItemInfo,
    cartItemSpec: data.cartItemSpec
  }; //creating Cart elements in DOM

  createCartDom(cartData);
  data.init.updateStage(stage, [stageArr, formBlockArr], data.active);
  formListen(data);
}; ///dev


function log(item) {
  console.log(item);
}

},{"./createCartDom":5,"./formListen":7}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
'use strict';
/**@description each property name equals the inputs` name of the form;
 * The input will be operated with the corresponding properties:
 * - error: in case of not valid input value the input will show the correct example
 * of the input;
 * - type: the type of the input will initiate the corresponding method to validate the
 * input value;
 * - stage: when submitting the form to switch to the next form stage, the inputs of
 * the corresponding stage will be checked to be filled;
 * */

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

},{}],12:[function(require,module,exports){
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
