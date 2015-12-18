Jquery validation rib
==========================
2015-12-18



This is a plugin for [jquery validation](http://jqueryvalidation.org/).
It validates a rib: the national bank account number in France.

It might be added [here](https://github.com/jzaefferer/jquery-validation/tree/master/src/additional).



There are two different validation methods: 

- rib_fr_format: check that the format is correct (99999 - 99999 - *********** - 99)
- rib_fr_validity: check that the rib is valid (check the format, plus, check that some specific algorithm validates)

