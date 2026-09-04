import {toQueryParamObj} from './index.js'

describe(toQueryParamObj.name, () => {
  test('should return an empty object when given no filters', () => {
    expect(toQueryParamObj('score', {})).toEqual({})
  })

  test('should bracket each filter operator under the given name', () => {
    expect(toQueryParamObj('score', {gte: 10, lt: 90})).toEqual({
      'score[gte]': 10,
      'score[lt]': 90
    })
  })

  test('should preserve array values for in and notin', () => {
    expect(toQueryParamObj('id', {in: [1, 2], notin: [3]})).toEqual({
      'id[in]': [1, 2],
      'id[notin]': [3]
    })
  })
})
