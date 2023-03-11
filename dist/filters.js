"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toQueryParamObj = void 0;
const map_1 = __importDefault(require("lodash/map"));
const reduce_1 = __importDefault(require("lodash/reduce"));
function toQueryParamObj(name, filters) {
    const entries = Object.entries(filters);
    const appended = (0, map_1.default)(entries, ([k, v]) => [`${name}[${k}]`, v]);
    return (0, reduce_1.default)(appended, (o, [k, v]) => (Object.assign(Object.assign({}, o), { [k]: v })), {});
}
exports.toQueryParamObj = toQueryParamObj;
