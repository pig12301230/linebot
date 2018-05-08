function FirebaseManager(config, customName = '[DEFAULT]') {
  const firebase = require('firebase');
  const app = firebase.initializeApp(config, customName);

  this.get = () => {
    return app;
  };
}

module.exports = (function() {
  const _instances = {};

  function createInstance(config, customName) {
    const manager = new FirebaseManager(config, customName);
    return manager.get();
  }

  return {
    create: function(config, customName = '[DEFAULT]') {
      let app = _instances[customName];
      if (!app) {
        app = createInstance(config, customName);
        _instances[customName] = app;
      }
      return app;
    },
    get: (customName = '[DEFAULT]') => {
      return _instances[customName];
    }
  };
}());
