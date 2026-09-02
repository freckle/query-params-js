import type {QueryParamValueT, QueryParamsObjT} from './query-params'

export type ParamFiltersT<A> = {
  in?: Array<A>
  notin?: Array<A>
  gt?: A
  gte?: A
  lt?: A
  lte?: A
}

export function toQueryParamObj<A extends QueryParamValueT>(
  name: string,
  filters: ParamFiltersT<A>
): QueryParamsObjT {
  const entries = Object.entries(filters)
  const appended = entries.map(([k, v]) => [`${name}[${k}]`, v])
  return appended.reduce((o, [k, v]) => ({...o, [k as string]: v}), {})
}
