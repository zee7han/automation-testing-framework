var WD = require("wd");
var XLSX = require('xlsx');
var fs = require('fs');

var workBook = XLSX.readFile('./Data/Data.xlsx');
var action = require('./Action/action.js');
var testStepsJson = XLSX.utils.sheet_to_json(workBook.Sheets['Test Steps']);
//console.log(testStepsJson);
var testCasesJson = XLSX.utils.sheet_to_json(workBook.Sheets['Test Cases']);
//console.log(testCasesJson);


// to get exact data according to row in excelsheet we have keep rowNum as -1.
// we used json array  so we also assumed that our row started from 0.
function getCellData(rowNum, colName, sheetName) {
  var workSheet = workBook.Sheets[sheetName];
  var wsJson = XLSX.utils.sheet_to_json(workSheet);
  //console.log(wsJson);
  //console.log(rowNum, wsJson[rowNum]);
  var cellData = wsJson[rowNum][colName];
  return cellData;
}

function getRowCount(sheetName) {
  var workSheet = workBook.Sheets[sheetName];
  var wsJson = XLSX.utils.sheet_to_json(workSheet);
  var rows = wsJson.length;
  //console.log("number of rows in sheet", rows);
  return rows;
}

function getRowContains(testCaseID, colName, sheetName) {
  var workSheet = workBook.Sheets[sheetName];
  var rowCount = getRowCount(sheetName);
  console.log("the number of rows are as rowCount ", rowCount);
  for (var i=0; i < rowCount; i++) {
    var data = getCellData(i, colName, sheetName);
    console.log(" the data we receive from the sheet is",  data);
    if (data === testCaseID) {
      break;
    }
  }
  console.log("here i am try to fetch the value of the i", i);
  return i;
}



function getTestStepsCount(sheetName, testCaseID, testCaseStart) {
  var rowCount = getRowCount(sheetName)
  //console.log(" we reach till the rowCount");
  //console.log("test case start from", testCaseStart);
  console.log(" number of rows we get from getTestStepsCount method are", rowCount);
  console.log("the value of testCaseStart in getTestStepsCount method is: ", testCaseStart);
  console.log("the value of testCaseID in getTestStepsCount method is: ", testCaseID);
  for (var i = testCaseStart; i < rowCount; i++) {
       //console.log(testCaseStart);
       //console.log(rowCount);
    //var cellData = getCellData(i, testCaseID, sheetName);
    //console.log(cellData);
    var data = getCellData(i, "TestCaseID", sheetName);
    console.log("the data I get into the getTestStepsCount method inner get Cell data is:", data);
    if (testCaseID !== data) {
      var number = i;
      return number;
    }
  }
  var number = getRowCount(sheetName);
  console.log("here we are getting the number of test steps by getTestStepsCount method");
  return number;
}





function setCellData(result, rowNum, colName, sheetName) {
  var workSheet = workBook.Sheets[sheetName];
  var wsJson = XLSX.utils.sheet_to_json(workSheet);
  wsJson[rowNum][colName] = result;
  //console.log(wsJson);
  var wsExcel = XLSX.utils.json_to_sheet(wsJson);
  //console.log(wsExcel);
  fs.writeFile('output.xlsx', wsExcel, 'UTF-8');

}


function executeTestCase(appiumDriver) {
  var totalTestCase = getRowCount("Test Cases");
  //console.log("number of test cases are", totalTestCase);
  for (var testCase = 0; testCase < totalTestCase; testCase++) {
    result = true;
    //console.log("try to go inside the get cell method");
    var testCaseID = getCellData(testCase, 'TestCaseID', 'Test Cases');
    //console.log("the test case ID is ", testCaseID);
    var runMode = getCellData(testCase, "Runmode", "Test Cases");
    //console.log("the run mode is", runMode);
    if (runMode.toLowerCase() === "yes") {
      console.log("I am inside the runMode");
      var testStep = getRowContains(testCaseID, "TestCaseID", "Test Steps");
      console.log("number of test steps are", testStep);
      var lastTestStep = getTestStepsCount("Test Steps", testCaseID, testStep);
      console.log("the last step is", lastTestStep);
      result = true;
      for (; testStep < lastTestStep; testStep++) {
        var actionKeyword = getCellData(testStep, "Action_Keyword", "Test Steps");
        var pageObject = getCellData(testStep, "PageObject", "Test Steps");
        console.log("I get the action and pageObject as given below");
        console.log("the action perform is: ", actionKeyword);
        console.log("the object is: ", pageObject);
        executeAction(appiumDriver, actionKeyword, pageObject, testStep);
        if (result === false) {
          setCellData("FAIL", testCase, "Results", "Test Cases");
          console.log("set the result data into the excelsheet");
          break;
        }
      }
      if (result === true) {
        setCellData("PASS", testCase, "Results", "Test Cases");
        //console.log("set the result data into excelsheet");
      }
    }
  }
}

//module.exports.executeTestCase = executeTestCase;

function executeAction(driver, actionKeyword, pageObject, testStep) {
  var length = action.methods.length;
  for (var i = 0; i < length; i++) {
    console.log("try to run the action", action.methods[i][actionKeyword], actionKeyword);
    if (action.methods[i][actionKeyword]) {
      console.log(" verify the action and it is matched");
      action.methods[i][actionKeyword].call(this, driver, pageObject);
      console.log("run the action succesfully");
      if (result === true) {
        setCellData("PASS", testStep, "Results", "Test Steps");
        //console.log("set the teststep result successfully");
        break;
      } else {
        setCellData("FAIL", testStep, "Results", "Test Steps");
        console.log("set the testStep result successfully");
        break;
      }
    }
  }
}


module.exports.executeTestCase = executeTestCase;
