/*
  provide high level abstract methods which will further invoke relevant DB
  methods, based on the engine requested.
*/

/*
  set the engine
*/

var dbConnection = null;

function dbEngine () {
  console.log("Inside dbEngine Constructor");
}

 dbEngine.prototype = {
 	getTestCase : function(tcNumber) {
	 	console.log("Inside getTestCase");
	 	if(this.getTestCaseImpl != 'undefined')
	 		return this.getTestCaseImpl(tcNumber);
	 	else {
	 		console.log("getTestCase is not implemented in....");
	 		return null;
	 	}
 	},
 	getTestStep : function() {
	 	console.log("Inside getTestStep");
	 	if(this.getTestStepImpl != 'undefined')
	 		this.getTestStepImpl();
	 	else console.log("getTestStepImpl is not implemented in....");
 	},
 	getTestSuite : function() {
	 	console.log("Inside getTestSuite");
	 	if(this.getTestSuiteImpl != 'undefined')
	 		this.getTestSuiteImpl();
	 	else console.log("getTestSuiteImpl is not implemented in....");
 	},
 	getTestCaseCount : function() {
	 	console.log("Inside getTestCaseCount");
	 	if(this.getTestCaseCount != undefined)
	 		return this.getTestCaseCountImpl();
	 	else {
	 		console.log("getTestCaseCount is not implemented in....")
	 		return null;
	 	}
    }
 }

module.exports = function(dbtype) {
	if(dbtype == "excel") {
		dbExcel = require('../Utilities/excelUtils.js')
		console.log("dbExcel.prototype: ", dbExcel.prototype);
		dbExcel.prototype = Object.create(dbEngine.prototype);
		dbExcel.prototype.constructor = dbExcel;
		dbConnection = new dbExcel();
		return dbConnection;
	} else if (dbtype == "mongodb") {
		dbMongo = require('../Utilities/mongoUtils.js')
		dbMongo.prototype = Object.create(dbEngine.prototype);
		console.log("dbMongo.prototype: ", dbMongo.prototype);
		dbMongo.prototype.constructor = dbMongo;
		dbConnection = new dbMongo();
		return dbConnection;
	} else if (dbtype == "mysql") {
		console.log("mySQL not supported");
	}
}
