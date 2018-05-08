function FirebaseAdminManager(config, customName = '[DEFAULT]') {
  const admin = require('firebase-admin');

  const adminConfig = config;
  adminConfig.credential = admin.credential.cert(adminConfig.credential);

  const app = admin.initializeApp(adminConfig, customName);

  this.get = () => {
    return app;
  };
}

module.exports = (function() {
  const _instances = {};

  function createInstance(config, customName) {
    const app = new FirebaseAdminManager(config, customName);
    return app;
  }

  return {
    create: function(config, customName = '[DEFAULT]') {
      let app = _instances[customName];
      if (!app) {
        app = createInstance(config, customName);
        _instances[customName] = app;
      }
      return app;
    }
  };
}());
