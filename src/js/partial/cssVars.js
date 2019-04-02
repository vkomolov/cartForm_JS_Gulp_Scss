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
    stageWrapperName: 'form__stage-wrapper'
};