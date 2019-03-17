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
const formName = 'order-form';
const storageChosen = 'chosen';
const storageArea = 'area';
const leftBarName = 'person-info';
const rightBarName = 'cart-info';
const cartQntyName = 'cart__qnty';
const formBlock = 'form__block';
const stageWrapperName = 'form__stage-wrapper';
const tax = 20;
const shippingCost = 30;

const innData = require('./partial/initialData');

/**@description the initial data;
 * @property {array} chosenArr; initial data of the chosen items;
 * @property {array} areaArr; conditionally fetched list of countries;
 * @property {object} init; comprises the inner funcs;
 * @property {object} inputNamesObj; comprises the form inputs` data;
 * @property {object} regExpObj; regExp data for validating the form inputs;
 * */
const data = {
    formBlock,
    tax,
    shippingCost,
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
window.addEventListener("DOMContentLoaded", () => {
    if (data.init.checkInStorage(storageChosen, data.chosenArr)
        && data.init.checkInStorage(storageArea, data.areaArr)
        && document.forms[formName]) {

        data.form = document.getElementById(formName);
        data.headerCartQnty = document.getElementById(cartQntyName);
        data.stageWrapper = document.getElementById(stageWrapperName);
        data.localStore = JSON.parse(localStorage.getItem(storageChosen));

        /**@description to get the quantity of the chosen goods from the localStorage;
         * To show the quantity in the header at the el with '#cart__qnty';
         * */
        if ( data.headerCartQnty ) {
            data.headerCartQnty.textContent = data.localStore.data.length;
        } else {
            throw new Error(`no id ${cartQntyName} found`);
        }

        /**@description the collection of:
         * - 'person-info', left column, which contains the form fields;
         * - 'cart-info', right column, which contains the cart data fields;
         * */
        const colsArr = [
            document.querySelector(`.${leftBarName}`),
            document.querySelector(`.${rightBarName}`)
        ];

        /**@description making heights of the columns in the form equal by height;
         * */
        data.init.equalHeights(colsArr);

        /**@description initiating the form;
         * */
        initForm( data );

    } else {
        throw new Error("form #'order-form' not found or localStorage init error");
    }

    ///FUNCTIONS
    /**@description comprises the main operations for initiating the App:
     * - it creates the Sku samples from the array of the chosen goods;
     * - it creates the Order Sample, which comprises all the purchase data and will
     * be finally ready for fetching to the server;
     * @param {object} data: the initial data;
     * **/
    function initForm( data ) {
        const stageArr = data.stageWrapper.querySelectorAll("span"); //there are three stages (0, 1, 2)
        const formBlockArr = data.form.querySelectorAll(`.${data.formBlock}`); //three stage blocks of the form
        const { tax, shippingCost } = data;
        const skuArr = data.init.createSku(data.chosenArr);
        let order;
        if (skuArr.length) {
            order = data.init.makeOrder(skuArr, tax, shippingCost);

            log(order);
        }
    }
});

///dev
function log(item) {
    console.log(item);
}