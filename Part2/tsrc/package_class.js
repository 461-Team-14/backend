"use strict";
exports.__esModule = true;
exports.Package = void 0;
var Package = /** @class */ (function () {
    function Package(URL, repo, owner, token) {
        if (URL === void 0) { URL = ""; }
        if (repo === void 0) { repo = ""; }
        if (owner === void 0) { owner = "github"; }
        if (token === void 0) { token = ""; }
        this.correctness = 0;
        this.license_name = "";
        this.bus_factor = 0;
        this.num_dev = 0;
        this.pr_count = 0;
        this.recent_commit = 0;
        this.ramp_up = 0;
        this.issues = 0;
        this.issues_active = 0;
        this.issue_ratio = 0;
        this.commit_count = 0;
        this.readme_size = new Promise(function (value) { });
        this.comment_ratio = new Promise(function (value) { });
        this.ramp_up = 0;
        this.issues = 0;
        this.issues_active = 0;
        this.issue_ratio = 0;
        this.responsiveness = 0;
        this.license = 0;
        this.num_stars = 0;
        this.total_commits = 0;
        this.last_pushed_at = "";
        this.score = 0;
        this.url = URL;
        this.repo = repo;
        this.owner = owner;
        this.token = token;
        this.last_push = "";
        this.has_license_file = new Promise(function (value) { });
        this.has_license_in_readme = new Promise(function (value) { });
        this.has_license_in_package_json = new Promise(function (value) { });
        this.has_correct_license_in_readme = new Promise(function (value) { });
        //Constructor for new additions
        this.version = { major: 0, minor: 0, patch: 0 };
        this.devDependencies = {};
        this.pinnedfraction = 0;
    }
    return Package;
}());
exports.Package = Package;
