import _ from 'lodash'
export default {
  arrayToMap (array) {
    if (!array) {
      return {}
    }
    if (!_.isArray(array)) {
      return array
    }
    const map = {}
    for (const item of array) {
      if (item.key) {
        map[item.key] = item
      }
    }
    return map
  },
  mapToArray (map) {
    if (!map) {
      return []
    }
    if (_.isArray(map)) {
      return map
    }
    const array = []
    for (const key in map) {
      const item = map[key]
      item.key = key
      array.push(item)
    }
    return array
  }
}
