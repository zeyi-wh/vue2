import qs from "qs";

export default class HTTPRequestUtil {
  static getLbRequest() {
    return window?.lb_main_request_tool?.scrmRequest;
  }

  static lbRequest(url, data, method, headers = {}) {
    const req = this.getLbRequest();
    return req(url, data, method, headers);
  }

  static lbGet(url, data, headers = {}) {
    return this.lbRequest(url, data, "GET", headers);
  }

  static lbPost(url, data, headers = {}) {
    if (headers["content-type"] === "application/x-www-form-urlencoded") {
      data = qs.stringify(data, {
        arrayFormat: "comma",
      });
    }
    return this.lbRequest(url, data, "POST", headers);
  }

  static lbPut(url, data, headers = {}) {
    return this.lbRequest(url, data, "PUT", headers);
  }
}
