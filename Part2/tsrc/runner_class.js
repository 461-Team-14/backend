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
exports.Runner = void 0;
var logging_1 = require("./logging");
// Main driver for the functions that calculate the score of the repo
var Runner = /** @class */ (function () {
    function Runner(instance) {
        // Constructor for Runner class
        // :param instance: instance of Package class
        this.package_instance = instance;
    }
    Runner.prototype.calculate_correctness = function () {
        return __awaiter(this, void 0, void 0, function () {
            var log, num_stars;
            return __generator(this, function (_a) {
                log = logging_1.provider.getLogger("Scores.calculate_correctness");
                // this.package_instance.commit_count = await get_recentCommits(
                //   this.package_instance.repo,
                //   this.package_instance.owner
                // );
                log.info("Getting commit count...");
                // More than 1000 commits in the last year is probably a sign of a well maintained project
                if (this.package_instance.commit_count >= 1000) {
                    this.package_instance.commit_count = 1;
                }
                else {
                    this.package_instance.commit_count /= 1000;
                }
                log.info("Getting number of stars...");
                num_stars = this.package_instance.num_stars;
                if (num_stars >= 10000) {
                    num_stars = 1;
                }
                else {
                    num_stars /= 10000;
                }
                log.info("Calculated num_stars: ".concat(num_stars, " and commit_count: ").concat(this.package_instance.commit_count));
                log.info("Calculating correctness...");
                //Cap the scores off at 1
                this.package_instance.correctness = Math.min(0.2 * num_stars +
                    0.5 * this.package_instance.commit_count +
                    0.8 *
                        (this.package_instance.issues_active / this.package_instance.issues), 1);
                this.package_instance.correctness = parseFloat(this.package_instance.correctness.toPrecision(2));
                log.info("Calculated correctness score of " + this.package_instance.correctness);
                return [2 /*return*/];
            });
        });
    };
    Runner.prototype.calculate_bus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var log, num_devs, pr_count, ratio, num_stars;
            return __generator(this, function (_a) {
                log = logging_1.provider.getLogger("Scores.calculate_bus");
                num_devs = this.package_instance.num_dev;
                pr_count = this.package_instance.pr_count;
                ratio = 0;
                // If there's no PRs then there's only 1 person working on it
                if (pr_count == 0) {
                    this.package_instance.bus_factor = 0; // Terrible bus factor
                    return [2 /*return*/];
                }
                else {
                    ratio = num_devs / pr_count; // Ratio of devs to PRs. If there's a small number of devs making many PRs then the bus factor is low
                }
                num_stars = this.package_instance.num_stars;
                // Calculate bus factor
                this.package_instance.bus_factor = Math.min(7 * ratio + 0.3 * (num_stars / 10000), 1);
                this.package_instance.bus_factor = parseFloat(this.package_instance.bus_factor.toPrecision(2));
                log.info("Calculated bus factor score of " + this.package_instance.bus_factor);
                return [2 /*return*/];
            });
        });
    };
    Runner.prototype.calculate_license = function () {
        return __awaiter(this, void 0, void 0, function () {
            var log, has_license_file_score, _a, has_license_in_readme_score, _b, has_license_in_package_json, _c, has_correct_license_in_readme, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        log = logging_1.provider.getLogger("Scores.calculate_license");
                        log.info("Calculating license\n");
                        this.package_instance.license = 0;
                        _a = Number;
                        return [4 /*yield*/, this.package_instance.has_license_file];
                    case 1:
                        has_license_file_score = _a.apply(void 0, [_e.sent()]);
                        _b = Number;
                        return [4 /*yield*/, this.package_instance.has_license_in_readme];
                    case 2:
                        has_license_in_readme_score = _b.apply(void 0, [_e.sent()]);
                        _c = Number;
                        return [4 /*yield*/, this.package_instance.has_license_in_package_json];
                    case 3:
                        has_license_in_package_json = _c.apply(void 0, [_e.sent()]);
                        _d = Number;
                        return [4 /*yield*/, this.package_instance.has_correct_license_in_readme];
                    case 4:
                        has_correct_license_in_readme = _d.apply(void 0, [_e.sent()]);
                        // License score outputs a nonzero value if at least one of the following are true:
                        // 1) The readme has a compatible license
                        // 2) The repo has a license file, and has a license field in package.json, and has a license
                        //    header in the readme
                        if (has_correct_license_in_readme) {
                            this.package_instance.license = 1;
                        }
                        else if (has_license_file_score &&
                            has_license_in_readme_score &&
                            has_license_in_package_json) {
                            // License score is set to 0.2 because it is likely that this repo has a license,
                            // but it is very unlikely that it has the correct license
                            this.package_instance.license = 0.2;
                        }
                        if (has_correct_license_in_readme) {
                            log.info("License score is 1 based on condition (1) (check function for more information)\n");
                        }
                        else if (has_license_file_score &&
                            has_license_in_readme_score &&
                            has_license_in_package_json) {
                            log.info("License score is 0.2 based on condition (2) (check function for more information)\n");
                        }
                        else {
                            log.info("License score is 0\n");
                        }
                        this.package_instance.license = parseFloat(this.package_instance.license.toPrecision(2));
                        return [2 /*return*/];
                }
            });
        });
    };
    Runner.prototype.calculate_ramp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var log, standard_readme_length, standard_percent_comments, readme_score, _a, _b, comments_score, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        log = logging_1.provider.getLogger("Scores.calculate_ramp");
                        log.info("Calculate ramp up time");
                        this.package_instance.ramp_up = 0;
                        standard_readme_length = 10000;
                        standard_percent_comments = 0.5;
                        _b = (_a = Math).min;
                        return [4 /*yield*/, this.package_instance.readme_size];
                    case 1:
                        readme_score = _b.apply(_a, [(_e.sent()) / standard_readme_length,
                            1]);
                        _d = (_c = Math).min;
                        return [4 /*yield*/, this.package_instance.comment_ratio];
                    case 2:
                        comments_score = _d.apply(_c, [(_e.sent()) / standard_percent_comments,
                            1]);
                        // Calculate ramp up time
                        this.package_instance.ramp_up = readme_score * 0.4 + comments_score * 0.6;
                        this.package_instance.ramp_up = parseFloat(this.package_instance.ramp_up.toPrecision(2));
                        log.info("Calculated ramp up score of " + this.package_instance.ramp_up);
                        return [2 /*return*/];
                }
            });
        });
    };
    Runner.prototype.calculate_responsiveness = function () {
        return __awaiter(this, void 0, void 0, function () {
            var log;
            return __generator(this, function (_a) {
                log = logging_1.provider.getLogger("Scores.calculate_responsiveness");
                log.info("Calculating responsiveness");
                this.package_instance.responsiveness = Math.min(this.package_instance.pr_count / 1000 +
                    3 *
                        (this.package_instance.commit_count /
                            this.package_instance.total_commits), 1);
                this.package_instance.responsiveness = parseFloat(this.package_instance.responsiveness.toPrecision(2));
                log.info("Calculated responsiveness of " + this.package_instance.responsiveness);
                return [2 /*return*/];
            });
        });
    };
    //calculate total score
    Runner.prototype.calculate_score = function () {
        return __awaiter(this, void 0, void 0, function () {
            var log;
            return __generator(this, function (_a) {
                log = logging_1.provider.getLogger("Scores.calculate_score");
                log.info("Calculating final score...");
                this.package_instance.score =
                    0.25 * this.package_instance.bus_factor +
                        0.25 * this.package_instance.license +
                        0.2 * this.package_instance.correctness +
                        0.1 * this.package_instance.ramp_up +
                        0.1 * this.package_instance.responsiveness +
                        0.1 * this.package_instance.pinnedfraction;
                this.package_instance.score = parseFloat(this.package_instance.score.toPrecision(2));
                log.info("Final score for package " +
                    this.package_instance.repo +
                    " = " +
                    this.package_instance.score);
                return [2 /*return*/];
            });
        });
    };
    return Runner;
}());
exports.Runner = Runner;
