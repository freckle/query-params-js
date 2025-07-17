import moment from 'moment-timezone'

import {urlWithQueryParams} from '.'

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
