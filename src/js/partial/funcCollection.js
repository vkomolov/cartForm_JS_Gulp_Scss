'use strict';

//imports
const { Sku, Order } = require('../classes');

/**@description:
 * It checks for the localStorage to exist, then:
 * - if false, it creates the object with the Creation Date and the given Data,
 * then stores it in the localStorage;
 * - if true, it checks for the Creation Date of the stored Object. If the time
 * difference is more, than 1 day (instance), then it creates new localStorage;
 * @param {string} name; The name of the localStorage;
 * @param {array} arr; {array} of objects;
 * **/
exports.checkInStorage = (name, arr) => {
    let storage = localStorage.getItem(name);
    let innData;

    if ( storage ) {
        innData = JSON.parse(storage);
        const creationDate = new Date(innData.creationDate);
        const currentDate = new Date();

        if (((currentDate - creationDate)/1000/60/60/24) < 1) {
            return true;
        }
    }

    setLocalStorage(name, arr);
    return !!(localStorage.getItem(name));
};

/**@description equalizes the heights of the DOM elements.
 * @param {array} colsArr; the array of the DOM elements to equalize;
 * */
exports.equalHeights = ( colsArr ) => {
    let highestCal = 0;
    for (let i = 0; i < colsArr.length; i++) {
        if (colsArr[i].offsetHeight >= highestCal) {
            highestCal = colsArr[i].offsetHeight;
        }
    }
    colsArr.forEach(col => col.style.height = highestCal + "px");
};

/**@description creates the array of Sku Samples from the array of the chosen goods;
 * @param {array} chosenArr; The array of the chosen goods;
 * @return {array} of Sku Samples;
 * */
exports.createSku = ( chosenArr ) => {
    return chosenArr.map(sku => new Sku(sku));
};

/**@description creates a new Order Sample with the data on the chosen goods;
 * @param {array} skuArr; The array of Sku Samples with the data on the chosen goods;
 * @param {number} tax;
 * @param {number} shippingCost;
 * @return {object} new Order Sample;
 * */
