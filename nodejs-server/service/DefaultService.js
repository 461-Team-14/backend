'use strict';
const jwt = require('jsonwebtoken');
const UserHandler = require('./UserHandler');
const PackageHandler = require('./PackageHandler');

/**
 * Create an access token.
 *
 * body AuthenticationRequest 
 * returns AuthenticationToken
 **/
exports.createAuthToken = function(body) {
  return new Promise(function(resolve, reject) {
    if (!body || !body.User || !body.Secret || !body.User.name || !body.Secret.password) {
      reject({ status: 400, error: 'AuthenticationRequest is missing field(s) or is formed improperly.' });
      return;
    }

    const { name, isAdmin } = body.User;
    const { password } = body.Secret;

    const user = UserHandler.userList.find(u => u.name === name && u.password === password);
    if (!user) {
      const addUserResult = UserHandler.addUser(name, isAdmin, password);
      switch(addUserResult) {
        case -1:
          reject({ status: 400, error: 'AuthenticationRequest is missing field(s) or is formed improperly.' });
          break;
        case -2:
          reject({ status: 401, error: 'The user or password is invalid.' });
          break;
        case 1:
          const existingUser = UserHandler.userList.find(u => u.name === name && u.password === password);
          if (existingUser.token) {
            resolve({ token: existingUser.token });
          } else {
            const token = jwt.sign({ name, isAdmin }, 'secret');
            existingUser.token = token;
            resolve({ token });
          }
          break;
      }
    } else {
      const existingUser = UserHandler.userList.find(u => u.name === name && u.password === password);
      if (existingUser.token) {
        resolve({ token: existingUser.token });
      } else {
        const token = jwt.sign({ name, isAdmin }, 'secret');
        existingUser.token = token;
        resolve({ token });
      }
    }
  });
}

/**
 * Delete all versions of this package.
 *
 * name PackageName 
 * xAuthorization AuthenticationToken  (optional)
 * no response value expected for this operation
 **/
exports.packageByNameDelete = function(name,xAuthorization) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Return the history of this package (all versions).
 *
 * name PackageName 
 * xAuthorization AuthenticationToken  (optional)
 * returns List
 **/
