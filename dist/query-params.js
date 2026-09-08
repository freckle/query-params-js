import moment from 'moment-timezone';
import { maybe, mapMaybes } from '@freckle/maybe';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlWithQueryParams(baseUrl, queryParams) {
    const mQueryParamsStr = createAPIQueryParams(queryParams);
    return maybe(() => baseUrl, queryParamsStr => `${baseUrl}?${queryParamsStr}`, mQueryParamsStr);
}
export function createAPIQueryParams(queryParams) {
    const queryParamsKeys = [...Object.keys(queryParams)];
    const params = mapMaybes(queryParamsKeys, key => {
        const value = queryParams[key];
        const mQueryParamStr = createQueryParamValue(key, value);
        return maybe(() => null, queryParamStr => `${key}=${queryParamStr}`, mQueryParamStr);
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
    if (moment.isMoment(value)) {
        return value.valueOf();
    }
    throw new Error(`Invalid type of query param object for key ${key}`);
}
function arrayToQueryParam(arr) {
    return arr.map(val => val.toString()).join(',');
}
