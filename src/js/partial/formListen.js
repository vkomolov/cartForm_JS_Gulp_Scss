'use strict';

/**@description
 * - it hangs listeners to 'keydown', 'focus', 'blur', 'input', 'change' events;
 * - "click" events are hanged on the total form, identifying the target
 * by the dataset value of the attributes;
 * */
module.exports = ( data ) => {
    const checkForNext = require('./checkForNext');
    const testRegExp = require('./testRegExp');
    const {
        form, active, bold,
        marked, red, cardType
    } = data;

    /**@description
     * if during input the 'enter' or 'escape' keys pressed, then the input is blur
     * */
    form.addEventListener("keydown", (ev) => {
        let target = ev.target;
        if (ev.keyCode === 13 || ev.keyCode === 27) {
            target.blur();
        }
    }, true);

    /**@description
     * if target is focused, then to highlight the border of the Parent Element;
     * */
    form.addEventListener("focus", ({ target }) => {
        if (target.name !== "recipient-country" && target.name !== "billing-country") {
            toggleParent(target, active);
        }
    } ,true);

    /**@description
     * if target is blur, then to hide the border of the Parent Element;
     * */
    form.addEventListener("blur", ({ target }) => {
        if (target.name !== "recipient-country" && target.name !== "billing-country") {
            toggleParent(target, active);
        }
    } ,true);

///CLICK EVENT
    form.addEventListener("click", ({ target }) => {
        if (target.closest("div").dataset.type === "continue") {
            /**@description if the button "continue" is clicked then to check all
             * inputs of the current and previous stages to be filled;
             * */
            checkForNext( data );
        }

        /**@description if pseudo-input 'country' is clicked then the selection list
         * opens in the absolute for the selection from the list of the values;
         * On filling the input the matched list of the countries is shown to select;
         * When the selection is made, then to transfer the value to the hidden input;
         * */
        if (target.closest(`.${data.selectionBlock}`)) {
            let selectBlock = target.closest(`.${data.selectionBlock}`); //pseudo-input wrapper
            let hiddenInput = selectBlock.parentElement.querySelector("input"); //getting inner input
            let optionBlock = hiddenInput.parentElement; //intermediate wrapper of the input

            hiddenInput.value = ""; //resetting value of the search-input

            setSelectList(optionBlock, data.areaArr); //creating list of option items (span)

            optionBlock.classList.add(active); //to switch display: block from none
            selectBlock.classList.add(active); //to display the search-icon in absolute
            hiddenInput.focus();
        }

        if (target.dataset.type === 'option') {
            let optionBlock = target.parentElement.parentElement;
            let hiddenInput = optionBlock.querySelector("input"); // "recipient-country" or "billing-country"
            let selectBlock = optionBlock.parentElement;
            let pseudoInput = selectBlock.querySelector(`span[data-type=${hiddenInput.name}`);

            hiddenInput.value = ""; //resetting for getting round blur event checking
            hiddenInput.value = target.textContent;

            if (hiddenInput.value.length) {
                pseudoInput.textContent = hiddenInput.value;
                pseudoInput.classList.add(bold);

                /**@description
                 * - to switch block to display: none;
                 * - to switch the search-icon off
                 * */
                setTimeout(() => {
                    optionBlock.classList.remove(active);
                    selectBlock.querySelector(`.${data.selectionBlock}`).classList.remove(active);
                }, 200);
            }
        }
    });

///INPUT EVENT
    form.addEventListener("input", ({ target }) => {
        let rExpType = data.inputNamesObj[target.name].type;

       /**@description testing input.value with its regExp, stored in 'inputNamesObj';
        * */
       testRegExp(target, data);

        if (rExpType === "stringMaySpace") {
            if (searchInArray(target.parentElement, target.value, data)) { //searching chars in the country array
                target.style.color = "";
            }
            else {
                target.classList.add(red);
            }
        }
    }, true);

///CHANGE EVENT
    form.addEventListener("change", ({ target }) => {
        let rExpType = data.inputNamesObj[target.name].type;

        target.value = target.value.trim();

        if (target.value.length) {
            if (!data.regExpObj[rExpType].test(target.value)) { //rechecking the value for safe
                target.value = "";
                target.classList.add(marked);
                data.init.showAlertAndOff(target.parentElement, data, "error");
            }
            else {  //if value preliminary validated through regExp
                data.init.removeAlerts(data);
                target.classList.remove(marked);

                let cases = {
                    "spacedString": function () {
                        let val = target.value;
                        if (val.split(" ").length === 1) { //if no second word (0 is null!)
                            target.value = "";
                            target.classList.add(marked);
                            data.init.showAlertAndOff(target.parentElement, data, "error");
                        }
                    },
                    "zip": function () {
                        if (target.value.length < 6) {
                            target.value = "";
                            target.classList.add(marked);
                            data.init.showAlertAndOff(target.parentElement, data, "error");
                        }
                    },
                    "phone": function () {
                        if (target.value.length < 16) { //if validated value is less then needed
                            target.value = "";
                            target.classList.add(marked);
                            data.init.showAlertAndOff(target.parentElement, data, "error");
                        }
                        else {
                            target.value = target.value.slice(0, 2) + " " + target.value.slice(2);
                            target.value = target.value.slice(0, 8) + " " + target.value.slice(8);
                        }
                    },
                    "stringMaySpace": function () {
                        ///span which hides the input and option list in absolute hidden
                        let pseudoInput = data.form.querySelector(`span[data-type=${target.name}`);
                        let optionBlock = target.parentElement;
                        let selectionBlock = optionBlock.parentElement.querySelector(`.${data.selectionBlock}`);
                        let res = false;

                        if (data.areaArr.includes(target.value)) {
                            res = true;
                        }

                        if (!res) {
                            target.classList.add(red);
                            pseudoInput.classList.remove(bold);
                        }
                        else {
                            pseudoInput.textContent = target.value;
                            pseudoInput.classList.remove(red);
                            pseudoInput.classList.add(bold);
                            setTimeout(() => {
                                optionBlock.classList.remove(active);  //to switch block to display: none
                                selectionBlock.classList.remove(active); //to switch the search-icon off
                            }, 300);
                        }
                    },
                    "cardNumber": function () {
                        if (target.value.length < 16) { //if validated value is less then needed
                            target.value = "";
                            target.classList.add(marked);
                            data.init.showAlertAndOff(target.parentElement, data, "error");
                        }
                        else {
                            let temp = target.value;
                            temp = temp.replace(/ /gi, "");
                            for (let i = 4; i < temp.length; ) {
                                temp = temp.slice(0, i) + " " + temp.slice(i);
                                i += 5;
                            }
                            target.value = temp;
                            target.parentElement.classList.add(cardType); //adding card-icon to DOM element
                        }
                    },
                    "cardDate": function () {
                        if (target.value.length < 4) { //if validated value is less then needed
                            target.value = "";
                            target.classList.add(marked);
                            data.init.showAlertAndOff(target.parentElement, data, "error");
                        }
                        else {
                            let m = target.value.slice(0, 2);
                            let y = target.value.slice(-2);
                            let curDate = new Date();
                            let curYear = curDate.getFullYear();
                            let curYearLastDits = curYear.toString().slice(-2); //getting last two digits of year
                            let innDate = null; //incoming date

                            if (y >= curYearLastDits) {
                                if (m >= 0 && m < 13) {  //writing as Jan - 1 (not as 0)
                                    innDate = data.init.stringToDate(y, m);
                                    if (innDate > curDate) {
                                        target.value = target.value.slice(0,2) + " / " + target.value.slice(2);
                                    }
                                    else {
                                        target.value = "";
                                        target.classList.add(marked);
                                        data.init.showAlertAndOff(target.parentElement, data, "card date is expired");
                                    }
                                }
                                else {
                                    target.value = "";
                                    target.classList.add(marked);
                                    data.init.showAlertAndOff(target.parentElement, data, `month: ${m} is not correct`);
                                }
                            }
                            else {
                                target.value = "";
                                target.classList.add(marked);
                                data.init.showAlertAndOff(target.parentElement, data, "card date is expired");
                            }
                        }
                    },
                    "email": function () { //very simple for email: to be validated on the Back
                        if (target.value.indexOf("@") < 0 || target.value.indexOf(".") < 0) {
                            target.value = "";
                            target.classList.add(marked);
                            data.init.showAlertAndOff(target.parentElement, data, "error");
                        }
                    }
                };
                if (cases[rExpType]) {
                    cases[rExpType]();
                }
            }
        }
    });
    

//////FUNCTIONS
    /**@description toggles the Parent element`s border;
     * @param {object} target; DOM element, which has the Parent`s border to toggle;
     * @param {string} classActive; the class-name to highlight the DOM element;
     * */
    function toggleParent( target, classActive ) {
        target.parentElement.classList.toggle(classActive);
    }

    /**@description: dynamically creates the option list of the countries, which will
     * be filtered on matching the search input value;
     * It listens to the input and sorts countries` list with the matching chars.
     * @param {object} objTarget - the DOM Container for the option list
     * @param {array} areaArr - the list of the countries for selection
     * */
    function setSelectList(objTarget, areaArr) {
        let optionWrapper = objTarget.querySelector(`.${data.optionWrapper}`);
        if (optionWrapper) {
            optionWrapper.parentElement.removeChild(optionWrapper); //remaking optionWrapper
        }
        optionWrapper = document.createElement("div");
        optionWrapper.classList.add(data.optionWrapper);

        for (let i = 0; i < areaArr.length; i++) {
            let option = document.createElement("span");
            option.setAttribute("data-type", "option");
            option.textContent = areaArr[i];
            optionWrapper.appendChild(option);
        }
        objTarget.insertBefore(optionWrapper, objTarget.firstChild);
    }
};

    /**@description
     * @param {object} parentTarget; the wrapper of the input;
     * @param {string} searchStr; the type of the message ("empty", "error", "custom");
     * @param {object} data: the initial data with funcs and variables;
     * */
    function searchInArray(parentTarget, searchStr, data) {
        let foundArr = data.areaArr.filter(item => {
            return item.indexOf(searchStr) !== -1;
        });

        if (foundArr.length) {
            setSelectList(parentTarget, foundArr, data);
            return true;
        }
        return false;
    }

    /**@description: dinamically creates the option list of countries;
     * It listens to the 'input' event and sorts the countries` list with the matching chars;
     * @param {object} parentTarget the DOM Container for the option list
     * @param {array} foundArr - the list of the countries
     * @param {object} data: the initial data with the funcs and the variables;
     * */
    function setSelectList(parentTarget, foundArr, data) {
        let optionWrapper = parentTarget.querySelector(`.${data.optionWrapper}`);
        if (optionWrapper) {
            optionWrapper.parentElement.removeChild(optionWrapper); //remaking optionWrapper
        }
        optionWrapper = document.createElement("div");
        optionWrapper.classList.add(data.optionWrapper);

        for (let i = 0; i < foundArr.length; i++) {
            let option = document.createElement("span");
            option.setAttribute("data-type", "option");
            option.textContent = foundArr[i];
            optionWrapper.appendChild(option);
        }
        parentTarget.insertBefore(optionWrapper, parentTarget.firstChild);
    }

    ///dev
    function log(item) {
        console.log(item);
    }