QUnit.test( "Should return array of possible last four with lowest number first. Example for female from 1966.", function( assert ) {
  assert.equal(cprCalc.possibleLastFour("f", 1966, 12, 14)[0], "0028" );
});
QUnit.test( "Should return first six digits when supplied with date of birth", function( assert ) {
  assert.equal(cprCalc.firstSixDigits(1966, 12, 14), "141266" );
});
