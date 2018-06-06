"use strict";

var wd = require('wd');
var WdAndroid = require('wd-android');
var asserters = wd.asserters;
var xpath = require('../Data/xpath.js');
var drScript = require('../DriverScript.js');



var waitTillElementAppearFn = function(driver, element, dataSet){
  try {
  var el = xpath[element];
  console.log(el);
  return driver.waitForElementByXPath(el, asserters.isDisplayed, 10000, 100);
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
}




var verifyFn = function(driver, element, dataSet){
  try {
  var el = driver.waitForElementByXPath(xpath[element], asserters.isDisplayed, 3000, 20);
  return el;
  console.log("The element is verify as", el);
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
}




var clickFn = function(driver, element, dataSet){
  try{
  console.log("the xpath of the element is ", xpath[element]);
  var el = driver.waitForElementByXPath(xpath[element], asserters.isDisplayed, 3000, 20);
  return el.click();
  console.log("click the element successfully");
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
}




var quitFn = function(driver, element, dataSet){
  try{
  return driver.quit();
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
}




var scrollDownFn = function(driver, element, dataSet){
  try{
  console.log("the xpath of the element is ", xpath[element]);
  var el =  driver.waitForElementByXPath(xpath[element], asserters.isDisplayed, 3000, 20);
  return  el.swipe({
          startX: 0,
          startY: 0.2,
          endX: 0,
          endY: 0.5,
          duration: 1600
});
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
}




var scrollUpFn = function(driver, element, dataSet){
  try{
  console.log("the xpath of the element is ", xpath[element]);
  var el =  driver.waitForElementByXPath(xpath[element], asserters.isDisplayed, 3000, 20);
  return el.swipe({
          startX: 0,
          startY: 0.5,
          endX: 0,
          endY: 0.2,
          duration: 1600
});
console.log("scroll up the element successfully");
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
}




var swipeLeftFn = function(driver, element, dataSet){
  try{
  console.log("the xpath of the element is ", xpath[element]);
  var el  = driver.waitForElementByXPath(xpath[element], asserters.isDisplayed, 3000, 20);
   return el.swipe({
        startX: 0.9,
        startY: 0.5,
        endX: 0.1,
        endY: 0.5,
        duration: 800
});
console.log("swipe left the element successfully");
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
}




var swipeRightFn = function(driver, element, dataSet){
  try{
  console.log("the xpath of the element is ", xpath[element]);
  var el = driver.waitForElementByXPath(xpath[element], asserters.isDisplayed, 3000, 20);
   return el.swipe({
        startX: 0.1,
        startY: 0.5,
        endX: 0.9,
        endY: 0.5,
        duration: 800
});
console.log("swipe right the element successfully");
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
}




var pinchFn = function (Driver, element, dataSet) {
  try{
  console.log("the xpath of the element is ", xpath[element]);
  var el = driver.waitForElementByXPath(xpath[element], asserters.isDisplayed, 3000, 20);
  return Q.all([
    el.getSize(),
    el.getLocation(),
  ]).then(function (res) {
    var size = res[0];
    var loc = res[1];
    var center = {
      x: loc.x + size.width / 2,
      y: loc.y + size.height / 2
    };
    var a1 = new wd.TouchAction(this);
    a1.press({el: el, x: center.x, y: center.y - 100}).moveTo({el: el}).release();
    var a2 = new wd.TouchAction(this);
    a2.press({el: el, x: center.x, y: center.y + 100}).moveTo({el: el}).release();
    var m = new wd.MultiAction(this);
    m.add(a1, a2);
    return m.perform();
  }.bind(this));
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
};




 var zoomFn = function (driver, element, dataSet) {
   try{
   console.log("the xpath of the element is ", xpath[element]);
   var el = driver.waitForElementByXPath(xpath[element], asserters.isDisplayed, 3000, 20);
   return Q.all([
    this.getWindowSize(),
    this.getLocation(el),
  ]).then(function (res) {
    var size = res[0];
    var loc = res[1];
    var center = {
      x: loc.x + size.width / 2,
      y: loc.y + size.height / 2
    };
    var a1 = new wd.TouchAction(this);
    a1.press({el: el}).moveTo({el: el, x: center.x, y: center.y - 100}).release();
    var a2 = new wd.TouchAction(this);
    a2.press({el: el}).moveTo({el: el, x: center.x, y: center.y + 100}).release();
    var m = new wd.MultiAction(this);
    m.add(a1, a2);
    return m.perform();
  }.bind(this));
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
};




var tapFn = function(driver, element, dataSet){
  try{
  console.log("the xpath of the element is ", xpath[element]);
  var el =  driver.waitForElementByXPath(xpath[element], asserters.isDisplayed, 3000, 20);
  return el.tapElement({
        x: 0.9,
        y: 0.5
});
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
}




var sendKeysFn = function(driver, element, dataSet){
  try{
  console.log("the xpath of the element is ", xpath[element]);
  //var text = "Mohammad Zeeshan"
  var el =  driver.waitForElementByXPath(xpath[element], asserters.isDisplayed, 3000, 20);
  return el.sendKeys(dataSet);
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
}




var launchFn = function(driver, element, dataSet){
  try{
  return driver.launchApp();
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
}




var closeFn = function(driver, element, dataSet){
  try{
    return driver.closeApp();
  }catch(e){
    console.log("action is fail to run");
    drScript.result = "FAIL";
  }
}




var shakeFn = function(driver, element, dataSet){
  try{
  return driver.shake();
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
}




var resetFn = function(driver, element, dataSet){
  try{
  return driver.resetApp();
}catch(e){
  console.log("action is fail to run");
  drScript.result = "FAIL";
}
}




module.exports.methods = {
                  waitTillElementAppear: waitTillElementAppearFn,
                  verify: verifyFn,
                  click: clickFn,
                  quit: quitFn,
                  scrollDown: scrollDownFn,
                  scrollUp: scrollUpFn,
                  swipeLeft: swipeLeftFn,
                  swipeRight: swipeRightFn,
                  pinch: pinchFn,
                  zoom: zoomFn,
                  tap: tapFn,
                  sendKeys: sendKeysFn,
                  launch: launchFn,
                  close: closeFn,
                  shake: shakeFn,
                  reset: resetFn
                }
