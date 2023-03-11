import map from 'lodash/map'
import reduce from 'lodash/reduce'
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
  const appended = map(entries, ([k, v]) => [`${name}[${k}]`, v])
  return reduce(appended, (o, [k, v]) => ({...o, [k as string]: v}), {})
}
