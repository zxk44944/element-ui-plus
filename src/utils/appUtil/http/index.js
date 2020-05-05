import axios from 'axios'
import commonUtil from '../../commonUtil'

class Http {
  constructor() {
    this.request = createAxios()
  }
  get(url, data, config) {
    const wellConfig = {
      params: { ts: Date.now(), ...data },
      ...config
    }
    const wellUrl = commonUtil.format(url, data)
    return this.request.get(wellUrl, wellConfig)
  }
  post(url, data, config) {
    const wellUrl = commonUtil.format(url, data)
    return this.request.post(wellUrl, data, config)
  }
}

export default new Http()

function createAxios() {
  return axios.create()
}
