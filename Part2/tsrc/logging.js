"use strict";
exports.__esModule = true;
exports.open_log_file = exports.get_provider = exports.get_log_level = exports.provider = void 0;
var fs = require("fs");
var typescript_logging_1 = require("typescript-logging");
var typescript_logging_log4ts_style_1 = require("typescript-logging-log4ts-style");
function get_log_level() {
    // Get the log level from the environment variable
    // :return: number corresponding to log level
    var level = 0;
    if (process.env.LOG_LEVEL != undefined) {
        if (Number(process.env.LOG_LEVEL) == 1) {
            // Informational messages
            level = typescript_logging_1.LogLevel.Info;
        }
        else if (Number(process.env.LOG_LEVEL) == 2) {
            // Debug messages
            level = typescript_logging_1.LogLevel.Debug;
        }
    }
    return level;
}
exports.get_log_level = get_log_level;
function open_log_file() {
    // Create log file
    // :return: boolean for if file was created correctly
    // Check for log file environment variable
    if (process.env.LOG_FILE) {
        try {
            fs.openSync(process.env.LOG_FILE, "r");
        }
        catch (_a) {
            // Invalid file
            return false;
        }
    }
    else {
        // No LOG_FILE env variable defined
        return false;
    }
    return true;
}
exports.open_log_file = open_log_file;
function write_setting(msg) {
    // Defines how to write log files
    // :param msg: logMessage to be written
    var path = "";
    var message = "";
    // Only write to file if log file has been provided and log level is not silent
    if (process.env.LOG_FILE && Number(process.env.LOG_LEVEL) != 0) {
        path = process.env.LOG_FILE;
        if (msg.message.endsWith("\n")) {
            message = msg.message;
        }
        else {
            message = msg.message + "\n";
        }
        fs.appendFile(path, message, {}, function (err) {
            if (err)
                return false;
        });
    }
}
function get_provider() {
    // Create logging interface (functions as main)
    // :return: whether the logging interface succeeded
    // Get the log level
    var level = get_log_level();
    // Ensure log file has been created
    if (!open_log_file()) {
    }
    // Define how logging should be written (i.e. to a file)
    var provider = typescript_logging_log4ts_style_1.Log4TSProvider.createProvider("Logging", {
        level: level,
        groups: [
            {
                identifier: "MatchAll",
                expression: new RegExp(".+")
            },
        ],
        channel: {
            type: "LogChannel",
            write: write_setting
        }
    });
    return provider;
}
exports.get_provider = get_provider;
var provider = get_provider();
exports.provider = provider;
