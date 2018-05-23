function Tower() {
    this.getData = function(type) {
      return new Promise((resolve, reject) => {
        switch (type) {
            case 'mvp': 
                resolve('https://ro.fws.tw/db/endless/tower/mvp');
                break;
            case 'mini':
                resolve('https://ro.fws.tw/db/endless/tower/mini');
                break;
            default: 
                resolve('https://ro.fws.tw/db/endless/tower/all');
                break;
        }
      });
    };
  }
  
  module.exports = function() {
    return new Tower();
  };
  