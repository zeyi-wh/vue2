// import qs from "qs";

export default class HTTPRequestUtil {
  static getLbRequest() {
    return window?.lb_main_request_tool?.scrmRequest;
  }

  static lbRequest(url, data, method, headers = {}, extraConfig = null) {
    const req = this.getLbRequest();
    return req(url, data, method, headers, extraConfig);
  }

  static lbGet(url, data, headers = {}, extraConfig) {
    return this.lbRequest(url, data, "GET", headers, extraConfig);
  }

  static lbPost(url, data, headers = {}, extraConfig) {
    const head = Object.assign({}, headers,{'full-response' : true})
    return this.lbRequest(url, data, "POST", head, extraConfig);
  }

  static lbPut(url, data, headers = {}, extraConfig) {
    return this.lbRequest(url, data, "PUT", headers, extraConfig);
  }
}
