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
 * - creates the DOM elements from the given 'cartData';
 * - calculates the values and shows them in the created DOM els;
 * @param {object} cartData; It contains the array of Sku Samples and styles class-names;
 * */
exports.createCartDom = ( cartData ) => {
    const { order } = cartData;
    let cartContainer = document.getElementById(cartData.cartList);
    let cartInfoTotal = document.querySelector(`.${cartData.cartInfoTotal}`);

    order.skuArr.forEach(sku => {
        let imgSrc = sku.initProperty("photoUrl"),
        itemName = sku.initProperty("itemName"),
        itemSum = sku.getSum(),
        itemDetail = sku.initProperty("itemDetail"),
        itemQnty = sku.initProperty("itemQnty");

        let item = document.createElement("div");
        item.classList.add(cartData.cartItem);

        let imgWrapper = document.createElement("div");
        imgWrapper.setAttribute("class", cartData.imageContainer);
        item.appendChild(imgWrapper);

        let img = document.createElement("img");
        img.setAttribute("src", imgSrc);
        img.setAttribute("alt", "item image");
        imgWrapper.appendChild(img);

        let itemInfo = document.createElement("div");
        itemInfo.classList.add(cartData.cartItemInfo);
        item.appendChild(itemInfo);

        let itemInfoMain = document.createElement("div");
        itemInfoMain.setAttribute("class", "flex-box between");
        itemInfo.appendChild(itemInfoMain);

        let spanName = document.createElement("span");
        spanName.setAttribute("data-cart", "itemName");
        spanName.textContent = itemName;
        itemInfoMain.appendChild(spanName);

        let spanSum = document.createElement("span");
        spanSum.setAttribute("data-cart", "itemSum");
        spanSum.textContent = "$" + itemSum;
        itemInfoMain.appendChild(spanSum);

        let itemInfoSpec = document.createElement("div");
        itemInfoSpec.classList.add(cartData.cartItemSpec);
        itemInfo.appendChild(itemInfoSpec);

        let spanDetail = document.createElement("span");
        spanDetail.setAttribute("data-cart", "itemDetail");
        spanDetail.textContent = itemDetail;
        itemInfoSpec.appendChild(spanDetail);

        let span = document.createElement("span");
        span.textContent = "Quantity:";
        itemInfoSpec.appendChild(span);

        let spanQnty = document.createElement("span");
        spanQnty.setAttribute("data-cart", "itemQnty");
        spanQnty.textContent = itemQnty;
        span.appendChild(spanQnty);

        cartContainer.appendChild(item);
        cartContainer.appendChild(document.createElement("hr"));
    });

    if (cartInfoTotal) {
        let spanArr = cartInfoTotal.querySelectorAll("span");
        spanArr.forEach(item => {
            let data = item.dataset.cart;
            if (data) {
                /**@description emitting 'switch case' with the object of funcs;
                 * */
                let cartData = {
                    "subTotal": () => {
                        item.textContent = "$" + order.getSubtotalSum().toFixed(2);
                    },
                    /**@description getting cost for shipping. If 0 than to show "free";
                     * */
                    "shippingCost": () => {
                        let result = order.getShipping();
                        item.textContent = result
                            ? "$" + result.toFixed(2)
                            : 'free';
                    },
                    "taxCost": () => {
                        item.textContent = "$" + order.getTax().toFixed(2);
                    },
                    "totalPrice": () => {
                        item.textContent = "$" + order.getTotalSum().toFixed(2);
                    }
                };
                if (data in cartData) {
                    cartData[data]();
                }
            }
        });
    } else {
        throw new Error(`class ${cartData.cartInfoTotal} not found in DOM`);
    }
};

/**@description
 * - it hangs listeners to 'keydown', 'focus', 'blur', 'input', 'change' events;
 *
 * */
exports.listen = (form) => {
    /**@description
     * if during input the 'enter' key pressed, then the input is blur
     * */
    form.addEventListener("keydown", ( ev ) => {
        let target = ev.target;
        if (ev.keyCode === 13) {
            target.blur();
        }
    }, true);

    /**@description
     * if target is focused, then to highlight the border of the Parent Element;
     * */
    form.addEventListener("focus", ({ target }) => {
        if (target.name !== "recipient-country" && target.name !== "billing-country") {
            toggleParent(target);
        }
    } ,true); //onfocus can be caught on bubbling up

    /**@description
     * if target is blur, then to highlight the border of the Parent Element;
     * */
    form.addEventListener("blur", ({ target }) => {
        if (target.name !== "recipient-country" && target.name !== "billing-country") {
            toggleParent(target);
        }
    } ,true);

};

///FUNCTIONS

/**@description:
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

/**@description toggles the Parent element`s border;
 * @param {object} target; DOM element, which has the Parent`s border to toggle;
 * */
function toggleParent(target) {
    target.parentElement.classList.toggle("active");
}


/**@description to check for the stage of the form filling and to highlight the
 * corresponding DOM element in the array of els;
 * @param {array} stageArr; The array of DOM elements;
 * @param {object} payer;  the sample of Payer;
 * @param {object} recipient; the sample of Recipient;
 * */
function checkStage(stageArr, payer, recipient) {

}

///dev
function log(item) {
    console.log(item);
}