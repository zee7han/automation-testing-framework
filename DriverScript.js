var wd = require('wd');
var fs = require('fs');
var WdAndroid = require('wd-android');
var util1 = require('./Utilities/excelUtils.js');
var action = require('./Action/action.js');
var result;
var wdAndroid = new WdAndroid(wd);
fs.readFile('path to your apk file', (err, data) => {  // here we are read the apk file
  if (err)
  console.log(err);


  var remotes = {
    local: {
      hostname: "127.0.0.1",
      port: 4723,
      url: "http://127.0.0.1:4723/wd/hub"
    }
  }

  var environment = remotes.local;


  var desiredCapabilities = {
    automationName: 'appium',
    platformName: 'Android',
    platformVersion: '6.0.1',
    deviceName: 'MOTO G3',
    udid: '',  // enter your device udid
    appSetupPath: '', //path to you apk file in your system
    appPackage: '',  // enter your app package
    appActivity: '', // enter your app appActivity
    appWaitActivity: '', // enter you appWaitActivity
    appWaitPackage: '' // enter your appWaitPackage
  }


  var appiumDriver = wdAndroid.promiseChainRemote(environment);


    appiumDriver.init(desiredCapabilities, function(){
      module.exports.appiumDriver = appiumDriver;
      console.log("Testing appium driver element find object");
      util1.executeTestCase(appiumDriver);
  });


});
