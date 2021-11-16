// 修改antd vue里面弹窗类型的getContainer默认值
if (window.antdV && !window.antdV.__changedContainer__) {
  // 修改这几种弹窗类型的'getContainer','getPopupContainer'
  const { DatePicker, Drawer, Dropdown, Menu, Modal, Popover, TimePicker, TreeSelect, Select, Popconfirm } = window.antdV
  ;[DatePicker, Drawer, Dropdown, Menu, Modal, Popover, TimePicker, TreeSelect, Select, Popconfirm].forEach(item => {
    if (Object.hasOwnProperty.call(item.props, 'getContainer')) {
      item.props.getContainer.default = false
    } else if (Object.hasOwnProperty.call(item.props, 'getPopupContainer')) {
      item.props.getPopupContainer.default = function (trigger) {
        return trigger.parentNode
      }
    } else if (Object.hasOwnProperty.call(item.props, 'getCalendarContainer')) {
      item.props.getCalendarContainer.default = function (trigger) {
        return trigger.parentNode
      }
    }
  })

  // 打上标签，在跨项目场景下不会重复执行此逻辑
  window.antdV.__changedContainer__ = true
}
