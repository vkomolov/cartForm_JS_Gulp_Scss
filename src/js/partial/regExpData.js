'use strict';

/**@description: Validating each char input;
 * */
module.exports = {
    "phone": /^[\+]?[0-9]{0,1}[(]?[0-9]{0,3}[)]?[0-9]{0,3}[-]?[0-9]{0,2}[-]?[0-9]{0,2}$/,
    "string": /^[a-z]{1,30}$/i,
    "stringMaySpace": /^([a-z]{1,15}\s?)([a-z]{0,15}\s?)[a-z]{0,15}$/i,
    "spacedString": /^([a-z]{1,15}\s?)[a-z]{0,15}$/i,
    "combi": /^[^\+\*=]+$/i,
    "zip": /^[0-9]{1,6}$/i,
    "email": /^[a-z0-9]{1,15}[\@]?[a-z0-9]{0,15}[\.]?[a-z]{0,5}$/i,
    "cardNumber": /^[0-9]{1,4}\s?[0-9]{0,4}\s?[0-9]{0,4}\s?[0-9]{0,4}$/i, //will be then processed
    "cardDate": /^[0-9]{1,4}$/i, //will be then processed
    "cardCode": /^[0-9]{1,4}$/i
};