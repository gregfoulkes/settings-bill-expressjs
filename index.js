let express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
let app = express();

const Moment = require('moment');
//var moment = Moment();

const settingsBills = require('./settings-bill')

var settings = settingsBills()

app.use(express.static('public'));


let PORT = process.env.PORT || 3008;

app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json())


//handlebars setup
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
//var getdate = settings.billList();
  //  var newDate = getdate.date;
  helpers : {
    'changedDate': function() {
  return Moment(this.date).fromNow();
  }
}
}));


app.set('view engine', 'handlebars');


//template render
app.get('/', function(req, res) {


  var callData = {
    callTotal: settings.call(),
    smsTotal: settings.sms(),
    theTotal: settings.total(),
    classAdd: settings.classAdd()

  }

  res.render('settings', callData);
});



app.post('/calculate', function(req, res) {
  var billType = req.body.getBillType;
  settings.calculate(billType)


  res.redirect('/')
});

app.post('/update', function(req, res) {
  var callValue = req.body.getCallValue;
  var smsValue = req.body.getSmsValue;
  var criticalValue = req.body.getCriticalValue;
  var warningValue = req.body.getWarningValue

  settings.callSet(callValue)
  settings.smsSet(smsValue)
  settings.getCritical(criticalValue)
  settings.getWarning(warningValue)

  res.redirect('/')
});

app.get('/bill', function(req, res) {
  var bill = {
    billList: settings.billList()
  }
  console.log(bill)
  res.render('bill', bill)
});

app.get('/bill/:call', function(req, res){

  var filteredCalls = settings.callFilter()

  res.render('bill', {billList:filteredCalls} )

});

app.get('/bill/:sms', function(req, res){

  var filteredSms = settings.smsFilter()

  res.render('bill', {billList:filteredSms} )

});

app.get('/reload', function(req, res) {
  settings.reset()
  var callData = {
    callTotal: settings.call(),
    smsTotal: settings.sms(),
    theTotal: settings.total()
  }
  res.render('settings', callData);

});
