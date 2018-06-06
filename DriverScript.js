var wd = require('wd');
var fs = require('fs');
var WdAndroid = require('wd-android');
var util1 = require('./Utilities/excelUtils.js');
var executor = require('./executor/execution.js');
var action = require('./Action/action.js');
var cnf = require('./Appium/configure.js');
var scnf = require('./Appium/serverConfig.js');
module.exports.result;


var wdAndroid = new WdAndroid(wd);
var environment = scnf.remotes.local;

configure = function (driver) {
// See whats going on
driver.on('status', function (info) {
  console.log(info.cyan);
});
driver.on('command', function (meth, path, data) {
  console.log(' > ' + meth.yellow, path.grey, data || '');
});
driver.on('http', function (meth, path, data) {
  console.log(' > ' + meth.magenta, path, (data || '').grey);
});
};

var appiumDriver = {};
var dbEngine = require('./db/db_engine.js');
    db = new dbEngine('excel');
    console.log("DB Object", db)
  executor(appiumDriver, db);

/*var appiumDriver = wdAndroid.promiseChainRemote(environment);
  configure(appiumDriver);
  appiumDriver.init(cnf.desiredCapabilities).setImplicitWaitTimeout(3000).then(function(){
    db = dbEngine('excel');
  executor(appiumDriver, db);
  });
*/
