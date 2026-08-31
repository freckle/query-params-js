import map from 'lodash/map.js';
import reduce from 'lodash/reduce.js';
export function toQueryParamObj(name, filters) {
    const entries = Object.entries(filters);
    const appended = map(entries, ([k, v]) => [`${name}[${k}]`, v]);
    return reduce(appended, (o, [k, v]) => ({ ...o, [k]: v }), {});
}
