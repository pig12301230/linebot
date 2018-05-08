function FormatChecker() {
  this.checkFormat = function(value) {
    
    if(value.match('法鬥找人 ')!= null) {
        const res = value.replace('法鬥找人 ', '');
        return ['find', res];
    }
  };
}

module.exports = function() {
  return new FormatChecker();
};
