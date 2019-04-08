'use strict';

/**@description to test the values of the input;
 * - it checks the type of the input from data.inputNamesObj by its name;
 * - it takes the regExp according to the type of the input;
 * - it tests the value of the input with the regExp taken;
 * - if the value does not meets the regExp then to insertAlarm to the input wrapper;
 * - as the event is "input", the input`s value will be tested on each char input;
 * if after the last input char the value doesn`t meet the regExp, then to remove the
 * last char and to temporary insert the alarm message, showing the sample format of
 * the correct mask;
 * @param {object} input; the input element to test the value;
 * @param {object} data: the initial data with funcs and variables;
 * */
module.exports = (input, data) => {
    let rExpType = data.inputNamesObj[input.name].type;
    let regExp = data.regExpObj[rExpType];

    if (!regExp.test(input.value)) {
        data.init.showAlertAndOff(input.parentElement, data, "error");
        setTimeout(() => {
            input.value = input.value.slice(0,-1); //showing then deleting last char
        }, 300);
    } else {    //if regExp passes
        defaultInput(input, data); //resetting input style

        if (rExpType === "string"
            || rExpType === "spacedString"
            || rExpType === "stringMaySpace") {
            input.value = input.value[0].toUpperCase() + input.value.slice(1).toLowerCase();
        }
        if (rExpType === "spacedString" || rExpType === "stringMaySpace") {
            if (input.value.indexOf(" ") !== -1) {  //if 'space' in string (for full name input)
                let spaceInd = input.value.indexOf(" ");
                if (((input.value.length - 1) - spaceInd) >= 1 ) {   //if input has char/s after space
                    let capTale = input.value[spaceInd+1].toUpperCase() + input.value.slice(spaceInd + 2).toLowerCase();
                    input.value = input.value.slice(0, spaceInd+1) + capTale; //string before space and after
                }
            }
        }
        if (rExpType === "phone") {
            //////if the place for '+'
            if (input.value.indexOf("+") === -1) {
                input.value = "+" + input.value;
            }
            //////if the place for '('
            if (input.value.indexOf("(") === -1 && input.value.length === 3) {
                let lastChar = input.value.slice(-1);
                input.value = input.value.slice(0, -1) + "(" + lastChar;
            }
            /////if '(' is not in place
            if (input.value.indexOf("(") !== -1 && input.value.indexOf("(") !== 2) {
                data.init.insertAlarm(input.parentElement, data, "error");
                setTimeout(() => {
                    input.value = input.value.slice(0,-1); //showing then deleting last char
                }, 300);
            }
            //////if the place for ')'
            if (input.value.indexOf(")") === -1 && input.value.length === 7) {
                let lastChar = input.value.slice(-1);
                input.value = input.value.slice(0, -1) + ")" + lastChar;
            }
            //if ')' is not in place
            if (input.value.indexOf(")") !== -1 && input.value.indexOf(")") !== 6) {
                data.init.insertAlarm(input.parentElement, data, "error");
                setTimeout(() => {
                    input.value = input.value.slice(0,-1); //showing then deleting last char
                }, 300);
            }

            //////if the place for '-'
            if (input.value.indexOf("-") === -1 && input.value.length === 11 ||
                input.value.indexOf("-", 11) === -1 && input.value.length === 14) {
                let lastChar = input.value.slice(-1);
                input.value = input.value.slice(0, -1) + "-" + lastChar;
            }
            if (input.value.indexOf("-") !== -1 && input.value.indexOf("-") !== 10 ||
                input.value.indexOf("-", 11) !== -1 && input.value.indexOf("-", 11) !== 13) {
                data.init.insertAlarm(input.parentElement, data, "error");
                setTimeout(() => {
                    input.value = input.value.slice(0,-1); //showing then deleting last char
                }, 300);
            }
        }
        if (rExpType === "cardNumber") {
            input.parentElement.classList.remove("card-type"); //eliminating possible card-icon of previous value

            if (input.value.indexOf(" ") === -1 && input.value.length === 5 ||
                input.value.indexOf(" ", 9) === -1 && input.value.length === 10 ||
                input.value.indexOf(" ", 14) === -1 && input.value.length === 15 ||
                input.value.indexOf(" ", 19) === -1 && input.value.length === 20) {

                let lastChar = input.value.slice(-1);
                input.value = input.value.slice(0, -1) + " " + lastChar;
            }
        }
    }
};

/**@description it removes all alerts around the given input and resets to default
 * the styles of the input;
 * @param {object} input;
 * @param {object} data: the initial data with funcs and variables;
 * */
function defaultInput(input, data) {
    data.init.removeAlerts(data);
    input.style.caretColor = "";
    input.style.color = "";
}