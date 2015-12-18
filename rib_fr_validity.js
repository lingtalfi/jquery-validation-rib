/**
 * RIB is the national bank account number in France.
 * 
 * In this implementation, the expected format is:
 * 99999 - 99999 - *********** - 99
 * The dashes and spaces around them are expected, asterisk means a letter (case insensitive) or a number.
 * 
 * Algorithm:
 * The key of the RIB is represented by the last two digits.
 * By computing the preceding fields (the two groups of 5 digits and the group of 11 characters),
 * we must obtain the key, otherwise the rib is not valid.
 * 
 */
$.validator.addMethod("rib_fr_validity", function (value, element) {
    if (this.optional(element)) {
        return true;
    }

    function getRibNumber(text) {

        return strtr(text.toString(), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "12345678912345678923456789");
    }

    function strtr(str, from, to) {
        // http://kevin.vanzonneveld.net
        // original by: Brett Zamir (http://brett-zamir.me)
        // example 1: $trans = {'hello' : 'hi', 'hi' : 'hello'}; strtr('hi all, I said hello', $trans); returns: 'hello all, I said hi'
        // example 2: strtr('äaabaåccasdeöoo', 'äåö','aao'); returns: 'aaabaaccasdeooo'
        // example 3: strtr('ääääääää', 'ä', 'a'); returns: 'aaaaaaaa'
        // example 4: strtr('http', 'pthxyz','xyzpth'); returns: 'zyyx'
        // example 5: strtr('zyyx', 'pthxyz','xyzpth'); returns: 'http'
        var fr = '', i = 0, j = 0, lenStr = 0, lenFrom = 0;
        var tmpFrom = [];
        var tmpTo = [];
        var ret = '';
        var match = false;
        // Received replace_pairs?
        // Convert to normal from->to chars
        if (typeof from === 'object') {
            for (fr in from) {
                tmpFrom.push(fr);
                tmpTo.push(from[fr]);
            }
            from = tmpFrom;
            to = tmpTo;
        }
        // Walk through subject and replace chars when needed
        lenStr = str.length;
        lenFrom = from.length;
        for (i = 0; i < lenStr; i++) {
            match = false;
            for (j = 0; j < lenFrom; j++) {
                if (str.substr(i, from[j].length) == from[j]) {
                    match = true;
                    // Fast forward
                    i = (i + from[j].length) - 1;
                    break;
                }
            }
            if (false !== match) {
                ret += to[j];
            } else {
                ret += str[i];
            }
        }
        return ret;
    }

    function formater(texte, longueur) {

        var resultat = (texte == null ? "" : texte.toString().toUpperCase().substr(0, longueur));
        while (resultat.length < longueur) {
            resultat = "0" + resultat;
        }
        return resultat;
    }


    function isValidRib(rib) {
        var matches = rib.match(/^([0-9]{5}) - ([0-9]{5}) - ([0-9a-zA-Z]{11}) - ([0-9]{2})$/i);
        if (null !== matches) {
            var etablissement = matches[1];
            var guichet = matches[2];
            var compte = matches[3].toUpperCase();
            var cle = matches[4];

            etablissement = getRibNumber(etablissement);
            guichet = getRibNumber(guichet);
            compte = getRibNumber(compte);

            var ribKey = 97 - ( ( 89 * parseInt(etablissement, 10) + 15 * parseInt(guichet, 10) + 3 * parseInt(compte, 10) ) % 97);
            ribKey = formater(ribKey, 2);
            return (cle === ribKey);
        }
        return false;
    }


    return isValidRib(value);

}
//                , "Please enter a valid rib" // do not uncomment if you want to use localization  
);