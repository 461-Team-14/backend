"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.gql_query = exports.get_pinned_fraction = exports.get_recentCommits = exports.graphAPIfetch = exports.getGitRepoDetails = exports.npm_2_git = void 0;
var axios_1 = require("axios");
var MAX_RETRIES = 1;
var isGitHubUrl = require("is-github-url");
var semver = require('semver');
var octokit_1 = require("octokit");
var Octokit = octokit_1.Octokit;
var logging_1 = require("./logging");
// GraphQL query to get the number of commits in the last year
var octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    userAgent: "using apis",
    timeZone: "Eastern",
    baseUrl: "https://api.github.com"
});
function npm_2_git(npmUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var log, packageName, retries, response, packageInfo, new_url, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log = logging_1.provider.getLogger("URLParse.npm_2_git");
                    packageName = npmUrl.split("/").pop();
                    retries = 0;
                    _a.label = 1;
                case 1:
                    if (!(retries < MAX_RETRIES)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    log.info("Converting npm link (" + npmUrl + ") to GitHub link...");
                    return [4 /*yield*/, axios_1["default"].get("https://registry.npmjs.org/".concat(packageName))];
                case 3:
                    response = _a.sent();
                    packageInfo = response.data;
                    // check if package has repository
                    if (!packageInfo.repository) {
                        log.debug("No repository found for package: ".concat(packageName));
                        return [2 /*return*/, Promise.resolve("")];
                    }
                    new_url = packageInfo.repository.url;
                    // Convert ssh to https url
                    if (new_url.startsWith("git+ssh://git@github.com")) {
                        new_url = new_url.replace("git+ssh://git@github.com", "git://github.com");
                        log.info("Converted npm link to " + new_url);
                        return [2 /*return*/, new_url];
                    }
                    // check if repository is on github
                    if (isGitHubUrl(packageInfo.repository.url)) {
                        return [2 /*return*/, packageInfo.repository.url.replace("git+https", "git")];
                    }
                    else {
                        log.debug("Repository of package: ".concat(packageName, " is not on GitHub"));
                        return [2 /*return*/, Promise.resolve("")];
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    // Error in getting GitHub url
                    log.debug("Received error: " + error_1);
                    if (error_1.response && error_1.response.status === 404) {
                        log.debug("Package not found: ".concat(packageName));
                        return [2 /*return*/, Promise.resolve("")];
                    }
                    else if (error_1.response && error_1.response.status === 429) {
                        log.debug("Rate limit exceeded: ".concat(error_1.response.headers["Retry-After"], " seconds"));
                        return [2 /*return*/, Promise.resolve("")];
                    }
                    else if (error_1.code === "ECONNREFUSED") {
                        log.debug("Error: ".concat(error_1.code, ". Retrying..."));
                        retries++;
                        return [3 /*break*/, 1];
                    }
                    else {
                        log.debug("Respository of package: " + packageName + " is not on GitHub");
                        return [2 /*return*/, Promise.resolve("")];
                    }
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 1];
                case 6:
                    log.debug("Error: Maximum retries exceeded for package: ".concat(packageName));
                    return [2 /*return*/, Promise.resolve("")];
            }
        });
    });
}
exports.npm_2_git = npm_2_git;
function getGitRepoDetails(url) {
    return __awaiter(this, void 0, void 0, function () {
        var log, match, repoName, username;
        return __generator(this, function (_a) {
            log = logging_1.provider.getLogger("URLParse.getGitRepoDetails");
            log.info("Getting info from GitHub link...");
            if (url.startsWith("git:")) {
                // Parse ssh gitHub link
                match = url.match(/git:\/\/github\.com\/([^\/]+)\/([^\/]+)\.git/);
            }
            else {
                // Parse https github link
                match = url.match(/(?:https:\/\/github\.com\/)([^\/]+)\/([^\/]+)(?:\/|$)/);
            }
            // Assign username and repoName from URL regex
            if (match) {
                repoName = match[2];
                username = match[1];
                log.info("getGitRepoDetails returns ".concat(username, "/").concat(repoName));
                return [2 /*return*/, { username: username, repoName: repoName }];
            }
            log.debug("getGitRepoDetails returns Null; Nothing matched\n");
            return [2 /*return*/, null];
        });
    });
}
exports.getGitRepoDetails = getGitRepoDetails;
function graphAPIfetch(gql_query, package_test) {
    return __awaiter(this, void 0, void 0, function () {
        var log, response, data, data2, data3, packageJson, versionString, version, devDependencies, key, match, versionString_1, _a, major, minor, patch, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    log = logging_1.provider.getLogger("GraphQL.graphAPIfetch");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    // Fetch the GraphQL API
                    log.info("Getting graphQL response...");
                    return [4 /*yield*/, fetch("https://api.github.com/graphql", {
                            method: "POST",
                            headers: {
                                Authorization: "Token ".concat(process.env.GITHUB_TOKEN)
                            },
                            body: JSON.stringify({ query: gql_query })
                        })];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.sent();
                    log.info("Data acquired from graphQL: " + data);
                    data2 = JSON.stringify(data);
                    data3 = JSON.parse(data2);
                    package_test.num_dev = data3.data.repository.assignableUsers.totalCount;
                    packageJson = JSON.parse(data3.data.repository.object.text);
                    versionString = packageJson.version.match(/^\d+\.\d+\.\d+/);
                    version = {
                        major: parseInt(versionString[0].split(".")[0]),
                        minor: parseInt(versionString[0].split(".")[1]),
                        patch: parseInt(versionString[0].split(".")[2])
                    };
                    devDependencies = {};
                    for (key in packageJson.devDependencies) {
                        match = packageJson.devDependencies[key].match(/^~?\^?\d+\.\d+\.\d+(-\w+\.\d+)?/);
                        if (match) {
                            versionString_1 = match[0].replace(/^~?\^/, '');
                            _a = versionString_1.split('.').map(Number), major = _a[0], minor = _a[1], patch = _a[2];
                            devDependencies[key] = {
                                major: parseInt(major),
                                minor: parseInt(minor),
                                patch: parseInt(patch)
                            };
                        }
                    }
                    package_test.version = version;
                    package_test.devDependencies = devDependencies;
                    // Check if the repo has issues enabled
                    if (data3.data.repository.hasIssuesEnabled == true) {
                        // If so, get the number of open issues
                        package_test.issues_active = data3.data.repository.open_issues.totalCount;
                        package_test.issues = data3.data.repository.issues.totalCount;
                    }
                    else {
                        // If not, set the number of open issues to -1
                        package_test.issues_active = -1;
                        package_test.issues = -1;
                    }
                    // Get data about the package
                    if (data3.data.repository.defaultBranchRef.target.history.totalCount) {
                        package_test.total_commits =
                            data3.data.repository.defaultBranchRef.target.history.totalCount;
                    }
                    else {
                        package_test.total_commits = 0;
                    }
                    if (data3.data.repository.pullRequests.totalCount) {
                        package_test.pr_count = data3.data.repository.pullRequests.totalCount;
                    }
                    else {
                        package_test.pr_count = 0;
                    }
                    if (data3.data.repository.last_pushed_at != null) {
                        package_test.last_pushed_at = data3.data.repository.last_pushed_at;
                    }
                    if (data3.data.repository.stargazerCount != null) {
                        package_test.num_stars = data3.data.repository.stargazerCount;
                    }
                    else {
                        package_test.num_stars = 0;
                    }
                    if (data3.data.repository.licenseInfo != null) {
                        package_test.license_name = data3.data.repository.licenseInfo.name;
                    }
                    else {
                        package_test.license_name = "no name";
                    }
                    return [2 /*return*/, data];
                case 4:
                    error_2 = _b.sent();
                    log.debug("graphQL API failed with error: " + error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.graphAPIfetch = graphAPIfetch;
function get_recentCommits(package_instance) {
    return __awaiter(this, void 0, void 0, function () {
        var count, page, per_page, commitsRemaining, recent, sincedate, log, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    count = 0;
                    page = 1;
                    per_page = 30;
                    commitsRemaining = true;
                    recent = new Date();
                    recent.setMonth(recent.getMonth() - 3);
                    sincedate = "".concat(recent.getFullYear(), "-").concat(recent.getMonth(), "-").concat(recent.getDay());
                    log = logging_1.provider.getLogger("REST.get_recentCommits");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    log.info("Entering while loop to get recent commits");
                    _a.label = 2;
                case 2:
                    if (!commitsRemaining) return [3 /*break*/, 4];
                    log.info("Getting recent commits");
                    return [4 /*yield*/, octokit.request("GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,page,per_page}", {
                            owner: package_instance.owner,
                            repo: package_instance.repo,
                            since: sincedate,
                            page: page,
                            per_page: per_page
                        })];
                case 3:
                    result = _a.sent();
                    count += result.data.length;
                    if (result.data.length < per_page) {
                        commitsRemaining = false;
                    }
                    else {
                        page++;
                    }
                    return [3 /*break*/, 2];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    log.debug("Could not find repository commit counts. Received error: " + error_3);
                    return [3 /*break*/, 6];
                case 6:
                    log.info("Found commit count of " + count);
                    package_instance.commit_count = count;
                    return [2 /*return*/];
            }
        });
    });
}
exports.get_recentCommits = get_recentCommits;
function get_pinned_fraction(package_instance) {
    return __awaiter(this, void 0, void 0, function () {
        var log, dependencies, pinned, total, versionRegex, key, version, match, major, minor, versionRange, satisfies, fraction;
        return __generator(this, function (_a) {
            log = logging_1.provider.getLogger("REST.get_pinned_fraction");
            try {
                dependencies = package_instance.devDependencies;
                if (!dependencies || Object.keys(dependencies).length === 0) {
                    package_instance.pinnedfraction = 1.0;
                    log.info("No dependencies, setting pinned fraction to 1.0");
                    return [2 /*return*/];
                }
                pinned = 0;
                total = 0;
                versionRegex = /^(\d+)\.(\d+)\..*$/;
                for (key in dependencies) {
                    version = dependencies[key];
                    total++;
                    match = versionRegex.exec("".concat(version.major, ".").concat(version.minor, ".0"));
                    if (match) {
                        major = match[1];
                        minor = match[2];
                        versionRange = "~".concat(major, ".").concat(minor, ".0");
                        satisfies = semver.satisfies("".concat(major, ".").concat(minor, ".0"), versionRange);
                        if (satisfies) {
                            pinned++;
                        }
                    }
                    else {
                        log.warn("Invalid version format: ".concat(version.major, ".").concat(version.minor, ".").concat(version.patch));
                    }
                }
                fraction = total > 0 ? pinned / total : 0.0;
                package_instance.pinnedfraction = parseFloat(fraction.toFixed(2));
                log.info("Got pinned fraction of ".concat(package_instance.pinnedfraction));
            }
            catch (error) {
                log.debug("Could not get pinned fraction. Received error: " + error);
            }
            return [2 /*return*/];
        });
    });
}
exports.get_pinned_fraction = get_pinned_fraction;
function gql_query(username, repo) {
    // Query to be passed to graphQL
    // :param username: GitHub username of repository owner
    // :param repo: repository name of GitHub repo
    return "\n  {\n    repository(owner: \"".concat(username, "\", name: \"").concat(repo, "\") {\n      name\n      forkCount\n      licenseInfo {\n        name\n      }\n      assignableUsers {\n        totalCount\n      }\n      sshUrl\n      latestRelease {\n        tagName\n      }\n      hasIssuesEnabled\n      issues {\n        totalCount\n      }\n      open_issues: issues(states: OPEN) {\n        totalCount\n      }\n      defaultBranchRef {\n        target {\n          ... on Commit {\n            history {\n              totalCount\n            }\n          }\n        }\n      }\n      pullRequests {\n        totalCount\n      }\n      \n      last_pushed_at: pushedAt\n      \n      stargazerCount\n      hasVulnerabilityAlertsEnabled\n      \n      object(expression: \"HEAD:package.json\") {\n        ... on Blob {\n          text\n        }\n      }\n    }\n  }\n  ");
}
exports.gql_query = gql_query;
