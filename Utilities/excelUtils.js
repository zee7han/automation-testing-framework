var wd = require("wd");
var xlsx = require('xlsx');
var fs = require('fs');

var workBook = xlsx.readFile('/path/to/your/Data.xlsx file');
var action = require('../Action/action.js');
var driver = require('../DriverScript.js');

var testStepsJson = xlsx.utils.sheet_to_json(workBook.Sheets['Test Steps']);
//console.log(testStepsJson);
var testCasesJson = xlsx.utils.sheet_to_json(workBook.Sheets['Test Cases']);
//console.log(testCasesJson);


// to get exact data according to row in excelsheet we have keep rowNum as -1.
// we used json array  so we also assumed that our row started from 0.
function getCellData(rowNum, colName, sheetName) {
  if(sheetName === "Test Steps"){
    var cellData = testStepsJson[rowNum][colName];
    return cellData;
 }
else if (sheetName === "Test Cases") {
  var cellData = testCasesJson[rowNum][colName];
  return cellData;
}else {
  console.log("Try to get data from the invalid workSheet");
}
}




function getRowCount(sheetName) {
  console.log("getRowCount in excelUtils", sheetName);
  if(sheetName === "Test Steps"){
    var rows = testStepsJson.length;
    return rows;
}
else if (sheetName === "Test Cases") {
  var rows = testCasesJson.length;
  return rows;
}else {
  console.log("Try to count the rows of the invalid workSheet");
}
}



function getRowContains(testCaseID, colName, sheetName) {
  var rowCount = getRowCount(sheetName);
  console.log("the number of rows are as rowCount ", rowCount);
  for (var i=0; i < rowCount; i++) {
    var data = getCellData(i, colName, sheetName);
    if (data === testCaseID) {
      break;
    }
  }
  console.log("here i am try to fetch the value of the i", i);
  return i;
}




function getTestStepsCount(sheetName, testCaseID, testCaseStart) {
  var rowCount = getRowCount(sheetName)
  for (var i = testCaseStart; i < rowCount; i++) {
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
  if(sheetName === "Test Steps"){
  testStepsJson[rowNum][colName] = result;
}
else if (sheetName === "Test Cases") {
  testCasesJson[rowNum][colName] = result;
}else {
  console.log("Try to set data into the invalid workSheet");
}
}


var getTestCaseImpl = function(tcNumber) {
  console.log("getTestCaseImpl for Excel");
  return getCellData(tcNumber, 'TestCaseID', 'Test Cases');
}

var getTestSuiteImpl = function() {
  console.log("getTestSuiteImpl for Excel");
}

var getTestCaseCountImpl = function() {
  console.log("getTestCaseCountImpl for Excel");
  return getRowCount("Test Cases");
}

function excelUtils() {
  console.log("Inside constructor for excelUtils");
  this.getTestCaseImpl = getTestCaseImpl;
  this.getTestSuiteImpl = getTestSuiteImpl;
  this.getTestCaseCountImpl = getTestCaseCountImpl;
};


module.exports = excelUtils;
