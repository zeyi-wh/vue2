/* eslint-disable */
const config = {
  SCRM_API_HOST: "http://dev-tower.laoganma.fun",
  HIS_API_HOST: "http://dev-tower.laoganma.fun",
  DOMAIN: "http://dev-tower.laoganma.fun",
};

{{#if_eq projectType "normal"}}
export default config;
{{/if_eq}}

{{#if_eq projectType "qiankun"}}
module.exports = config
{{/if_eq}}
