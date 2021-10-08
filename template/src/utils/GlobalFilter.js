/**
 * 定义全局filter的地方
 * 默认定义了时间格式处理和金额格式处理
 */

import Vue from 'vue'
import moment from 'moment'

import { numberUtils } from '@/utils/util'

export const filters = {
  filterTime (value, format = 'YYYY-MM-DD HH:mm:ss') {
    return value !== '-' ? moment(value).format(format) : '-'
  },
  thousandFormatter: numberUtils.thousandFormatter
}

Object.keys(filters).forEach((k) => {
  Vue.filter(k, filters[k])
})