exports.packageByNameGet = function(name,xAuthorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "Action" : "CREATE",
  "User" : {
    "name" : "Alfalfa",
    "isAdmin" : true
  },
  "PackageMetadata" : {
    "Version" : "1.2.3",
    "ID" : "ID",
    "Name" : "Name"
  },
  "Date" : "2023-03-23T23:11:15Z"
}, {
  "Action" : "CREATE",
  "User" : {
    "name" : "Alfalfa",
    "isAdmin" : true
  },
  "PackageMetadata" : {
    "Version" : "1.2.3",
    "ID" : "ID",
    "Name" : "Name"
  },
  "Date" : "2023-03-23T23:11:15Z"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get any packages fitting the regular expression.
 * Search for a package using regular expression over package names and READMEs. This is similar to search by name.
 *
 * body String 
 * regex PackageRegEx 
 * xAuthorization AuthenticationToken  (optional)
 * returns List
 **/
exports.packageByRegExGet = function(body,regex,xAuthorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "Version" : "1.2.3",
  "ID" : "ID",
  "Name" : "Name"
}, {
  "Version" : "1.2.3",
  "ID" : "ID",
  "Name" : "Name"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * body PackageData 
 * xAuthorization AuthenticationToken 
 * returns Package
 **/
exports.packageCreate = function(body, xAuthorization) {
  return new Promise(function(resolve, reject) {

    //Validate inputs
    if (!body || !body.Content || !body.JSProgram || !body.URL) {
      reject({ status: 400, error: 'There is missing field(s) in the PackageData/AuthenticationToken or it is formed improperly.' });
      return;
    }

    try {
      let decoded = jwt.verify(xAuthorization, 'secret');
      const user = UserHandler.userList.find(u => u.name === decoded.name && u.token === xAuthorization);
      if (!user) {
        //Only create package if user exists
        reject({ status: 401, error: 'Authentication failed (e.g. AuthenticationToken invalid or does not exist)' });
        return;
      }

      //Check if the package exists

      /*IMPLEMENT LATER*/

      // if (PackageHandler.packageList.includes(packageData.packageName)) {
      //   reject({ status: 409, error: 'Package exists already.' });
      //   return;
      // }

      //add the package to the list
      //CALL FUNCTION
      //PackageHandler.packageList.push(packageData.packageName);

      // Construct the Package object
      const packageObj = {
        metadata: {
          Version: "1.0.0",
          ID: "underscore",
          Name: "Underscore",
          },
        data: {
          Content: body.Content,
          JSProgram: body.JSProgram,
          URL: body.URL,
        },
      };

    // Return the Package object with status 201
    resolve({ packageObj });

    } catch (err) {
      reject({ status: 400, error: 'Authentication failed (e.g. AuthenticationToken invalid or does not exist)' });
      return;
    }
  });
}


/**
 * Delete this version of the package.
 *
 * id PackageID Package ID
 * xAuthorization AuthenticationToken  (optional)
 * no response value expected for this operation
 **/
exports.packageDelete = function(id,xAuthorization) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * id PackageID 
 * xAuthorization AuthenticationToken  (optional)
 * returns PackageRating
 **/
exports.packageRate = function(id,xAuthorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "GoodPinningPractice" : 2.3021358869347655,
  "ResponsiveMaintainer" : 5.962133916683182,
  "LicenseScore" : 5.637376656633329,
  "RampUp" : 1.4658129805029452,
  "BusFactor" : 0.8008281904610115,
  "Correctness" : 6.027456183070403
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Interact with the package with this ID
 * Return this package.
 *
 * id PackageID ID of package to fetch
 * xAuthorization AuthenticationToken  (optional)
 * returns Package
 **/
exports.packageRetrieve = function(id,xAuthorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "metadata" : {
    "Version" : "1.2.3",
    "ID" : "ID",
    "Name" : "Name"
  },
  "data" : {
    "Content" : "Content",
    "JSProgram" : "JSProgram",
    "URL" : "URL"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update this content of the package.
 * The name, version, and ID must match.  The package contents (from PackageData) will replace the previous contents.
 *
 * body Package 
 * id PackageID 
 * xAuthorization AuthenticationToken  (optional)
 * no response value expected for this operation
 **/
exports.packageUpdate = function(body,id,xAuthorization) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get the packages from the registry.
 * Get any packages fitting the query. Search for packages satisfying the indicated query.  If you want to enumerate all packages, provide an array with a single PackageQuery whose name is \"*\".  The response is paginated; the response header includes the offset to use in the next query.
 *
 * body List 
 * offset EnumerateOffset Provide this for pagination. If not provided, returns the first page of results. (optional)
 * xAuthorization AuthenticationToken  (optional)
 * returns List
 **/
exports.packagesList = function(body,offset,xAuthorization) {
  return new Promise(function(resolve, reject) {

    //Parse the body and extract the package queries
    const queries = body.map((query) => ({
      name: query.Name,
      version: query.Version,
    }));

    var examples = {};
    examples['application/json'] = [ {
      "Version" : "1.2.3",
      "ID" : "ID",
      "Name" : "Name"
    }, {
      "Version" : "1.2.3",
      "ID" : "ID",
      "Name" : "Name"
    } ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Reset the registry
 * Reset the registry to a system default state.
 *
 * xAuthorization AuthenticationToken  (optional)
 * no response value expected for this operation
 **/
exports.registryReset = function(xAuthorization) {
  return new Promise(function(resolve, reject) {
    // Check if xAuthorization is present and valid
    if (!xAuthorization) {
      reject({ status: 400, error: 'There is missing field(s) in the AuthenticationToken or it is formed improperly.' });
      return;
    }

    try {
      let decoded = jwt.verify(xAuthorization, 'secret');
      const user = UserHandler.userList.find(u => u.name === decoded.name && u.token === xAuthorization);
      if (!user || !user.isAdmin) {
        //Only reset registry if user exists and is an admin
        reject({ status: 401, error: 'You do not have permission to reset the registry.' });
        return;
      }

      //Delete all users from the user list
      UserHandler.deleteUsers(UserHandler.userList);
      resolve({status: 201, packageObj});
    } catch (err) {
      reject({ status: 400, error: 'There is missing field(s) in the AuthenticationToken or it is formed improperly.' });
      return;
    }
  });
};