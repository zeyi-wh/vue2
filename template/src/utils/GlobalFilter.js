import Vue from "vue";
import moment from "moment";
{{#if_eq projectType "normal"}}
import "moment/locale/zh-cn";
moment.locale("zh-cn");
{{/if_eq}}

import { numberUtils } from "@/utils/util";

export const filters = {
  filterTime(value, format = "YYYY-MM-DD HH:mm:ss") {
    return value !== "-" ? moment(value).format(format) : "-";
  },
  /**
   * 根据value值获取对应枚举类匹配的text
   */
  filterEnums(value, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].value === value) {
        return arr[i].text;
      }
    }
  },
  thousandFormatter: numberUtils.thousandFormatter,
};

Object.keys(filters).forEach((k) => {
  Vue.filter(k, filters[k]);
});
