const packageList = [  
  {
    Version: "1.2.3",
    Name: "Underscore"
  },
  {
    Version: "1.2.3-2.1.0",
    Name: "Lodash"
  },
  {
    Version: "^1.2.3",
    Name: "React"
}];

module.exports = {
    packageList: packageList,
    deletePackages: deletePackages,
    removePackage: removePackage,
    removePackageById: removePackageById
};

//Function to delete all packages in the List
function deletePackages(userList) {
  // Delete all users from the user list
  packageList.splice(0, packageList.length);
}

//Function to remove a package from the package list
function removePackage(name) {
  let i = packageList.length;
  while (i--) {
    if (packageList[i].Name === name) {
      packageList.splice(i, 1);
    }
  }
}

function removePackageById(Id) {
  for (let i = 0; i < packageList.length; i++) {
    if (packageList[i].Id.toLowerCase() === Id.toLowerCase()) {
      packageList.splice(i, 1);
      return;
    }
  }
}

// //Function to add Package to package list
// function addPackage(packageName, packageVersion, packageRating) {
//     const existingPackage = packageList.find(p => p.name === packageName && p.version === packageVersion);

//     if (existingPackage) {
//         return { status: 409, error: 'Package exists already.' };
//     }

//     if (packageRating === 'disqualified') {
//         return { status: 424, error: 'Package is not uploaded due to the disqualified rating.' };
//     }

//     const decoded = jwt.verify(xAuthorization, 'secret');

//     if (!decoded) {
//         return { status: 403, error: 'Authentication failed (e.g. AuthenticationToken invalid or does not exist).' };
//     }

//     if (!packageName || !packageVersion) {
//         return { status: 400, error: 'There is missing field(s) in the PackageData/AuthenticationToken or it is formed improperly.' };
//     }

//     packageList.push({ name: packageName, version: packageVersion, rating: packageRating });
//     return { status: 200, message: 'Package added successfully.' };
// }