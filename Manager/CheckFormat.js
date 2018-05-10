function FormatChecker() {
  this.checkFormat = function(value) {
    
    if(value.match('法鬥找人 ')!= null) {
        const res = value.replace('法鬥找人 ', '');
        return ['find', res];
    } else if(value.match('法鬥小幫手')!= null) {
        return ['help', ''];
    } else if (value.match('法鬥卡片 ')!= null) {
        const res = value.replace('法鬥卡片 ', '');
        return ['card', res];
    } else {
        return ['unknown', ''];
    }
  };
}

module.exports = function() {
  return new FormatChecker();
};
