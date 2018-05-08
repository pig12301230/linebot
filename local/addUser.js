const FirebaseAdminManager = require('../utils/FirebaseAdminManager');
const logger = require('../utils/logger');
const serviceAccount = require('../credential/linebot-599ec-firebase-adminsdk-o8igq-7878dcce17');
const config = require('./config.dev');

// const serviceAccount = require('../credential/ryze-production-firebase-adminsdk-lbabc-39269f1c19');
// const config = require('./config.ryze-production');
let datas = [['Rick', 'Divea'],
['璃曦', '梅札露娜'],
['小貓', '憶琴'],
['陳麒文', '路邊'],
['Hunk', '感恩吸唬'],
['鋼牙', '郭雪芙我老婆'],
['鄒灰灰', '芯璃'],
['鄒灰灰的老公', 'Cafe'],
['Chris', '人宜'],
['Ben Shih', '愛田友'],
['Eason Lee', 'MAXIN'],
['Vincent', '克瓦托羅'],
['鄭建緯-Green', '仙境傳說歐'],
['閎君(阿達)', '鋼鐵衛士山陸陵'],
['張峰銘', 'SY熏薰靶拔'],
['George Yan', '喬治BOY'],
['May', '小梅弄'],
['按摩師25號', '擊敗頑劣狼'],
['文斐', 'vvball'],
['阿布', '徘徊的臭豆腐'],
['Stilla', '徘徊的麻辣鍋'],
['shiver_tong', '流浪的阿野'],
['蕭慶宏', '乳牛王阿蕭'],
['瑜瑜 m2', '瑜瑜OuO'],
['莊英祺', '法鬥控'],
['鄭小修', '嗚~很棒嘛~'],
['硬', '菜苗苗'],
['Sky', '彩虹冰沙'],
['Nicole', '彤言瞳語'],
['Wei', '惟他命Z'],
['林耕慶', '兩津勘吉慶'],
['Mayarouyin', '馬雅琳'],
['蘇翎清Alan', '蘇以安'],
['William', '側臉比較帥w'],
['Chuiyi', '可可可麗露'],
['許願', '願兒'],
['Larry Lai', 'SherLock'],
['Steve', '再見再見RO'],
['Iceman', '殭屍的冬冬'],
['璧霙', '魔力布丁'],
['李小良', '菜脯雞湯'],
['Stanley', '紫色向日葵'],
['楊墨兔', '墨月涼'],
['肖蓮仔', '女乃女乃木奉'],
['小p', '==喬巴=='],
['Fenn', 'Fenn'],
['珮祺', '抖宅兒'],
['家鋒', '鋒鋒兒'],
['Lin', '提爾克那'],
['└Lin的小姑', '戰阿咕'],
['Daniel', '超級嫩騎士'],
['林晏霆(迪克)', '迪克愛呼呼'],
['豆腐', '豆腐愛皮蛋'],
['李韋佑', '羽鈴冰戀'],
['Yang Kai', '職業射'],
['aforied', '流紜'],
['偉琮', '雪燄冰之築夢'],
['育德', '凱原泉源'],
['Yenchih', '醃製品'],
['Florence', '月之阿提蜜絲'],
['A仔(Andy999)', 'A芽'],
['Poe', '打鐵小公主'],
['虫', 'deacoke'],
['林小T', '村民Max'],
['吳米奇', '結城夏'],
['Cy2', 'X小二x'],
['Waik it Leung', '黯然銷雲'],
['William', '抹茶千層派dex'],
['品璇', '皮婼'],
['銀月', '銀弦之月'],
['orson', 'o歐'],
['氵 㬎月巴 ', '尋夢園聊天室'],
['饅頭', '約翰‧康斯坦汀'],
['義宏(Yihom)&微塵 ', '－微塵－'],
['yu zhi', '口渴就要吸蝸牛奶'],
['黃子軒 ', '紅茶半糖o'],
['政晏Jayden', 'CaJayden'],
['Daniel 陳志達', '雲八能三二風雷剎'],
['Charlie', '火腿蛋餅'],
['ethinhaha', '碰碰嚕拉拉吐'],
['Irene(瑋琳)', 'リンリン'],
['└Irene(瑋琳)男友', 'ひたぎる'],
['佘杰', '夜天使琳琳'],
['Kuan', '逼哩吧啦呼'],
['瑋', '該死的溫柔'],
['YouWei', '一生只愛A罩杯'],
['└YouWei女友', '弗尼利'],
['底線 エディー ', 'エデイ－'],
['聖', '賴可愛']];

const run = (config) => {
  const admin = FirebaseAdminManager.create({
    credential: serviceAccount,
    databaseURL: config.databaseURL
  }).get();

  datas.forEach(data => {
    console.log(data[0]);
    console.log(data[1]);
    let user = {
        ro: data[1],
        line: data[0]
    };
    admin.database().ref('user').push(user);
  });

//   Promise.resolve().then(() => {
//     logger.info('Start rebuilding message index...');
//   }).then(() => {
//     return admin.database().ref('/messageIndex').remove();
//   }).then(() => {
//     return admin.database().ref('/chatrooms').once('value');
//   }).then((snapshot) => {
//     const promises = [];
//     snapshot.forEach((childSnapshot) => {
//       const roomId = childSnapshot.key;
//       promises.push(buildIndex(roomId));
//     });
//     return Promise.all(promises);
//   }).then(() => {
//     logger.info('Start rebuilding message index...done');
//   }).catch((error) => {
//     logger.error('Start rebuilding message index...falied', error);
//   });
};

run(config);
