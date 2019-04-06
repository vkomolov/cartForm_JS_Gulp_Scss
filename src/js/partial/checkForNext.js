'use strict';

///imports
const buildThanks = require("./buildThanks");

/**@description: Checking the empty inputs for the each stage of the form:
 * 'Shipping', 'Billing', 'Payment');
 * At the next stages it checks the inputs of the current and previous stages (for safe);
 * The 'optional' inputs (with the stage "-1") will be omitted
 * The first empty input will have the alarm message above it.
 * All empty but required inputs will be marked.
 * **/
module.exports = ( data ) => {
    let { stage, active } = data;
    let emptyInputArr = []; //refreshing previous results of the empty inputs` array

//there are three stages (0, 1, 2)
const stageArr = data.stageWrapper.querySelectorAll("span[data-type=\"stage\"]");
const formBlockArr = data.form.querySelectorAll(`.${data.formBlock}`);

    data.init.removeAlerts(data); //removing previous possible alert message
    data.init.unmarkInputs(data); //unmarking all previous marking inputs

    for (let elem in data.inputNamesObj) {
        if (data.inputNamesObj[elem].stage <= stage
            && data.inputNamesObj[elem].stage !== -1) { //except inputs 'optional'...not required

            let inputEl = data.form.elements[elem];

            if (inputEl) { //if input exists in DOM
                if (!inputEl.value) { //if input is empty
                    if (inputEl.name === "recipient-country" //if pseudo input in country selection
                        || inputEl.name === "billing-country") {

                        let pseudoInput = data.form.querySelector(`span[data-type=${inputEl.name}]`);
                        let pseudoInputWrapper = pseudoInput.parentElement;

                        pseudoInputWrapper.classList.add("marked");// marking pseudo input Parent
                        emptyInputArr.push(pseudoInputWrapper.parentElement); //pushing the Parent of the pseudoInput Wrapper;
                    }
                    else {
                        inputEl.classList.add("marked");
                        emptyInputArr.push(inputEl.parentElement);
                    }
                }
            }
            else throw new Error("no DOM input by name " + elem + "found");
        }
    }

    /**@description if some empty input(s) found, then to insert the alarm span and
     * to focus on the first empty input;
     * to mark all empty inputs;
     * */
    if (emptyInputArr.length) {
        data.init.insertAlarm(emptyInputArr[0], data);
    }
    else {
        if (stage < stageArr.length - 1) {
            data.stage = ++stage;
            data.init.updateStage(stage, [stageArr, formBlockArr], active );
        }
        else {
            data.init.getAllInputs( data );
            data.init.processOrder( data );


            ///conditionally POSTing the order data and receiving the order No
            const orderNo = "12345_ab_bl11";
            data.order.orderNo = orderNo;

            buildThanks(data);
        }
    }
};

///dev
function log(item) {
    console.log(item);
}