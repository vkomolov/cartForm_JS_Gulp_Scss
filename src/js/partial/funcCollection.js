'use strict';

//imports
const { Sku } = require('../classes');

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

/**@description
 * */
exports.createCart = () => {

};

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

///dev
function log(item) {
    console.log(item);
}