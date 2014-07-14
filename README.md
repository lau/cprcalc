# Danish CPR number calculator

[![Build
Status](https://travis-ci.org/lau/cprcalc.svg?branch=master)](https://travis-ci.org/lau/cprcalc)

Calculate the possible last four digits of Danish CPR numbers (personal identification numbers). In Javascript. Useful for CPR numbers given until the year 2007.

## Usage
Either [open index.html for a graphical interface](http://lau.github.io/cprcalc). Or call the javascript function possibleLastFour with gender, year, month, day. Example:

    cprCalc.possibleLastFour("f", 1966, 12, 14);

The methods used to exclude the possible numbers are:

1. The modulus 11 test: http://da.wikipedia.org/wiki/CPR-nummer#Beregning_af_kontrolciffer
2. Exclusion by 7th digit and year combination: http://da.wikipedia.org/wiki/CPR-nummer#Under_eller_over_100_.C3.A5r

Method 2 is currently only fully supported for years of birth between 1937 and 1999.

## License

Copyright (c) 2014 Lau Taarnskov. See the LICENSE file for license rights and
limitations (MIT).
