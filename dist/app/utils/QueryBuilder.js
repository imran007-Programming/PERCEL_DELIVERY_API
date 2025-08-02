"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
var constants_1 = require("./constants");
var QueryBuilder = /** @class */ (function () {
    function QueryBuilder(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    QueryBuilder.prototype.filter = function () {
        var filter = __assign({}, this.query);
        for (var _i = 0, excludeField_1 = constants_1.excludeField; _i < excludeField_1.length; _i++) {
            var field = excludeField_1[_i];
            delete filter[field];
        }
        this.modelQuery = this.modelQuery.find(filter);
        return this;
    };
    QueryBuilder.prototype.search = function (searchableFields) {
        var searchTerm = this.query.searchTerm || "";
        var searchQuery = {
            $or: searchableFields.map(function (field) {
                var _a;
                return (_a = {}, _a[field] = { $regex: searchTerm, $options: "i" }, _a);
            })
        };
        this.modelQuery = this.modelQuery.find(searchQuery);
        return this;
    };
    QueryBuilder.prototype.sort = function () {
        var sort = this.query.sort || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    };
    QueryBuilder.prototype.fields = function () {
        var _a;
        var fields = ((_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(",").join(" ")) || "";
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    };
    QueryBuilder.prototype.paginate = function () {
        var page = Number(this.query.page) || 1;
        var limit = Number(this.query.limit) || 10;
        var skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    };
    QueryBuilder.prototype.build = function () {
        return this.modelQuery;
    };
    QueryBuilder.prototype.getMeta = function () {
        return __awaiter(this, void 0, void 0, function () {
            var totalDocuments, page, limit, totalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelQuery.model.countDocuments()];
                    case 1:
                        totalDocuments = _a.sent();
                        page = Number(this.query.page) || 1;
                        limit = Number(this.query.limit) || 10;
                        totalPage = Math.ceil(totalDocuments / limit);
                        return [2 /*return*/, { page: page, limit: limit, total: totalDocuments, totalPage: totalPage }];
                }
            });
        });
    };
    return QueryBuilder;
}());
exports.QueryBuilder = QueryBuilder;
