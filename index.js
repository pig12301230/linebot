const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk/exceptions').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk/exceptions').SignatureValidationFailed

const app = express()

const config = {
  channelAccessToken: 'CUqJIjQanQgplRaH2NkTetFWPzEnziMPszdHsVaoossrkWTB54buwY3mr3FKoNGNoJ6z3ivhbN2lJ7GMNGJgk7gEDUfLMrbt9VUvjO4LIa3LsAjNlIlibG8Gs5ocLiDRsJgMeOyWv59kQuZ775ey+wdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'e8d0654b1811c151a8061f65ca988d62'
}

app.use(middleware(config))

app.post('/webhook', (req, res) => {
  res.json(req.body.events) // req.body will be webhook event object
})

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature);
    return;
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw);
    return;
  }
  next(err); // will throw default 500
})

app.use('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log("port:", app.get('port'));
});
