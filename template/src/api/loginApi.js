{{#if_eq projectType "normal"}}
import { SCRM_HTTP } from "@/api/APIInterceptors";

export function login(data) {
  return SCRM_HTTP.post("/api/scrm/auth/login-general", data, {
    type: "form",
  });
}
export function requestHierarchies(params) {
  return SCRM_HTTP.get("/api/scrm/institution/hierarchies", {
    params,
  });
}
{{/if_eq}}
{{#if_eq projectType "qiankun"}}
import HTTPRequestUtil from "@/api/HTTPRequestUtil";

export function login(data) {
  return HTTPRequestUtil.lbPost("/api/scrm/auth/login-general", data, {
    "content-type": "application/x-www-form-urlencoded",
  });
}
export function requestHierarchies(data) {
  return HTTPRequestUtil.lbGet("/api/scrm/institution/hierarchies", data);
}
{{/if_eq}}