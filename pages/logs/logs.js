//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function (propties) {
    this.setData({
      logs: [{
        content:'点击的item是'+propties.tabId + ","+propties.itemId,
      }]
    })
  }
})
