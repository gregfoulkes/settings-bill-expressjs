let assert = require("assert");
// let moment = require('moment');
// var moment =
const settingsBills = require('../settings-bill')


// describe('billList return', function() {
//
//   it('should return billList', function() {
//     var settings = settingsBills()
//
//     settings.callSet(4)
//     settings.calculate('call')
//
//     assert.deepEqual(settings.billList(), [
//
//       {
//         type: 'call',
//         date: 'a few seconds',
//         price: 4
//
//       },
//
//     ]);
//   });
// });

describe ('CheckTotal for Settings-Bill', function(){

  it ('Should return a call total of R2.75',function(){
    var settings = settingsBills()

    settings.callSet(2.75),
    settings.calculate('call')

    assert.equal(settings.callGet(), 2.75);
  });

  it ('Should return a sms total of R0.65',function(){
    var settings = settingsBills()


    settings.smsSet(0.65),
    settings.calculate('sms')

    assert.equal(settings.sms(), 0.65);
  });

  it ('Should return a total of R4.05',function(){
    var settings = settingsBills()

    settings.smsSet(0.65);
    settings.callSet(2.75);
    //console.log(settings.smsSet(0.65))
    //console.log(settings.callSet(2.75))

    settings.calculate('sms')
    settings.calculate('sms')
    settings.calculate('call')
    //console.log(settings.calculate('call'))

    //console.log(settings.total())
    assert.equal(settings.total(), 4.05);
  });

  it ('Should return the updated sms value of R0.85',function(){
    var settings = settingsBills()

    settings.smsSet(0.85)

    assert.equal(settings.smsGet(), 0.85);
  });

  it ('Should return the updated call value of R3.20',function(){
    var settings = settingsBills()

    //settings.calculate()
    settings.callSet(3.20)

    assert.equal(settings.callGet(), 3.20);
  });

  it ('Should return the updated warning level of 20',function(){
    var settings = settingsBills()

    settings.updateWarning(20)
    assert.equal(settings.getWarning(), 20);
  });

  it ('Should return the updated critical level of 30',function(){
    var settings = settingsBills()

    settings.updateCritical(30)
    assert.equal(settings.getCritical(), 30);
  });

  it ('Should return the warning warning class',function(){
    var settings = settingsBills()

    //settings.calculate()
    settings.callSet(6);
    settings.updateWarning(5)
    settings.updateCritical(10);

    settings.calculate('call')
    console.log(settings.classAdd())

    assert.equal(settings.classAdd(), 'warning');
  });

  it ('Should return the danger warning class',function(){
    var settings = settingsBills()

    //settings.calculate()
    settings.callSet(6);
    settings.updateWarning(5)

    settings.updateCritical(10);
    settings.calculate('call');
    settings.calculate('call');


console.log(settings.classAdd())

    assert.equal(settings.classAdd(), 'danger');
  });

});
