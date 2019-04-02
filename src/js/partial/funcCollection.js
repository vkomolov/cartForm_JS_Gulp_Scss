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

            log(highestCal);
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
 * */
exports.runStage = ( stage, blocksArr ) => {
    const className = 'active';
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
    } ,true);

    /**@description
     * if target is blur, then to highlight the border of the Parent Element;
     * */
    form.addEventListener("blur", ({ target }) => {
        if (target.name !== "recipient-country" && target.name !== "billing-country") {
            toggleParent(target);
        }
    } ,true);

    /**@description
     * if target is blur, then to highlight the border of the Parent Element;
     * */
    form.addEventListener("click", ({ target }) => {
        if (target.closest("div").dataset.type === "continue") {

        }
    });

};

/**@description it cleans the classname in the nodeList of DOM elements;
 * @param {array} nodeList of the elements for removing the classname
 * @param {string} className to be removed;
 **/
function removeClassIn( nodeList, className ) {
    nodeList.forEach(el => {
        el.classList.remove(className);
    });
}

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

/**@description: checks the array of DOM elements if they contain the css .class
 * @return: {number} array index of the DOM element, which contains the .class
 * @return: {boolean} false if no DOM elements with the .class in need
 **/
function findClassIn(array, className) {
    let res = null;
    array.forEach((item, index) => {
        if (item.classList.contains(className)) {
            res = index;
        }
    });
    return res;
}

function cleanActiveIn() {

}

///dev
function log(item) {
    console.log(item);
}