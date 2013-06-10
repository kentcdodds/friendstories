var db = require('../../controllers/db');
var chai = require('chai');
var _ = require('underscore');
var expect = chai.expect;

chai.Assertion.includeStack = true;

describe('test', function() {
  describe('test_of_tests', function() {
    it('should work just fine', function() {
      var foo = 'bar'
      var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
      
      expect(foo).to.be.a('string');
      expect(foo).to.equal('bar');
      expect(foo).to.have.length(3);
      expect(beverages).to.have.property('tea').with.length(3);
    });
  });
});

