/**
 * 项目级的request封装，在这个文件可以添加默认配置，需要注意的几个参数有：
 * headers = { 'content-type': 'application/x-www-form-urlencoded'} 会覆盖headers里的配置
 * extraConfig { 'full-response': true } 接口将返回全量的信息
 */
import qs from 'qs'

export default class HTTPRequestUtil {
  static getLbRequest () {
    return window?.lb_global_tools?.lbRequest
  }

  static lbRequest (url, data, method, headers = {}, extraConfig = null) {
    const req = this.getLbRequest()
    return req(url, data, method, headers, extraConfig)
  }

  static lbGet (url, data, headers = {}, extraConfig) {
    return this.lbRequest(url, data, 'GET', headers, extraConfig)
  }

  static lbPost (url, data, headers = {}, extraConfig) {
    const head = Object.assign({}, headers, { 'full-response': true })
    if (head['content-type'] === 'application/x-www-form-urlencoded') {
      data = qs.stringify(data, {
        arrayFormat: 'comma'
      })
    }
    return this.lbRequest(url, data, 'POST', head, extraConfig)
  }

  static lbPut (url, data, headers = {}, extraConfig) {
    return this.lbRequest(url, data, 'PUT', headers, extraConfig)
  }
}