exports.makeOrder = (skuArr, tax, shippingCost) => {
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
exports.updateStage = ( stage=0, blocksArr, className ) => {
    if (blocksArr.length) {
        blocksArr.forEach(nodeList => {
            if (nodeList.length) {
                removeClassIn( nodeList, className );
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
exports.removeAlerts = ({ form, alertMessage }) => {
    let alertArr = form.querySelectorAll(`.${alertMessage}`);
    if (alertArr.length) {
        alertArr.forEach(alert => {
            alert.parentElement.removeChild(alert);
        });
    }
};

/**@description unmarks the inputs in DOM;
 * @param {object} data: the initial data with funcs and variables;
 * */
exports.unmarkInputs = ( data ) => {
    let marked = data.form.querySelectorAll(`.${data.marked}`);
    if (marked.length) {
        marked.forEach(item => {
            item.classList.remove(data.marked);
        });
    }
};

/**@description creates alarm messages for DOM elements;
 * @param {object} targetObj: the DOM element will be inserted with the alarm span;
 * @param {object} data: the initial data with funcs and variables;
 * @param {string} type; 'empty', 'error' or custom as the text of the message;
 * */
exports.insertAlarm = ( targetObj, data, type="empty" ) => {
    let message = "please enter ";
    let inputName;
    let inputEl;  //the inner input
    let object; //the DOM element to insert the alarm message;

    /**@description to get the input-name for inserting the alarm on the empty input;
     **/
    if (targetObj.classList.contains(data.selectionBlock)) {  //if it is a pseudo input wrapper
        object = targetObj.parentElement;
        inputEl = object.querySelector("input");
        inputName = inputEl.name;
    }
    else if (targetObj.querySelector("input")){
        object = targetObj;
        inputEl = targetObj.querySelector("input");
        inputName = inputEl.name;
        data.form.elements[inputName].style.caretColor = "red";
    }
    else throw new Error("no input found");

    inputEl.focus();

    if (type === "empty") {
        //putting the input`s name to the message content
        message += inputName.replace(/-/g, " ");
        insertSpan(targetObj, data.alertMessage, message);
    }
    else if (type === "error") {
        message = "format: ";
        message += data.inputNamesObj[inputName]["error"]; //creating 'error' message from the name of the input
        insertSpan(targetObj, data.alertMessage, message);
    }
    else insertSpan(targetObj, data.alertMessage, type); //creating custom message
};

/**@description: collects all the values from the form inputs.
 * @param {object} data: the initial data with funcs and variables;
 **/
exports.getAllInputs = ( data ) => {
    const { inputNamesObj, inputValues } = data;

    for (let elem in inputNamesObj) {
        if (elem === "card-date") {
            let inputValue = data.form.elements[elem].value;
            let inputYear = inputValue.slice(-2);
            let inputMonth = inputValue.slice(0, 2);
            inputValues[elem] = stringToDate(inputYear, inputMonth);
        }
        else {
            inputValues[elem] = data.form.elements[elem].value;
        }
    }
};

/**@description: separates the properties of the inputs to Recipient and Payer Data;
 * it updates the data.order with the values of Recipient and Payer Data;
 * @param {object} data: the initial data with funcs and variables;
 * ***/
exports.processOrder = ( data ) => {
    const {inputValues} = data;
    const emptyInputs = isEmptyProp( inputValues );
    let regExp = /billing/;

    /**@description processOrder runs only after all inputs are checked to be filled;
     * for development - additional check;
     * */
    if (emptyInputs.length) {
        throw new Error(`found empty inputs: ${emptyInputs.join(', ')}`);
    }

    /**@description it finalizes the data.order with all purchase details,
     * divided on the payer and recipient sections in data.order (object);
     * @param {object} inputValues; it comprises in props the values of the inputs
     * @param {object} regExp (need for the filter by regExp)
     * @param {object} data.order (all the data on the purchase, collected will be
     * kept in the object.
     * */
    separateObj(inputValues, regExp, data.order);
};

///INNER FUNCTIONS

/**@description it cleans the classname in the nodeList of DOM elements;
 * @param {array} nodeList of the elements for removing the classname
 * @param {string} className to be removed;
 **/
function removeClassIn( nodeList, className ) {
    nodeList.forEach(el => {
        el.classList.remove(className);
    });
}

/**@description
 * It create the localStorage with the data and the creation Date;
 * @param {string} name; The name of the localStorage;
 * @param {array} data; Contains: {string} creationDate, {array} of objects;
 * **/
function setLocalStorage(name, data)  {

    let dataWithDate = {};
    if (data.length) {
        dataWithDate = {
            data,
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
function stringToDate( yy, mm ) {
    let month = +mm - 1; //month minus 1 (jan: 0)
    let year = +yy + 2000;
    return new Date(year, month);
}

/**@description: insert a span inside the targetObj
 * @param {object} parent; the target Object to insert alert in;
 * @param {string} alertClass; the class-name of the alert span
 * @param {string} message; the alert message;
 * **/
function insertSpan(parent, alertClass, message) {
    let span = document.createElement("span");
    span.textContent = message;

    parent.insertBefore(span, parent.firstChild);
    span.setAttribute("class", alertClass);
}

/**@description checks for the empty properties of an object except the optional
 * properties;
 * @param {object} obj for searching empty inputs;
 * @return {array} the array of empty inputs;
 **/
function isEmptyProp ( obj ) {
    let emptyInputs = [];
    for (let prop in obj) {
        if (!obj[prop] && !prop.match(/optional/) ) { //if property is empty except 'optional' and 'billing-optional'
            emptyInputs.push( prop );
        }
    }
    return emptyInputs;
}

/**@description to devide the obj properties on two objects by filtering properties
 * with the given regExp;
 * @param {object} obj; The given object;
 * @param {object} regExp; To filter properties with regExp
 * @param {object} order;
 * */
function separateObj(obj, regExp, order) {
    const payerData = {};
    const recipientData = {};

    for (let elem in obj) {
        if (elem.match(regExp)) {
            payerData[elem] = obj[elem];
        } else {
            recipientData[elem] = obj[elem];
        }
    }
    order.initProperty("payer", payerData);
    order.initProperty('recipient', recipientData);
}

///dev
function log(item) {
    console.log(item);
}