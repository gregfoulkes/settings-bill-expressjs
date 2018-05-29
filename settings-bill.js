const Moment = require('moment');
var moment = Moment();
module.exports = function() {

  var totalCalls = 0.00;
  var totalSms = 0.00;
  var costTotal = 0.00;

  var callValue = 0.00;
  var smsValue = 0.00;

  var warnLevel = 0.00;
  var critLevel = 0.00;

var billList = []

  function callUpdate(value) {
    if(value != ""){
      callValue = parseFloat(value)
    }
    return callValue
  }

  function smsUpdate(value) {
    if(value != ''){
      smsValue = parseFloat(value)
    }
    return smsValue

  }

  function warningLevelUpdate(value) {
    warnLevel = parseFloat(value)
  //  return warnLevel
  }



  function criticalLevelUpdate(value) {
    critLevel = parseFloat(value)
  //  return critLevel
  }



  function billItemCalculate(value) {
    var newDate = new Date()
    let bill = {
      type: value,
      date: newDate//moment.fromNow(newDate)
    };

  //  if(!totalCalls > 0 && !totalSms > 0){
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
    var costTotal = totalCalls + totalSms;
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
    costTotal = 0.00

  //  billList = {}

  }

  function totalsReturns() {
    {
      totalCalls,
      totalSms,
      costTotal
    //  billList = {}

    }

  }

  function filterRecords (type){
    return billList.filter(record => record.type === type)
  }


  return {

    callSet: callUpdate,
    smsSet: smsUpdate,

    calculate: billItemCalculate,

    call: allCalls,
    sms: allSms,
    total: totalFunction,
    returnTotal:totalsReturns,
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
