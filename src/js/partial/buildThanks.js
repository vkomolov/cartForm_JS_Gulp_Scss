'use strict';

/**@description When the order data is posted, then
 * on response OK to show final thanks in DOM.
 * @param {object} data: the initial data with funcs and variables;
 * */
module.exports = ( data ) => {
    const { form, order } = data;
    const leftBar = document.querySelector(`.${data.leftBarName}`);
    const rightBar = document.querySelector(`.${data.rightBarName}`);
    const thankU = document.querySelector(`.${data.thankU}`);
    const orderNumberSpan = document.getElementById(data.orderNoSpan);
    const payerEmailSpan = document.getElementById(data.payerEmailSpan);
    const orderDateSpan = document.getElementById(data.orderDate);

    form.remove();
    rightBar.classList.add("ready"); //giving shade layer to the cart block
    thankU.classList.add("active"); //showing 'thanks'

    orderNumberSpan.textContent = order.orderNo;
    orderDateSpan.textContent = order.orderDate.toDateString();
    payerEmailSpan.textContent = order.payer['billing-email'];
};

///dev
function log(item) {
    console.log(item);
}