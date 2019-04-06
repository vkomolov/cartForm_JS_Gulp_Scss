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
module.exports = ( data ) => {
    //creates the DOM elements from the given 'cartData';
    const createCartDom = require('./createCartDom');
    const formListen = require('./formListen');
    //the stage of the form filling;
    let { stage } = data;

    //there are three stages (0, 1, 2)
    const stageArr = data.stageWrapper.querySelectorAll("span[data-type=\"stage\"]");

    //three stage form blocks with the inputs
    const formBlockArr = data.form.querySelectorAll(`.${data.formBlock}`);

    const skuArr = data.init.createSku(data.chosenArr);
    const { tax, shippingCost } = data;

    if (skuArr.length) {
        data.order = data.init.makeOrder(skuArr, tax, shippingCost);
    }

    const cartData = {
        order: data.order,
        cartList: data.cartList,
        cartInfoTotal: data.cartInfoTotal,
        cartItem: data.cartItem,
        imageContainer: data.imageContainer,
        cartItemInfo: data.cartItemInfo,
        cartItemSpec: data.cartItemSpec
    };

    //creating Cart elements in DOM
    createCartDom( cartData );

    data.init.updateStage(stage, [stageArr, formBlockArr], data.active);

    formListen( data );
};

///dev
function log(item) {
    console.log(item);
}