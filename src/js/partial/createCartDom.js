'use strict';

/**@description
 * - creates the DOM elements from the given 'cartData';
 * - calculates the values and shows them in the created DOM els;
 * @param {object} cartData; It contains the array of Sku Samples and CSS class-names;
 * */
module.exports = ( cartData ) => {
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
                /**@description emitting 'switch case' method by the object of funcs;
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