import { Icon } from "ant-design-vue";
import moment from "moment";
import { numberUtils } from "@/utils/util";

export const LiteIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2452510_w21eliqdh7.js",
});

export const golbalMixin = {
  components: { LiteIcon },
  methods: {
    //全局的inputNumber输入框 千分位显示
    thousandFormatter: numberUtils.thousandFormatter,
    filterTime(value, format = "YYYY-MM-DD HH:mm:ss") {
      return value !== "-" ? moment(value).format(format) : "-";
    },
  },
};