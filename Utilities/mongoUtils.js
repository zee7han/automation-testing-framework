var getTestCaseImpl = function() {
  console.log("getTestCaseImpl for Mongo");
}

var getTestSuiteImpl = function() {
  console.log("getTestSuiteImpl for Mongo");
}

function mongoUtils() {
  console.log("Inside constructor for MongoUtils");
  this.getTestCaseImpl = getTestCaseImpl;
  this.getTestSuiteImpl = getTestSuiteImpl;
};



module.exports = mongoUtils;
