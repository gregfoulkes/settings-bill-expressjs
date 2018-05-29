const Moment = require('moment');
var moment = Moment();
module.exports = function() {

  var totalCalls = 0.00;
  var totalSms = 0.00;
  var costTotal = 0.00;

  var callValue = 0.00;
  var smsValue = 0.00;

  var warnLevel = 0;
  var critLevel = 0;

var billList = []

  function callUpdate(value) {
    if(value != ""){
      callValue = parseFloat(value)
    }
  //  return callValue
  }

  function smsUpdate(value) {
    if(value != ''){
      smsValue = parseFloat(value)
    }
  //  return smsValue

  }
  function getCallValue(){
    return callValue.toFixed(2)
  }

  function getSmsValue(){
    return smsValue.toFixed(2)
  }

  function warningLevelUpdate(value) {
    warnLevel = parseFloat(value)
  }



  function criticalLevelUpdate(value) {
    critLevel = parseFloat(value)
  }



  function billItemCalculate(value) {
    var newDate = new Date()
    let bill = {
      type: value,
      date: newDate//moment.fromNow(newDate)
    };

    if(costTotal > critLevel){
      var diff = costTotal - critLevel
      costTotal -= diff
      return
    }

  // if(!totalCalls > 0 && !totalSms > 0){
      if (value === "call") {
        totalCalls += callValue;
        bill.price = callValue;
      } else if (value === "sms") {
        totalSms += smsValue;
        bill.price = smsValue;
      //}

    }

    billList.push(bill)
  }


  function allCalls() {
    return totalCalls.toFixed(2)
  }

  function allSms() {
    return totalSms.toFixed(2)
  }

  function getCriticalLevelUpdate() {
    return critLevel
  }

  function getWarningLevelUpdate() {
    return warnLevel
  }

  function totalFunction() {
    costTotal = totalCalls + totalSms;

    return costTotal.toFixed(2);
  }

  function getBillList(){
    return billList//.filter(item, item.type)
  }

  function addClass() {
    if (costTotal > critLevel) {
      return 'danger'
    } else if (costTotal > warnLevel) {
      return 'warning'
    }


  }

  function totalsReset() {

    totalCalls = 0.00;
    totalSms = 0.00;
    costTotal = 0.00;

    callValue = 0.00;
    smsValue = 0.00;
    warnLevel = 0;
    critLevel = 0;

    billList = []

  }

  function valuesReturn() {
    {
      callValue,
      smsValue,
      warnLevel,
      critLevel
    //  billList = {}

    }

  }

  function filterRecords (type){
    return billList.filter(record => record.type === type)
  }


  return {

    callSet: callUpdate,
    smsSet: smsUpdate,

    callGet: getCallValue,
    smsGet: getSmsValue,



    calculate: billItemCalculate,

    call: allCalls,
    sms: allSms,
    total: totalFunction,
    returnValues:valuesReturn,
    reset: totalsReset,

    updateWarning: warningLevelUpdate,
    updateCritical: criticalLevelUpdate,

    getCritical: getCriticalLevelUpdate,
    getWarning: getWarningLevelUpdate,

    classAdd: addClass,

    billList:getBillList,

    recordFilter:filterRecords,

  }
}
