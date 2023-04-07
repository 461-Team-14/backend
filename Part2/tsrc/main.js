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
exports.handle_url = exports.ensure_graphQL_fetch = exports.main = void 0;
var parse_links_1 = require("./parse_links");
var package_class_1 = require("./package_class");
var runner_class_1 = require("./runner_class");
var clone_repo_1 = require("./clone_repo");
var parse_links_2 = require("./parse_links");
var parse_links_3 = require("./parse_links");
var logging_1 = require("./logging");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var url, data, log, username, repoName, gitUrl2, package_test, run_test, retval;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = process.argv[2];
                    log = logging_1.provider.getLogger("Main.start");
                    if (!url) {
                        log.debug("URL not provided when running main program\n");
                    }
                    log.info("Running command -> node src/main.js " + url);
                    log.info("Scoring package from: " + url);
                    username = null;
                    repoName = null;
                    gitUrl2 = null;
                    log.info("Parsing repository link...\n");
                    return [4 /*yield*/, handle_url(url)];
                case 1:
                    // Handle the url
                    (_a = _b.sent(), username = _a.username, repoName = _a.repoName, gitUrl2 = _a.url);
                    if (!(username != null && repoName != null && gitUrl2 != null)) return [3 /*break*/, 12];
                    package_test = new package_class_1.Package(gitUrl2, repoName, username, process.env.GITHUB_TOKEN);
                    log.info("Getting info from graphQL query");
                    return [4 /*yield*/, (0, parse_links_1.graphAPIfetch)((0, parse_links_1.gql_query)(username, repoName), package_test)["catch"](function (error) {
                            log.debug("Error with graphAPI query: " + error);
                        })];
                case 2:
                    // Fetch data from graphQL
                    data = _b.sent();
                    // Ensure successful graphQL fetch
                    ensure_graphQL_fetch(data, log);
                    log.info("Successful data collection: " + data);
                    run_test = new runner_class_1.Runner(package_test);
                    log.info("Getting info from cloned repo...");
                    return [4 /*yield*/, (0, clone_repo_1.get_info_from_cloned_repo)(package_test)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, (0, parse_links_2.get_recentCommits)(package_test)];
                case 4:
                    _b.sent();
                    log.info("getting pinned fractions");
                    return [4 /*yield*/, (0, parse_links_3.get_pinned_fraction)(package_test)];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, run_test.calculate_correctness()];
                case 6:
                    _b.sent();
                    log.info("calculating correctness");
                    return [4 /*yield*/, run_test.calculate_responsiveness()];
                case 7:
                    _b.sent();
                    log.info("calculating responsiveness");
                    return [4 /*yield*/, run_test.calculate_ramp()];
                case 8:
                    _b.sent();
                    log.info("calculating ramp-up");
                    return [4 /*yield*/, run_test.calculate_license()];
                case 9:
                    _b.sent();
                    log.info("calculating license");
                    return [4 /*yield*/, run_test.calculate_bus()];
                case 10:
                    _b.sent();
                    log.info("calculating bus factor");
                    return [4 /*yield*/, run_test.calculate_score()];
                case 11:
                    _b.sent();
                    log.info("calculating final score");
                    log.info("Correctness " + run_test.package_instance.correctness);
                    log.info("Ramp-up " + run_test.package_instance.ramp_up);
                    log.info("License Score " + run_test.package_instance.license);
                    log.info("Bus Factor " + run_test.package_instance.bus_factor);
                    log.info("Responsiveness " + run_test.package_instance.responsiveness);
                    log.info("GoodPinningPractice " + run_test.package_instance.pinnedfraction);
                    log.info("Total Score " + run_test.package_instance.score);
                    retval = {
                        URL: url,
                        NET_SCORE: run_test.package_instance.score,
                        RAMP_UP_SCORE: run_test.package_instance.ramp_up,
                        CORRECTNESS_SCORE: run_test.package_instance.correctness,
                        BUS_FACTOR_SCORE: run_test.package_instance.bus_factor,
                        RESPONSIVE_MAINTAINER_SCORE: run_test.package_instance.responsiveness,
                        LICENSE_SCORE: run_test.package_instance.license,
                        GOODPINNING_SCORE: run_test.package_instance.pinnedfraction
                    };
                    console.log(JSON.stringify(retval));
                    return [2 /*return*/, 0];
                case 12:
                    log.debug("Unable to fetch repo -> ".concat(username, "/").concat(repoName));
                    return [2 /*return*/, 1];
            }
        });
    });
}
exports.main = main;
function ensure_graphQL_fetch(data, log) {
    // Prints proper message is graphQL does not fetch properly
    // :param data: data received from graphQL
    // :param log: logger to log results
    // :return: boolean for whether graphQL fetch was successful
    try {
        if (data["message"] == "Bad credentials") {
            log.debug("Bad credentials. Please check your token.");
            return false;
        }
    }
    catch (error) {
        log.debug("GraphQL API call failed with error: " + error);
        return false;
    }
    return true;
}
exports.ensure_graphQL_fetch = ensure_graphQL_fetch;
function handle_url(url) {
    return __awaiter(this, void 0, void 0, function () {
        var username, repoName, gitUrl2, gitUrl, gitRepoDetails, gitRepoDetails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = "";
                    repoName = "";
                    gitUrl2 = url;
                    if (!url.startsWith("https://www.npmjs.com/package/")) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, parse_links_1.npm_2_git)(url)];
                case 1:
                    gitUrl = _a.sent();
                    gitUrl2 = gitUrl.replace("git:", "https:");
                    return [4 /*yield*/, (0, parse_links_1.getGitRepoDetails)(gitUrl)];
                case 2:
                    gitRepoDetails = _a.sent();
                    if (gitRepoDetails) {
                        (username = gitRepoDetails.username, repoName = gitRepoDetails.repoName);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    // handling for GitHub package
                    gitUrl2 = url;
                    return [4 /*yield*/, (0, parse_links_1.getGitRepoDetails)(url)];
                case 4:
                    gitRepoDetails = _a.sent();
                    if (gitRepoDetails) {
                        (username = gitRepoDetails.username, repoName = gitRepoDetails.repoName);
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/, {
                        username: username,
                        repoName: repoName,
                        url: gitUrl2
                    }];
            }
        });
    });
}
exports.handle_url = handle_url;
// Run main conditionally if it is not a module import
if (require.main === module) {
    main();
}
