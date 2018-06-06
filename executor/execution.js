var dbConnector = require('../db/db_engine.js');

/*
** Structure of test step
** actionKeyword, pageObject, dataSet, testStep
*/
var executeAction = function (driver, testStep) {

    if (action.methods[actionKeyword]) {
      console.log(" verify the action and it is matched");

      action.methods[actionKeyword].call(this, driver, testStep.pageObject, testStep.dataSet);

      console.log("run the action succesfully");
      if (driver.result === true) {
      	//TODO: change it to dbWrapper API call
        setCellData("PASS", testStep, "Results", "Test Steps");
      } else {
      	//TODO: change it to dbWrapper API call
        setCellData("FAIL", testStep, "Results", "Test Steps");
        console.log("set the testStep result successfully");
        //break;
      }
    }else {
      console.log("No such function definition found in ");
    }
//  }
}


var executeTestCase = function (appiumDriver, db) {
	db.getTestSuite();
	db.getTestCase();
}

var executeTestSuite = function(appiumDriver, testdb) {
  var totalTestCaseCount = testdb.getTestCaseCount();
  console.log("TestCase Count : ", totalTestCaseCount);
  for (var testCase = 0; testCase < totalTestCaseCount; testCase++) {
  	result = true;
  	var testCaseID = testdb.getTestCase(testCase);
  	console.log("Test CaseID", testCaseID);
  }
}

function executeTestCase2(appiumDriver) {
  var totalTestCase = getRowCount("Test Cases");
  for (var testCase = 0; testCase < totalTestCase; testCase++) {
    driver.result = true;
    var testCaseID = getCellData(testCase, 'TestCaseID', 'Test Cases');
    var runMode = getCellData(testCase, "Runmode", "Test Cases");
    if (runMode.toLowerCase() === "yes") {
      var testStep = getRowContains(testCaseID, "TestCaseID", "Test Steps");
      var lastTestStep = getTestStepsCount("Test Steps", testCaseID, testStep);
      driver.result = true;
      for (; testStep < lastTestStep; testStep++) {
        var actionKeyword = getCellData(testStep, "Action_Keyword", "Test Steps");
        var pageObject = getCellData(testStep, "PageObject", "Test Steps");
        var dataSet = getCellData(testStep, "DataSet", "Test Steps");
        executeAction(appiumDriver, actionKeyword, pageObject, dataSet, testStep);
        if (driver.result === false) {
          setCellData("FAIL", testCase, "Results", "Test Cases");
          console.log("set the result data into the excelsheet");
          break;
        }
      }
      if (driver.result === true) {
        setCellData("PASS", testCase, "Results", "Test Cases");
      }
    }
  }
}

module.exports = executeTestSuite;
