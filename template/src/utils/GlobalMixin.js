/**
 * 定义全局混入的文件
 */
import moment from 'moment'
import { numberUtils } from '@/utils/util'


export const golbalMixin = {
  methods: {
    // 全局的inputNumber输入框 千分位显示
    thousandFormatter: numberUtils.thousandFormatter,
    filterTime (value, format = 'YYYY-MM-DD HH:mm:ss') {
      return value !== '-' ? moment(value).format(format) : '-'
    }
  }
}
