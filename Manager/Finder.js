// module.exports = (admin) => {  
//   const find = function(name) {
//     return admin.database().ref('user').orderByChild('ro').equalTo(name).on('value', (snapshot) => {
//       console.log(snapshot.val());
//       let user = snapshot.val();
//       for (var data in user){
//         console.log(data.line);
//       }
//       if(snapshot.exists) {
//         return snapshot.val();
//       } else {
//         return '找無此人'
//       }
//     });
//   };

//   return {
//     find: find
//   };
// };

function Finder(admin) {
  this.find = function(name) {
    return new Promise((resolve, reject) => {
      admin.database().ref('user').orderByChild('ro').equalTo(name).on('value', (snapshot) => {
        if(snapshot.exists) {
          console.log('find');
          let user = snapshot.val();
          if(!user) { resolve('找無此人'); }
          
          for (var data in user){
            if(user[data].line){
              resolve(user[data].line)
            } else {
              resolve('找無此人');    
            }
          }
        } else {
          console.log('no find');
          resolve('找無此人');
        }
      });
    });
  };
}

module.exports = function(admin) {
  return new Finder(admin);
};
