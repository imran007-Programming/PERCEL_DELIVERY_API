"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
var handleZodError = function (err) {
    var errorSources = [];
    err.issues.forEach(function (issue) {
        errorSources.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message
        });
    });
    return {
        statusCode: 400,
        message: "zod error",
        errorSources: errorSources
    };
};
exports.handleZodError = handleZodError;
