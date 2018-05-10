
const FirebaseAdminManager = require('../utils/FirebaseAdminManager');
const logger = require('../utils/logger');
const serviceAccount = require('../credential/linebot-599ec-firebase-adminsdk-o8igq-7878dcce17');
const config = require('./config.dev');
const axios = require('axios');

function getCard() {

    const admin = FirebaseAdminManager.create({
        credential: serviceAccount,
        databaseURL: config.databaseURL
      }).get();

    axios.get('https://ro.fws.tw/db/cards/alist?storage=Int&output=json')
    .then(function (response) {
        let cards = response.data;
        cards.forEach(element => {
            console.log(element);
            admin.database().ref(`cards/int/${element.id}`).set(element);
        });
        // console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}

getCard();