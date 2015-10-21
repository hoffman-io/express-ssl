'use strict';

module.exports = function ssl(options) {
  options = options || {};
	var env = process.env.NODE_ENV || 'development';
  var enabled = (env !== 'development' && options.disabled !== true);

  return sslMiddleware;

  function sslMiddleware(req, res, next) {
    if (!enabled) return next();

    var isSecure = req.secure;
    var trustProxy = (process.env.TRUST_PROXY === 'true');

    if (!isSecure && trustProxy) {
      isSecure = req.headers['x-forwarded-proto'] === 'https';
    }

    if (isSecure) {
      return next();
    } else if (options.disallow) {
      return options.disallow(req, res);
    }

    res.status(403)
      .type('text/plain')
      .send('Please use HTTPS when communicating with this server.')
      .end();
  }
};
