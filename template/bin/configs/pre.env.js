/* eslint-disable */
const config = {
  SCRM_API_HOST: "http://pre-tower.medcloud.cn",
  HIS_API_HOST: "http://pre-tower.medcloud.cn",
  DOMAIN: "//pre.power.medcloud.cn",
};

{{#if_eq projectType "normal"}}
export default config;
{{/if_eq}}

{{#if_eq projectType "qiankun"}}
module.exports = config
{{/if_eq}}
