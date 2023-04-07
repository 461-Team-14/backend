'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService.js');

let xAuthorization = '';

module.exports.CreateAuthToken = function createAuthToken (req, res, next, body) {
  Default.createAuthToken(body)
    .then(function (response) {
      res.setHeader('X-Authorization', response.token);
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.status || 500, response);
    });
};

module.exports.packageByNameDelete = function packageByNameDelete (req, res, next, name, xAuthorization) {
  xAuthorization = req.headers['x-authorization']; // Assign token from request header to global variable
  Default.packageByNameDelete(name, xAuthorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.packageByNameGet = function packageByNameGet (req, res, next, name, xAuthorization) {
  xAuthorization = req.headers['x-authorization']; // Assign token from request header to global variable
  Default.packageByNameGet(name, xAuthorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.packageByRegExGet = function packageByRegExGet (req, res, next, body, regex, xAuthorization) {
  xAuthorization = req.headers['x-authorization']; // Assign token from request header to global variable
  Default.packageByRegExGet(body, regex, xAuthorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.PackageCreate = function packageCreate (req, res, next, body, xAuthorization) {
  xAuthorization = req.headers['x-authorization']; // Assign token from request header to global variable
  Default.packageCreate(body, xAuthorization)
    .then(function (response) {
      res.status(201).json(response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.status || 500, response);
    });
};

module.exports.packageDelete = function packageDelete (req, res, next, id, xAuthorization) {
  xAuthorization = req.headers['x-authorization']; // Assign token from request header to global variable
  Default.packageDelete(id, xAuthorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.packageRate = function packageRate (req, res, next, id, xAuthorization) {
  xAuthorization = req.headers['x-authorization']; // Assign token from request header to global variable
  Default.packageRate(id, xAuthorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.packageRetrieve = function packageRetrieve (req, res, next, id, xAuthorization) {
  xAuthorization = req.headers['x-authorization']; // Assign token from request header to global variable
  Default.packageRetrieve(id, xAuthorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.packageUpdate = function packageUpdate (req, res, next, body, id, xAuthorization) {
  xAuthorization = req.headers['x-authorization']; // Assign token from request header to global variable
  Default.packageUpdate(body, id, xAuthorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.PackagesList = function packagesList (req, res, next, body, offset, xAuthorization) {
  xAuthorization = req.headers['x-authorization']; // Assign token from request header to global variable
  Default.packagesList(body, offset, xAuthorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.status || 500, response);
    });
};

module.exports.RegistryReset = function registryReset (req, res, next) {
  xAuthorization = req.headers['x-authorization']; // Assign token from request header to global variable
  Default.registryReset(xAuthorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.status || 500, response);
    });
};
