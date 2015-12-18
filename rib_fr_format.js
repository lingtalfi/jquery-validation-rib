/**
 * RIB is the national bank account number in France.
 * 
 * In this implementation, the expected format is:
 * 99999 - 99999 - *********** - 99
 * The dashes and spaces around them are expected, asterisk means a letter (case insensitive) or a number.
 * 
 */
$.validator.addMethod("rib_fr_format", function (value, element) {
    return this.optional(element) || /^[0-9]{5} - [0-9]{5} - [0-9a-zA-Z]{11} - [0-9]{2}$/i.test(value);
}
// , "Please enter a valid rib" // do not uncomment if you want to use localization  
);