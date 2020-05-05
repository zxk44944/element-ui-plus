import _ from 'lodash'

class CommonUtil {
  // for array
  chunk(list, size) {
    return _.chunk(list, size)
  }
  // for string
  format(template, variables) {
    const compiler = _.template(template)
    return compiler(variables)
  }
  // for object
  at(obj, path) {
    const [val] = _.at(obj, path)
    return val
  }
  // others
  uniqueId(prefix) {
    return _.uniqueId(prefix)
  }
  range(start, end, step) {
    return _.range(start, end + 1, step)
  }
  isEmpty(value) {
    return _.isEmpty(value)
  }
}

export default new CommonUtil()
