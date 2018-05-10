function Card(admin) {
    this.find = function(name) {
      return new Promise((resolve, reject) => {
        switch (name) {
            case 'int': 
                admin.database().ref('cards/int').orderByChild('name').on('value', (snapshot) => {
                    if(snapshot.exists) {
                        let cards = snapshot.val();
                        if(!cards) { resolve('找無卡片'); }
                        var cardRes = '';
                        for (var data in cards){
                            cardRes += cards[data].name + '\n';
                        }
                        let res = '包含 Int的卡片有以下：\n' + cardRes;
                        resolve(res); 
                    } else {
                    resolve('找無卡片');
                    }
                });
                break;
            case 'hp':
                admin.database().ref('cards/hp').orderByChild('name').on('value', (snapshot) => {
                    if(snapshot.exists) {
                        let cards = snapshot.val();
                        if(!cards) { resolve('找無卡片'); }
                        var cardRes = '';
                        for (var data in cards){
                            cardRes += cards[data].name + '\n';
                        }
                        let res = '包含 物攻的卡片有以下：\n' + cardRes;
                        resolve(res); 
                    } else {
                    resolve('找無卡片');
                    }
                });
                break;
            case 'atk': 
                admin.database().ref('cards/atk').orderByChild('name').on('value', (snapshot) => {
                    if(snapshot.exists) {
                        let cards = snapshot.val();
                        if(!cards) { resolve('找無卡片'); }
                        var cardRes = '';
                        for (var data in cards){
                            cardRes += cards[data].name + '\n';
                        }
                        let res = '包含 物攻的卡片有以下：\n' + cardRes;
                        resolve(res); 
                    } else {
                    resolve('找無卡片');
                    }
                });
                break;
            case 'matk': 
                admin.database().ref('cards/matk').orderByChild('name').on('value', (snapshot) => {
                    if(snapshot.exists) {
                        let cards = snapshot.val();
                        if(!cards) { resolve('找無卡片'); }
                        var cardRes = '';
                        for (var data in cards){
                            cardRes += cards[data].name + '\n';
                        }
                        let res = '包含 魔攻的卡片有以下：\n' + cardRes;
                        resolve(res); 
                    } else {
                    resolve('找無卡片');
                    }
                });
                break;
            default: 
                admin.database().ref('cards/all').orderByChild('name').equalTo(name).on('value', (snapshot) => {
                    if(snapshot.exists) {
                    let card = snapshot.val();
                    if(!card) { resolve('找無卡片'); }
                    
                    for (var data in card){
                        if(card[data]){
                            let buffs = card[data].buff;
                            let buffRes = ''
                            for (var buff in buffs) {
                                buffRes += buffs[buff] + '\n'
                            }
                            let res = card[data].name + `(${card[data].color})\n` + `裝備位置： ${card[data].position}\n` + `裝備效果： \n ${buffRes}\n`+ `存入效果： ${card[data].storageReward}\n` + `解鎖效果： ${card[data].unlockReward}\n`
                        resolve(res)
                        } else {
                        resolve('找無卡片');    
                        }
                    }
                    } else {
                    resolve('找無卡片');
                    }
                });
                break;
        }
      });
    };
  }
  
  module.exports = function(admin) {
    return new Card(admin);
  };
  