let assert = require("assert");
// let moment = require('moment');
// var moment =
const settingsBills = require('../settings-bill')

var settings = settingsBills()

describe('billList return', function() {
//  var callFunction = ShoeCatalogueFunction()

  it('should return billList', function() {

    settings.callSet(4)
    settings.calculate('call')

    assert.deepEqual(settings.billList(), [

      {
        type: 'call',
        date: 'a few seconds',
        price: 4
,
      },

    ]);
  });
});
