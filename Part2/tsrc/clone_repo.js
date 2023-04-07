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
exports.create_git_object = exports.clone_repo = exports.get_readme_path = exports.has_license_file = exports.get_readme_length = exports.get_percentage_comments = exports.delete_repo = exports.has_license_in_readme = exports.read_readme = exports.has_license_in_package_json = exports.has_correct_license_in_readme = exports.get_info_from_cloned_repo = void 0;
// File for functions to get information from cloned repo
var fs = require("fs");
var path = require("path");
var cp = require("child_process");
var simple_git_1 = require("simple-git");
var fs_extra_1 = require("fs-extra");
var logging_1 = require("./logging");
function create_git_object(repo_name, path_to_repo) {
    return __awaiter(this, void 0, void 0, function () {
        var log, repo_base_dir, options, git;
        return __generator(this, function (_a) {
            log = logging_1.provider.getLogger("Cloned.create_git_object");
            if (!path_to_repo) {
                // If no path_to_repo provided, assume current working directory
                path_to_repo = process.cwd();
            }
            repo_base_dir = path.join(path_to_repo, repo_name);
            if (!fs.existsSync(repo_base_dir)) {
                fs.mkdirSync(repo_base_dir);
                log.info("Created repository directory\n");
            }
            else {
                (0, fs_extra_1.emptyDirSync)(repo_base_dir);
                log.info("Emptied existing repository directory\n");
            }
            options = {
                baseDir: repo_base_dir,
                binary: "git",
                maxConcurrentProcesses: 6,
                trimmed: false
            };
            git = (0, simple_git_1["default"])(options);
            if (git) {
                log.info("Successfully created git object\n");
            }
            else {
                log.debug("Git object was not properly created\n");
            }
            return [2 /*return*/, git];
        });
    });
}
exports.create_git_object = create_git_object;
function clone_repo(repo_url, repo_base_dir, git) {
    return __awaiter(this, void 0, void 0, function () {
        var log;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log = logging_1.provider.getLogger("Cloned.clone_repo");
                    (0, fs_extra_1.emptyDirSync)(repo_base_dir);
                    log.info("Cloning repo...");
                    // Clone repo
                    return [4 /*yield*/, git.clone(repo_url, repo_base_dir, {
                        //Options go here
                        }, function (err, data) {
                            if (err)
                                log.debug("Error when cloning from " + repo_url + ": " + err + "\n");
                            if (data)
                                log.info("Data from cloning from " + repo_url + "\n");
                        })];
                case 1:
                    // Clone repo
                    _a.sent();
                    log.info("Successfully cloned repo");
                    return [2 /*return*/];
            }
        });
    });
}
exports.clone_repo = clone_repo;
function get_readme_path(repo_base_dir) {
    // Get the path of a readme in a repo
    // :param repo_base_dir: base directory of repo
    // :return: string of repo readme
    var log = logging_1.provider.getLogger("Cloned.get_readme_path");
    var file_path = "";
    // match readme
    var readme_search = /[Rr][Ee][Aa][Dd][Mm][Ee]\..+/;
    var files = fs.readdirSync(repo_base_dir);
    files.forEach(function (element) {
        if (element.search(readme_search) != -1) {
            file_path = path.join(repo_base_dir, element);
            log.info("Found readme file for repository: " + file_path + "\n");
            return file_path;
        }
    });
    if (!file_path) {
        log.debug("Readme file not found for repository in " + repo_base_dir + "\n");
    }
    return file_path;
}
exports.get_readme_path = get_readme_path;
function has_license_file(repo_base_dir) {
    return __awaiter(this, void 0, void 0, function () {
        var log, has_file, readme_search, files;
        return __generator(this, function (_a) {
            log = logging_1.provider.getLogger("Cloned.has_license_file");
            has_file = false;
            readme_search = /[Ll][Ii][Cc][Ee][Nn][SsCc][Ee]\.*.*/;
            files = fs.readdirSync(repo_base_dir);
            files.forEach(function (element) {
                if (element.search(readme_search) != -1) {
                    log.info("License file found for respoitory: " + element + "\n");
                    has_file = true;
                    return has_file;
                }
            });
            log.info("License file not found for repository in " + repo_base_dir + "\n");
            return [2 /*return*/, has_file];
        });
    });
}
exports.has_license_file = has_license_file;
function get_readme_length(file_contents) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, file_contents];
                case 1: 
                // Get length in characters of a readme file
                // :param file_contents: Contents of readme in a string
                // :return: Promise of number of characters in readme
                return [2 /*return*/, (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.length];
            }
        });
    });
}
exports.get_readme_length = get_readme_length;
function get_percentage_comments(repo_base_dir) {
    return __awaiter(this, void 0, void 0, function () {
        var log, terminal_command, terminal_output, data, percent, re, loc;
        return __generator(this, function (_a) {
            log = logging_1.provider.getLogger("Cloned.get_percentage_comments");
            // Terminal command, running cloc to get comment information
            log.info("Running cloc on cloned repository\n");
            repo_base_dir = '"' + repo_base_dir + '"'; // prep directory for cloc command
            terminal_command = "cloc --by-percent cm --sum-one --yaml " + repo_base_dir;
            try {
                terminal_output = cp.execSync(terminal_command);
            }
            catch (err) {
                log.debug("Error in running cloc command\n");
                return [2 /*return*/, 0];
            }
            data = terminal_output.toString();
            percent = 0;
            re = new RegExp("SUM", "i");
            data = data.substring(data.search(re), data.length);
            // Get total comment percentage
            re = new RegExp("comment:", "i");
            loc = data.search(re);
            if (!loc) {
                log.debug("Could not find comment ratio\n");
                return [2 /*return*/, 0];
            }
            data = data.substring(loc + "comment: ".length, data.length);
            percent = parseFloat(data.split("\n")[0]);
            log.info("Returning comment ratio: " + percent + "\n");
            return [2 /*return*/, percent];
        });
    });
}
exports.get_percentage_comments = get_percentage_comments;
function delete_repo(repo_base_dir) {
    return __awaiter(this, void 0, void 0, function () {
        var log;
        return __generator(this, function (_a) {
            log = logging_1.provider.getLogger("Cloned.get_repo");
            log.info("Removing repository\n");
            if (fs.existsSync(repo_base_dir)) {
                fs.rm(repo_base_dir, { recursive: true }, function (err) {
                    if (err)
                        log.debug("Error when removing repository in " + repo_base_dir + "\n");
                });
            }
            return [2 /*return*/];
        });
    });
}
exports.delete_repo = delete_repo;
function has_license_in_readme(file_contents) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var search;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    search = new RegExp(/#+\s*[Ll][Ii][Cc][Ee][Nn][SsCc][Ee]/);
                    return [4 /*yield*/, file_contents];
                case 1: return [2 /*return*/, ((_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.search(search)) != -1];
            }
        });
    });
}
exports.has_license_in_readme = has_license_in_readme;
function read_readme(readme_path) {
    return __awaiter(this, void 0, void 0, function () {
        var log, file_contents;
        return __generator(this, function (_a) {
            log = logging_1.provider.getLogger("Cloned.read_readme");
            file_contents = "";
            log.info("Reading contents of Readme\n");
            try {
                file_contents = fs.readFileSync(readme_path, "ascii");
            }
            catch (exception) {
                log.debug("Readme file not found: " + readme_path + "\n");
            }
            return [2 /*return*/, file_contents];
        });
    });
}
exports.read_readme = read_readme;
function has_license_in_package_json(repo_base_dir) {
    return __awaiter(this, void 0, void 0, function () {
        var log, package_json_path, file_contents, package_json;
        return __generator(this, function (_a) {
            log = logging_1.provider.getLogger("Cloned.has_license_in_package_json");
            package_json_path = path.join(repo_base_dir, "package.json");
            try {
                log.info("Read package.json file\n");
                file_contents = fs.readFileSync(package_json_path);
            }
            catch (err) {
                log.debug("Could not find package.json file, exited with error: " + err + "\n");
                return [2 /*return*/, false];
            }
            package_json = JSON.parse(file_contents.toString());
            try {
                if (package_json.license)
                    log.info("Found license in package.json\n");
                return [2 /*return*/, true];
            }
            catch (err) {
                log.debug("Package.json has no license, exited with error: " + err + "\n");
                return [2 /*return*/, false];
            }
            return [2 /*return*/];
        });
    });
}
exports.has_license_in_package_json = has_license_in_package_json;
function has_correct_license_in_readme(file_contents) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var log, match, searches, licenses, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    log = logging_1.provider.getLogger("Cloned.has_correct_license_in_readme");
                    match = -1;
                    searches = [
                        /\s*[Ll]+(esser\s)*[Gg]+(eneral\s)*[Pp]+(ublic\s)*[Ll]+(icense\s|icence\s)*\s*[Vv]+(ersion)*(\s)*(2\.[1-9]|3(\.[1-9])*)+[^A-Za-z]+/,
                        /\s*[Mm]+[Ii]+[Tt]+[^A-Za-z]+/,
                        /\s*[Bb]+[Ss]+[Dd]+[^A-Za-z]+/,
                        /\s*[Aa](pache|PACHE)+[^A-Za-z]+/,
                        /\s*[Mm]+[Pp]+[Ll]+[^A-Za-z]+/,
                    ];
                    licenses = ["LGPL", "MIT", "BSD", "Apache", "MPL"];
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < searches.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, file_contents];
                case 2:
                    match = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.search(searches[i]);
                    if (match != -1) {
                        log.info("Found license " + licenses[i] + " in readme\n");
                        return [2 /*return*/, true];
                    }
                    _b.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    log.info("Could not find license in readme\n");
                    return [2 /*return*/, false];
            }
        });
    });
}
exports.has_correct_license_in_readme = has_correct_license_in_readme;
function get_info_from_cloned_repo(package_instance) {
    return __awaiter(this, void 0, void 0, function () {
        var log, path_to_repo, repo_base_dir, git, file_path, file_contents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log = logging_1.provider.getLogger("Cloned.get_info_from_cloned_repo");
                    log.info("Cloning repo and getting information about it\n");
                    path_to_repo = process.cwd();
                    repo_base_dir = path.join(path_to_repo, package_instance.repo);
                    return [4 /*yield*/, create_git_object(package_instance.repo, path_to_repo)];
                case 1:
                    git = _a.sent();
                    // Clone the repo and wait for it to be done
                    return [4 /*yield*/, clone_repo(package_instance.url, repo_base_dir, git)];
                case 2:
                    // Clone the repo and wait for it to be done
                    _a.sent();
                    file_path = get_readme_path(repo_base_dir);
                    file_contents = read_readme(file_path);
                    // Get information about repo
                    package_instance.comment_ratio = get_percentage_comments(repo_base_dir);
                    package_instance.has_license_file = has_license_file(repo_base_dir);
                    package_instance.has_license_in_package_json =
                        has_license_in_package_json(repo_base_dir);
                    if (!file_path) {
                        // If readme is not found, nothing can be obtained from it
                        package_instance.readme_size = Promise.resolve(0);
                        package_instance.has_license_in_readme = Promise.resolve(false);
                        package_instance.has_correct_license_in_readme = Promise.resolve(false);
                        delete_repo(repo_base_dir);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, file_contents];
                case 3:
                    if (!(_a.sent())) {
                        // If readme contents are not found, nothing can be obtained from it
                        package_instance.readme_size = Promise.resolve(0);
                        package_instance.has_license_in_readme = Promise.resolve(false);
                        package_instance.has_correct_license_in_readme = Promise.resolve(false);
                        delete_repo(repo_base_dir);
                        return [2 /*return*/];
                    }
                    // Get readme length, readme license
                    package_instance.readme_size = get_readme_length(file_contents);
                    package_instance.has_license_in_readme = has_license_in_readme(file_contents);
                    package_instance.has_correct_license_in_readme =
                        has_correct_license_in_readme(file_contents);
                    // Delete the repo
                    delete_repo(repo_base_dir);
                    return [2 /*return*/];
            }
        });
    });
}
exports.get_info_from_cloned_repo = get_info_from_cloned_repo;
