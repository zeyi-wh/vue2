/* eslint-disable */
const config = {
  SCRM_API_HOST: "https://power.medcloud.cn/",
  HIS_API_HOST: "https://power.medcloud.cn/:",
  DOMAIN: "https://power.medcloud.cn",
};

{{#if_eq projectType "normal"}}
export default config;
{{/if_eq}}

{{#if_eq projectType "qiankun"}}
module.exports = config
{{/if_eq}}
