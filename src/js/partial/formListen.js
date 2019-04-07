'use strict';

/**@description
 * - it hangs listeners to 'keydown', 'focus', 'blur', 'input', 'change' events;
 *
 * */
module.exports = ( data ) => {
    const checkForNext = require('./checkForNext');
    const { form, active, bold } = data;

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
    /**@description "click" events are hanged on the total form, identifying the target
     * by the dataset value of the attributes;
     * */
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

        if (target.dataset.type === "option") {
            let optionBlock = target.parentElement.parentElement;
            let hiddenInput = optionBlock.querySelector("input"); // "recipient-country" or "billing-country"
            let selectBlock = optionBlock.parentElement;
            let pseudoInput = selectBlock.querySelector(`span[data-type=${hiddenInput.name}`);

            hiddenInput.value = ""; //resetting for getting round blur event checking
            hiddenInput.value = target.textContent;

            if (hiddenInput.value !== "") {
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

///CHANGE EVENT
    

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
     * @param: {object} objTarget - the DOM Container for the option list
     * @param: {array} areaArr - the list of the countries for selection
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


///dev
function log(item) {
    console.log(item);
}