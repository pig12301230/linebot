const request = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://ro.fws.tw/db/guild/raid';

function EG() {
    this.getEG = function(value) {
        if (!(value == '40' || value == '60' || value == '80')) { return Promise.reject(); }
        return request(url + '/' + value).then((result) => {
            const $ = cheerio.load(result);
            var src = $('img').attr("src");
            const img = 'https://ro.fws.tw' + src;
            return Promise.resolve(img);
        });
    }
}

module.exports = function() {
    return new EG();
};
