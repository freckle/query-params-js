"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toQueryParamObj = toQueryParamObj;
function toQueryParamObj(name, filters) {
    const entries = Object.entries(filters);
    const appended = entries.map(([k, v]) => [`${name}[${k}]`, v]);
    return appended.reduce((o, [k, v]) => (Object.assign(Object.assign({}, o), { [k]: v })), {});
}
