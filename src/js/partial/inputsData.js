'use strict';

/**@description each property name equals the inputs` name of the form;
 * The input will be operated with the corresponding properties:
 * - error: in case of not valid input value the input will show the correct example
 * of the input;
 * - type: the type of the input will initiate the corresponding method to validate the
 * input value;
 * - stage: when submitting the form to switch to the next form stage, the inputs of
 * the corresponding stage will be checked to be filled;
 * */
module.exports = {
    "recipient-full-name": {error: "Jonathan Smith", type: "spacedString", stage: 0},
    "recipient-phone-number": {error: "+7(987)123-77-88", type: "phone", stage: 0},
    "recipient-street-address": {error: "Pushkina", type: "string", stage: 0},
    "optional": {error: "format: All except: '+', '=', '*'", type: "combi", stage: -1},
    "recipient-city": {error: "Kazan", type:"string", stage: 0},
    "recipient-country": {error: "Russia", type: "stringMaySpace", stage: 0},
    "recipient-zip": {error: "420015", type: "zip", stage: 0},
    "billing-full-name": {error: "Jonathan Smith", type: "spacedString", stage: 2},
    "billing-email": {error: "j.smith@gmail.com", type: "email", stage: 1},
    "billing-street-address": {error: "Pushkina", type: "string", stage: 1},
    "billing-optional": {error: "format: All except: '+', '=', '*'", type: "combi", stage: -1},
    "billing-city": {error: "Kazan", type: "string", stage: 1},
    "billing-country": {error: "Russia", type: "stringMaySpace", stage: 1},
    "billing-zip": {error: "420015", type: "zip", stage: 1},
    "card-name": {error: "Jonathan Smith", type: "spacedString", stage: 2},
    "card-number": {error: "3333 7777 8888 3333", type: "cardNumber", stage: 2},
    "card-date": {error: "MMYY: 0518", type: "cardDate", stage: 2},
    "card-code": {error: "0458", type: "cardCode", stage: 2}
};