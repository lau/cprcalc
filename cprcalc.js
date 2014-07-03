var cprCalc = {
  // Table used for modules 11 test
  CPR_MULTIPLICATION_TABLE: [4,3,2,7,6,5,4,3,2,1],

  firstSixDigits: function(year, month, day) {
    // make sure year, month, day are strings
    year = year.toString();
    month = month.toString();
    day = day.toString();

    return this.padNumber(day,2) + this.padNumber(month,2) + year.substr(2);
  },

  possibleLastFour: function(gender, year, month, day) {
    var possibleLastFour = [];

    firstSixDigits = this.firstSixDigits(year, month, day);

    // populate last four with all that matches gender
    // pad number with zeroes if necessary so that it is 4 chars
    for(i=0; i <= 9999; i++) {
      if (this.numberMatchesGender(i, gender)) possibleLastFour.push(this.padNumber(i, 4));
    }

    for(j=0; j < possibleLastFour.length; j++) {
      var entireCpr = firstSixDigits+possibleLastFour[j];

      // check for exclusion based on combination of 7th digit and year
      if (this.excludedBy7thDigit(possibleLastFour[j], year)) possibleLastFour[j]=null;

      // remove last four unless the entire cpr combination matches modulus 11 test
      // set value to null if does not match modulus 11. we then later remove all these empty elements from the array
      if (this.matchesModolus11(entireCpr)==false) { possibleLastFour[j]=null; }
    }

    // return array with null entries discarded
    cleanedLastFour = [];
    for(k=0; k < possibleLastFour.length; k++) { if(possibleLastFour[k]!=null) cleanedLastFour.push(possibleLastFour[k]) }
    return cleanedLastFour;
  },

  // modulus 11 test (http://da.wikipedia.org/wiki/CPR-nummer#Kontrolciffer_.28det_gamle_CPR-nummer.29)
  matchesModolus11: function(cpr) {
    var checkSum = 0;
    for(i=0; i < 10; i++) {
      currentCprDigit = parseInt(cpr.substr(i, 1));
      productOfDigitWithMultiplicationNumber = currentCprDigit*this.CPR_MULTIPLICATION_TABLE[i];
      checkSum = checkSum + productOfDigitWithMultiplicationNumber;
    }
    return (checkSum % 11 == 0);
  },

  // Returns true if the first digit of the last four (7th digit of entire CPR)
  // is impossible based on year and the table found here: http://da.wikipedia.org/wiki/CPR-nummer#Under_eller_over_100_.C3.A5r
  // This is currently incomplete and only excludes completely for 7th digits 5-8 and years between 1937 and 1999
  excludedBy7thDigit: function(lastFour, yearOfBirth) {
    // first digit of last four which is the same as seventh digit of CPR
    seventhDigit = lastFour.substr(0,1);
    // If year is between 1900 and 1999, 5,6,7, or 8 is impossible
    if(yearOfBirth<2000 && yearOfBirth>1899) {
      if ((seventhDigit>=5) && (seventhDigit<=8)) return true;
    }
    return false;
  },

  // The last digit of the last four (or entire cpr no.) must be
  // even for females and uneven for males
  numberMatchesGender: function(number, gender) {
    if((number % 2 == 1) && gender=="m") return true;
    if((number % 2 == 0) && gender=="f") return true;
    return false;
  },

  padNumber: function(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  },
}
