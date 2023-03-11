import moment, {type Moment} from 'moment-timezone'
import {maybe, mapMaybes} from '@freckle/maybe'

type QueryParamsPrimitiveT = string | number | boolean

export type QueryParamValueT =
  | QueryParamsPrimitiveT
  | undefined
  | null
  | Array<QueryParamsPrimitiveT>
  | Moment

export type QueryParamsObjT = {
  [key: string]: QueryParamsPrimitiveT | undefined | null | Array<QueryParamsPrimitiveT>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlWithQueryParams(baseUrl: string, queryParams: any): string {
  const mQueryParamsStr = createAPIQueryParams(queryParams as QueryParamsObjT)
  return maybe(
    () => baseUrl,
    queryParamsStr => `${baseUrl}?${queryParamsStr}`,
    mQueryParamsStr
  )
}

export function createAPIQueryParams(queryParams: QueryParamsObjT): string | undefined | null {
  const queryParamsKeys = [...Object.keys(queryParams)]
  const params = mapMaybes(queryParamsKeys, key => {
    const value = queryParams[key]
    const mQueryParamStr = createQueryParamValue(key, value)
    return maybe(
      () => null,
      queryParamStr => `${key}=${queryParamStr}`,
      mQueryParamStr
    )
  })
  return params.length > 0 ? `${params.join('&')}` : null
}

function createQueryParamValue(
  key: string,
  value: QueryParamValueT
): string | undefined | null | number {
  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') {
    return value.toString()
  }

  if (Array.isArray(value)) {
    return arrayToQueryParam(value)
  }

  if (moment.isMoment(value)) {
    return (value as Moment).valueOf()
  }

  throw new Error(`Invalid type of query param object for key ${key}`)
}

function arrayToQueryParam(arr: Array<QueryParamsPrimitiveT>): string {
  return arr.map(val => val.toString()).join(',')
}
