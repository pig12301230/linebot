const express = require('express');
const middleware = require('@line/bot-sdk').middleware;
const Client = require('@line/bot-sdk').Client;
const JSONParseError = require('@line/bot-sdk/exceptions').JSONParseError;
const SignatureValidationFailed = require('@line/bot-sdk/exceptions').SignatureValidationFailed;

const app = express()
var a = 0;
const config = {
  channelAccessToken: 'CUqJIjQanQgplRaH2NkTetFWPzEnziMPszdHsVaoossrkWTB54buwY3mr3FKoNGNoJ6z3ivhbN2lJ7GMNGJgk7gEDUfLMrbt9VUvjO4LIa3LsAjNlIlibG8Gs5ocLiDRsJgMeOyWv59kQuZ775ey+wdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'e8d0654b1811c151a8061f65ca988d62'
}

const client = new Client({
  channelAccessToken: 'CUqJIjQanQgplRaH2NkTetFWPzEnziMPszdHsVaoossrkWTB54buwY3mr3FKoNGNoJ6z3ivhbN2lJ7GMNGJgk7gEDUfLMrbt9VUvjO4LIa3LsAjNlIlibG8Gs5ocLiDRsJgMeOyWv59kQuZ775ey+wdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'e8d0654b1811c151a8061f65ca988d62'
});


app.use(middleware(config))

app.post('/webhook', (req, res) => {
  res.send("test");
  // res.json(req.body.events) // req.body will be webhook event object
})
app.post('/callback', (req, res) => {
  // res.send("test");
  a++;
  // res.json(req.body.events); // req.body will be webhook event object
  var events = req.body.events;
  events.forEach(function(value, index, arr){
    // if(value.message.text.match('法')!=null && value.message.text.match('鬥')!= null ){
    //   client.replyMessage(value.replyToken, {
    //     type: 'text',
    //     text: '法鬥 是個才華洋溢有為的青年',
    //   });
    // }
    if(value.message.text.match('老蕭支援')!= null) {
      client.replyMessage(value.replyToken, {
        type: 'image',
        originalContentUrl: 'https://firebasestorage.googleapis.com/v0/b/mcdonalds-84822.appspot.com/o/S__38461494.jpg?alt=media&token=aaca0c42-cb1d-4b41-96b7-6548c1b594aa',
        previewImageUrl: 'https://firebasestorage.googleapis.com/v0/b/mcdonalds-84822.appspot.com/o/S__38461494.jpg?alt=media&token=aaca0c42-cb1d-4b41-96b7-6548c1b594aa'
       });
    }
    // else {
      // client.replyMessage(value.replyToken, {
      //   type: 'text',
      //   text: value.message.text,
      // });
      console.log(value.message.text);
    // }
  })
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

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
