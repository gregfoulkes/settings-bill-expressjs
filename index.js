let express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
let app = express();

const settingsBills = require('./settings-bill')

var settings = settingsBills()

app.use(express.static('public'));


let PORT = process.env.PORT || 3008;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json())


//handlebars setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//template render
app.get('/', function (req, res) {


  var initialData = {
     callTotal: 0.00,
     smsTotal:0.00,
     theTotal: 0.00
  }
    res.render('settings', initialData);
});

app.get('/reload', function (req, res) {
  settings.reset()
  var callData = {
     callTotal:settings.call(),
     smsTotal: settings.sms(),
     theTotal: settings.total()
  }

    res.render('settings', callData);
});

app.post('/calculate', function (req, res) {
    var billType = req.body.getBillType;
    settings.calculate(billType)

    var callData = {
       callTotal:settings.call(),
       smsTotal: settings.sms(),
       theTotal: settings.total(),
       classAdd: settings.classAdd()
    }

    res.render('settings', callData);
});

app.post('/update', function (req, res) {
    var callValue = req.body.getCallValue;
    var smsValue = req.body.getSmsValue;
    var criticalValue = req.body.getCriticalValue;
    var warningValue = req.body.getWarningValue

    settings.callSet(callValue)
    settings.smsSet(callValue)
    settings.getCritical(criticalValue)
    settings.getWarning(warningValue)

      var callData = {
         callTotal:settings.call(),
         smsTotal: settings.sms(),
         theTotal: settings.total()
      }


res.render('settings', callData);
});
