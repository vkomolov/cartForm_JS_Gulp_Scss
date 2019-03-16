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

const storageChosen = 'chosen';
const storageArea = 'area';
const leftBarName = 'person-info';
const rightBarName = 'cart-info';
const innData = require('./partial/initialData');

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
const data = {
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
window.addEventListener("DOMContentLoaded", () => {
    if (data.init.checkInStorage(storageChosen, data.chosenArr)
        && data.init.checkInStorage(storageArea, data.areaArr)
        && document.forms[data.formName]) {

        data.localStore = JSON.parse(localStorage.getItem(storageChosen));

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
    /**@description comprises the main operations with inputs and DOM navigation
     * @param {object} data; the initial data;
     * **/
    function initForm(data) {
        const form = document.getElementById(data.formName),
            headerCart = document.getElementById(data.cartQnty),
            stageWrapper = document.getElementById(data.stageWrapperName),
            stageArr = stageWrapper.querySelectorAll("span"), //there are three stages (0, 1, 2)
            formBlockArr = form.querySelectorAll(`.${data.formBlock}`); //three stage blocks of the form

        console.log(headerCart);

        function initCart() {

        }
    }
});

///dev
function log(item) {
    console.log(item);
}