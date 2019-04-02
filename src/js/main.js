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
window.addEventListener("DOMContentLoaded", function() {
    const tax = 20;
    const shippingCost = 30;
    const innData = require('./partial/initialData');
    const cssVars = require('./partial/cssVars');
    const initForm = require('./partial/initForm');

    /**@description the initial data, will be passed as the arguments;
     * @property {array} chosenArr; initial data of the chosen items;
     * @property {array} areaArr; conditionally fetched list of countries;
     * @property {object} init; comprises the inner funcs;
     * @property {object} inputNamesObj; comprises the form inputs` data;
     * @property {object} regExpObj; regExp data for validating the form inputs;
     * */
    const data = {
            ...cssVars,
        tax,
        shippingCost,
        stage: 0,
        chosenArr: innData.chosenArr,
        areaArr: innData.areaArr,
        init: require('./partial/funcCollection'),
        inputNamesObj: require('./partial/inputsData'),
        regExpObj: require('./partial/regExpData')
    };

    /**@description checks for the localStorage or creates it;
     * @param {string} data.storageChosen; The name of the localStorage;
     * @param {array} data.chosenArr; The data to store in the localStorage;
     * */
    if (data.init.checkInStorage(data.storageChosen, data.chosenArr)
        && data.init.checkInStorage(data.storageArea, data.areaArr)
        && document.forms[data.formName]) {

        data.form = document.getElementById(data.formName);
        data.headerCartQnty = document.getElementById(data.cartQntyName);
        data.stageWrapper = document.getElementById(data.stageWrapperName);

        data.localStore = JSON.parse(localStorage.getItem(data.storageChosen));

        /**@description to get the quantity of the chosen goods from the localStorage;
         * To show the quantity in the header with the el '#cart__qnty';
         * */
        if ( data.headerCartQnty ) {
            data.headerCartQnty.textContent = data.localStore.data.length;
        } else {
            throw new Error(`no id ${data.cartQntyName} found`);
        }

        /**@description the collection is used for equalizing the heights of given Els:
         * - 'person-info', left column, which contains the form fields;
         * - 'cart-info', right column, which contains the cart data fields;
         * */
        const colsArr = [
            document.querySelector(`.${data.leftBarName}`),
            document.querySelector(`.${data.rightBarName}`)
        ];

        log(colsArr);

        /**@description making heights of the columns in the form to be equal by height;
         * @param {array} colsArr; The array of columns to equalize in height;
         * */
        data.init.equalHeights( colsArr );

        /**@description initiating the form with the prepared data;
         * @param {object} data; initial data;
         * */
        initForm( data );

    } else {
        throw new Error("form #'order-form' not found or localStorage init error");
    }
});

///dev
function log(item) {
    console.log(item);
}