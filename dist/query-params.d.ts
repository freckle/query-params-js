import { type Moment } from 'moment-timezone';
type QueryParamsPrimitiveT = string | number | boolean;
export type QueryParamValueT = QueryParamsPrimitiveT | undefined | null | Array<QueryParamsPrimitiveT> | Moment;
export type QueryParamsObjT = {
    [key: string]: QueryParamsPrimitiveT | undefined | null | Array<QueryParamsPrimitiveT>;
};
export declare function urlWithQueryParams(baseUrl: string, queryParams: any): string;
export declare function createAPIQueryParams(queryParams: QueryParamsObjT): string | undefined | null;
export {};
