import {describe, expect, test} from 'vitest'
import moment from 'moment-timezone'

import {createAPIQueryParams, toQueryParamObj, urlWithQueryParams} from './index.js'

describe('urlWithQueryParams', () => {
  const baseUrl = 'www.test.com'

  test('should return correct url when given empty object', () => {
    const res = urlWithQueryParams(baseUrl, {})
    expect(res).toEqual(baseUrl)
  })

  test('should return correct url when given an object with one number', () => {
    const res = urlWithQueryParams(baseUrl, {a: 1})
    expect(res).toEqual(`${baseUrl}?a=1`)
  })

  test('should return correct url when given an object with one string', () => {
    const res = urlWithQueryParams(baseUrl, {a: 'foo'})
    expect(res).toEqual(`${baseUrl}?a=foo`)
  })

  test('should return correct url when given an object with one boolean', () => {
    const res = urlWithQueryParams(baseUrl, {a: true})
    expect(res).toEqual(`${baseUrl}?a=true`)
  })

  test('should return correct url when given an object with several primitives', () => {
    const res = urlWithQueryParams(baseUrl, {a: true, b: 1, c: 'foo'})
    expect(res).toEqual(`${baseUrl}?a=true&b=1&c=foo`)
  })

  test('should ignore query params with null values', () => {
    const res = urlWithQueryParams(baseUrl, {a: null, b: 1, c: 'foo'})
    expect(res).toEqual(`${baseUrl}?b=1&c=foo`)
  })

  test('should ignore query params with undefined values', () => {
    const res = urlWithQueryParams(baseUrl, {a: undefined, b: 1, c: 'foo'})
    expect(res).toEqual(`${baseUrl}?b=1&c=foo`)
  })

  test('should return correct url when given an object with an array of boolean', () => {
    const res = urlWithQueryParams(baseUrl, {a: [true, false]})
    expect(res).toEqual(`${baseUrl}?a=true,false`)
  })

  test('should return correct url when given an object with an array of string', () => {
    const res = urlWithQueryParams(baseUrl, {a: ['foo', 'bar']})
    expect(res).toEqual(`${baseUrl}?a=foo,bar`)
  })

  test('should return correct url when given an object with an array of number', () => {
    const res = urlWithQueryParams(baseUrl, {a: [1, 2]})
    expect(res).toEqual(`${baseUrl}?a=1,2`)
  })

  test('should return correct url when given an object with an array of primitive and other params', () => {
    const res = urlWithQueryParams(baseUrl, {a: [1, 2], b: 'foo'})
    expect(res).toEqual(`${baseUrl}?a=1,2&b=foo`)
  })

  test('should return correct url when given an object with a moment value', () => {
    const FROM_TS = 1584464520
    const TO_TS = 1584464520
    const from = moment(FROM_TS)
    const to = moment(TO_TS)
    const res = urlWithQueryParams(baseUrl, {from, to})
    expect(res).toEqual(`${baseUrl}?from=${FROM_TS}&to=${TO_TS}`)
  })

  test('should throw an error on invalid types', () => {
    expect(() => {
      // $FlowFixMe: We are by passing the type system here to make sure this is failing correctly when called in an untyped part of the app like in a 3rd party component
      urlWithQueryParams(baseUrl, {a: {b: 1}})
    }).toThrow(`Invalid type of query param object for key a`)
  })
})

describe('createAPIQueryParams', () => {
  test('should return the query string without a leading question mark', () => {
    expect(createAPIQueryParams({a: 1, b: 'x'})).toEqual('a=1&b=x')
  })

  test('should return null when given an empty object', () => {
    expect(createAPIQueryParams({})).toEqual(null)
  })

  // This null is what makes urlWithQueryParams return a bare baseUrl
  test('should return null when every value is dropped', () => {
    expect(createAPIQueryParams({a: null, b: undefined})).toEqual(null)
  })
})

describe('toQueryParamObj', () => {
  test('should return an empty object when given no filters', () => {
    expect(toQueryParamObj('score', {})).toEqual({})
  })

  test('should prefix each operator with the given name', () => {
    expect(toQueryParamObj('score', {gte: 0.5, lt: 0.9})).toEqual({
      'score[gte]': 0.5,
      'score[lt]': 0.9
    })
  })

  test('should keep array operators as arrays', () => {
    expect(toQueryParamObj('grade', {in: [1, 2]})).toEqual({'grade[in]': [1, 2]})
  })

  test('should support every operator', () => {
    const filters = {in: [1], notin: [2], gt: 3, gte: 4, lt: 5, lte: 6}
    expect(Object.keys(toQueryParamObj('n', filters))).toEqual([
      'n[in]',
      'n[notin]',
      'n[gt]',
      'n[gte]',
      'n[lt]',
      'n[lte]'
    ])
  })

  test('should compose with urlWithQueryParams', () => {
    const res = urlWithQueryParams('/api/students', toQueryParamObj('score', {gte: 0.5}))
    expect(res).toEqual('/api/students?score[gte]=0.5')
  })
})

// Documented in the README: keys and values are interpolated as-is, so a
// reserved character changes the meaning of the URL rather than being escaped.
// Pinned here so a future change to encode them has to be deliberate.
describe('urlWithQueryParams encoding', () => {
  test('should not encode reserved characters in values', () => {
    expect(urlWithQueryParams('/api', {q: 'a&b=c'})).toEqual('/api?q=a&b=c')
    expect(urlWithQueryParams('/api', {q: 'a#b'})).toEqual('/api?q=a#b')
  })

  test('should not encode spaces in values', () => {
    expect(urlWithQueryParams('/api', {name: 'John Smith'})).toEqual('/api?name=John Smith')
  })
})
