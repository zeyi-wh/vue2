const Big = require("big.js");

// 千分位加逗号，千面加¥
export const numberUtils = {
  thousandFormatter(value, places = 2, sysmbol = "￥") {
    const zero = "";
    if (isNaN(value) || value === "") return zero;

    if (value && value != null) {
      value = `${value}`;
      let left = value.split(".")[0]; // 小数点左边部分
      let right = value.split(".")[1]; // 小数点右边
      // 保留places位小数点，当长度没有到places时，用0补足。
      right = right
        ? right.length >= places
          ? "." + right.substr(0, places)
          : "." + right + "0".repeat(places - right.length)
        : "." + "0".repeat(places);
      var temp = left
        .split("")
        .reverse()
        .join("")
        .match(/(\d{1,3})/g); // 分割反向转为字符串然后最多3个，最少1个，将匹配的值放进数组返回
      return (
        (Number(value) < 0 ? "-" : "") +
        sysmbol +
        temp.join(",").split("").reverse().join("") +
        right
      ); // 补齐正负号和货币符号，数组转为字符串，通过逗号分隔，再分割（包含逗号也分割）反向转为字符串变回原来的顺序
    } else if (value === 0) {
      return `${sysmbol}0.00`;
    } else {
      return zero;
    }
  },
};

// bigjs的封装
export function BigCalculate(value1, method, value2) {
  if (!value1) value1 = 0;
  if (!value2) value2 = 0;
  if (typeof value1 !== "number") value1 = 0;
  if (typeof value2 !== "number") value2 = 0;
  if (method === "+") {
    return Number(Big(value1).plus(Number(value2)));
  } else if (method === "-") {
    return Number(Big(value1).minus(Number(value2)));
  } else if (method === "*") {
    return Number(Big(value1).times(Number(value2)));
  } else if (method === "/") {
    return Number(Big(value1).div(Number(value2)));
  }
}

// 保留小数点后两位
export function changeTwoDecimal(params, precision = 2) {
  if (typeof params !== "number") params = Number(params);
  if (params < 0.01 && params > 0) params = 0.01; // 计算金额精度最小值为0.01
  return Number(params.toFixed(precision));
}

/**
 * 根据value值获取对应枚举类匹配的text
 */
export function filterEnums(value, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value === value) {
      return arr[i].text;
    }
  }
}

// 定义退出方法
export function logout() {
  localStorage.clear();
  location.href = "/login";
}
