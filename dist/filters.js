export function toQueryParamObj(name, filters) {
    const entries = Object.entries(filters);
    const appended = entries.map(([k, v]) => [`${name}[${k}]`, v]);
    return appended.reduce((o, [k, v]) => ({ ...o, [k]: v }), {});
}
