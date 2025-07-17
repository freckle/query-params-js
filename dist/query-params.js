"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlWithQueryParams = urlWithQueryParams;
exports.createAPIQueryParams = createAPIQueryParams;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const maybe_1 = require("@freckle/maybe");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function urlWithQueryParams(baseUrl, queryParams) {
    const mQueryParamsStr = createAPIQueryParams(queryParams);
    return (0, maybe_1.maybe)(() => baseUrl, queryParamsStr => `${baseUrl}?${queryParamsStr}`, mQueryParamsStr);
}
function createAPIQueryParams(queryParams) {
    const queryParamsKeys = [...Object.keys(queryParams)];
    const params = (0, maybe_1.mapMaybes)(queryParamsKeys, key => {
        const value = queryParams[key];
        const mQueryParamStr = createQueryParamValue(key, value);
        return (0, maybe_1.maybe)(() => null, queryParamStr => `${key}=${queryParamStr}`, mQueryParamStr);
    });
    return params.length > 0 ? `${params.join('&')}` : null;
}
function createQueryParamValue(key, value) {
    if (value === null || value === undefined) {
        return null;
    }
    if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') {
        return value.toString();
    }
    if (Array.isArray(value)) {
        return arrayToQueryParam(value);
    }
    if (moment_timezone_1.default.isMoment(value)) {
        return value.valueOf();
    }
    throw new Error(`Invalid type of query param object for key ${key}`);
}
function arrayToQueryParam(arr) {
    return arr.map(val => val.toString()).join(',');
}
