"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.ISActive = void 0;
var ISActive;
(function (ISActive) {
    ISActive["ACTIVE"] = "ACTIVE";
    ISActive["BLOCKED"] = "BLOCKED";
})(ISActive || (exports.ISActive = ISActive = {}));
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["SENDER"] = "SENDER";
    Role["RECEVIER"] = "RECEVIER";
    Role["DELIVERY_AGENT"] = "DELIVERY_AGENT";
})(Role || (exports.Role = Role = {}));
