import type { QueryParamValueT, QueryParamsObjT } from './query-params';
export type ParamFiltersT<A> = {
    in?: Array<A>;
    notin?: Array<A>;
    gt?: A;
    gte?: A;
    lt?: A;
    lte?: A;
};
export declare function toQueryParamObj<A extends QueryParamValueT>(name: string, filters: ParamFiltersT<A>): QueryParamsObjT;
