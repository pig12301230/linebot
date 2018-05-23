const express = require('express');
const middleware = require('@line/bot-sdk').middleware;
const Client = require('@line/bot-sdk').Client;
const JSONParseError = require('@line/bot-sdk/exceptions').JSONParseError;
const SignatureValidationFailed = require('@line/bot-sdk/exceptions').SignatureValidationFailed;
const admin = require('firebase-admin');
const serviceAccount = require("./credential/linebot-599ec-firebase-adminsdk-o8igq-7878dcce17.json");

const formatChecker = require('./Manager/CheckFormat.js')();
const tower = require('./Manager/Tower.js')();
const eg = require('./Crawler/EG.js')();
const finder = require('./Manager/Finder.js')(admin);
const card = require('./Manager/Card.js')(admin);


const app = express()

const config = {
  channelAccessToken: 'CUqJIjQanQgplRaH2NkTetFWPzEnziMPszdHsVaoossrkWTB54buwY3mr3FKoNGNoJ6z3ivhbN2lJ7GMNGJgk7gEDUfLMrbt9VUvjO4LIa3LsAjNlIlibG8Gs5ocLiDRsJgMeOyWv59kQuZ775ey+wdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'e8d0654b1811c151a8061f65ca988d62'
}

const client = new Client({
  channelAccessToken: 'CUqJIjQanQgplRaH2NkTetFWPzEnziMPszdHsVaoossrkWTB54buwY3mr3FKoNGNoJ6z3ivhbN2lJ7GMNGJgk7gEDUfLMrbt9VUvjO4LIa3LsAjNlIlibG8Gs5ocLiDRsJgMeOyWv59kQuZ775ey+wdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'e8d0654b1811c151a8061f65ca988d62'
});


app.use(middleware(config))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://linebot-599ec.firebaseio.com"
});

app.post('/webhook', (req, res) => {
  res.send("test");
  // res.json(req.body.events) // req.body will be webhook event object
})
app.post('/callback', (req, res) => {

  var events = req.body.events;
  if(!events) { return; }
  events.forEach(function(value, index, arr){

    //reply
    const check = formatChecker.checkFormat(value.message.text); 
    switch(check[0]){
      case 'find':
        return finder.find(check[1]).then((line) => {
          return client.replyMessage(value.replyToken, {
            type: 'text',
            text: line,
          });
        });
        break;
      case 'eg':
        return eg.getEG(check[1]).then((imgUrl) => {
          return client.replyMessage(value.replyToken, {
            type: 'image',
            originalContentUrl: imgUrl,
            previewImageUrl: imgUrl
           });
        }).catch(()=> {
          return client.replyMessage(value.replyToken, {
            type: 'text',
            text: '打得到你打給我看',
          });
        });
        break;
      case 'card':
        return card.find(check[1]).then((card) => {
          return client.replyMessage(value.replyToken, {
            type: 'text',
            text: card,
          });
        });
        break;
      case 'tower':
        return tower.getData(check[1]).then((url) => {
          return client.replyMessage(value.replyToken, {
            type: 'text',
            text: url,
          });
        });
        break;
      case 'help':
        return client.replyMessage(value.replyToken, {
          type: 'text',
          text: '法鬥小幫手   提供以下功能：\n法鬥找人 遊戲ＩＤ,\n法鬥遺跡 40/60/80,\n法鬥卡片 卡片名稱,\n法鬥卡片 atk/matk/hp/int,\n法鬥爬塔 mvp/mini\n'
        });
        break;
      default: return; break;
    }
    if(value.message.text.match('老蕭支援')!= null) {
      return client.replyMessage(value.replyToken, {
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
