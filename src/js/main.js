'use strict';

/**@description the list of variables, which are collected for editing:
 * formName - the id-name of the form to work with;
 * storageChosen - the name of the localStorage of the chosen items;
 * storageArea - the name of the localStorage of the Area list, conditionally fetched;
 *               it will be used for the country search and selection in the form;
 * leftBarName - the name of the left bar with the form fields;
 * rightBarName - the name of the right bar with the cart data fields;
 * cartQntyName - the id-name of the DOM El, showing the number of the chosen items;
 * cartList - the id-name of the DOM Container, comprising the blocks of the goods;
 * cartInfoTotal - the class-name of the DOM Wrapper, showing the total
 *                 calculation values of the purchase;
 * cartInfoTotalRow - the class-name of the row in 'cartInfoTotal' wrapper;
 * cartItem - the DOM Container of the chosen goods-item;
 * imageContainer - the class-name of the DOM Wrapper, containing img;
 * cartItemInfo - the class-name of the DOM Wrapper, containing the Cart Item Info;
 * cartItemSpec - the class-name of the DOM El, containing the details of the Cart Item Info;
 * form__block - the class-name of three form blocks for each Registration Stage;
 * stageWrapperName - the name of the DOM Container comprising 'stages' in <span>; *
 * tax - {number} percent share will be taken from the sum of the Order;
 * shippingCost - {number} the cost for the shipment as the percent share from the sum;
 * innData - {object} initial data; in project will be replaced with the real data of the
 * chosen goods and the real fetching of the countries list;
 * */
const formName = 'order-form';
const storageChosen = 'chosen';
const storageArea = 'area';
const leftBarName = 'person-info';
const rightBarName = 'cart-info';
const cartQntyName = 'cart__qnty';
const cartList = 'cart-list';
const cartInfoTotal = 'cart-info__total';
const cartInfoTotalRow = 'cart-info__total__row';
const cartItem = 'cart-item';
const imageContainer = 'image-container goods';
const cartItemInfo = 'cart-item__info';
const cartItemSpec = 'cart-item__spec';
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
    cartList,
    cartInfoTotal,
    cartInfoTotalRow,
    cartItem,
    imageContainer,
    cartItemInfo,
    cartItemSpec,
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
     * - it runs 'createSku()' to create the Sku samples from the array of the chosen goods;
     * - it runs 'makeOrder()' to create the Order Sample, which comprises all the
     * calculations and will be finally ready for fetching to the server;
     * - it runs 'createCartDom()' to create DOM elements and to show the chosen
     * goods` details and calculation results;
     * - it runs 'checkStage()' to check the stage of the form filling and to highlight
     * the following DOM el in 'stageWrapper';
     * @param {object} data: the initial data;
     * **/
    function initForm( data ) {
        const stageArr = data.stageWrapper.querySelectorAll("span"); //there are three stages (0, 1, 2)
        const formBlockArr = data.form.querySelectorAll(`.${data.formBlock}`); //three stage blocks of the form

        const skuArr = data.init.createSku(data.chosenArr);
        const { tax, shippingCost } = data;

        let order;
        if (skuArr.length) {
            order = data.init.makeOrder(skuArr, tax, shippingCost);
            log(order);
        }

        const cartData = {
            order,
            cartList: data.cartList,
            cartInfoTotal: data.cartInfoTotal,
            cartItem: data.cartItem,
            imageContainer: data.imageContainer,
            cartItemInfo: data.cartItemInfo,
            cartItemSpec: data.cartItemSpec
        };
        data.init.createCartDom( cartData );

        data.init.listen(data.form);
    }
});

///dev
function log(item) {
    console.log(item);
}