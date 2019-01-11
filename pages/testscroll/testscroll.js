//logs.js
const util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneData: {
      phone: "",
      phoneIsp: ""
    },
    couponData: [{
        id: "1",
        itemTitle: "1G",
        itemPrice: "15.00元",
        isSelected: true
      }, {
        id: "2",
        itemTitle: "2G",
        itemPrice: "26.00元",
        isSelected: false
      },
      {
        id: "3",
        itemTitle: "3G",
        itemPrice: "29.00元",
        isSelected: false
      }, {
        id: "4",
        itemTitle: "4G",
        itemPrice: "35.00元",
        isSelected: false
      }, {
        id: "5",
        itemTitle: "200M",
        itemPrice: "10.00元",
        isSelected: false
      },
      {
        id: "6",
        itemTitle: "500M",
        itemPrice: "18.00元",
        isSelected: false
      }
    ],

    couponData1: [{
      id: "1",
      itemTitle: "icon-liaoliji",
      itemPrice: "15.00元",
      isSelected: true
    }, {
      id: "2",
      itemTitle: "icon-gouwuche",
      itemPrice: "26.00元",
      isSelected: false
    },
    {
      id: "3",
      itemTitle: "icon-caidan",
      itemPrice: "29.00元",
      isSelected: false
    }, {
      id: "4",
      itemTitle: "icon-kafei1",
      itemPrice: "35.00元",
      isSelected: false
    }, {
      id: "5",
      itemTitle: "icon-gouwu",
      itemPrice: "10.00元",
      isSelected: false
    },
    {
      id: "6",
      itemTitle: "icon-liaoliji",
      itemPrice: "18.00元",
      isSelected: false
    }
    ],

    scrollLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onLoad:", options)
    let phone = "phoneData.phone"; //获取上个页面的电话号码
    let phoneIsp = "phoneData.phoneIsp"; //获取上个页面的归属地
    if (options.phone) {
      this.setData({
        [phone]: options.phone,
        [phoneIsp]: options.phoneIsp
      })
    }

  },

  /**
   * 动态改变scroll-left的值
   * */
  _handleScroll(selectedId) {
    var _this = this;
    var query = wx.createSelectorQuery(); //创建节点查询器
    query.select('#item-' + selectedId).boundingClientRect(); //选择id='#item-' + selectedId的节点，获取节点位置信息的查询请求
    query.select('#scroll-view').boundingClientRect(); //获取滑块的位置信息
    //获取滚动位置
    query.select('#scroll-view').scrollOffset(); //获取页面滑动位置的查询请求
    query.exec(function(res) {
      // console.log("res:",res)
      _this.setData({
        scrollLeft: res[2].scrollLeft + res[0].left + res[0].width / 2 - res[1].width / 2
      });
    });
  },

  onCouponItemClick: function(e) {
    console.log("onCouponItemClick:", e)
    var id = e.currentTarget.dataset.item.id;
    var curIndex = 0;
    for (var i = 0; i < this.data.couponData.length; i++) {
      if (id == this.data.couponData[i].id) {
        this.data.couponData[i].isSelected = true;
        curIndex = i;
      } else {
        this.data.couponData[i].isSelected = false;
      }
    }
    this._handleScroll(id);
    this.setData({
      couponData: this.data.couponData
    })
  },

  onCouponItemClick1: function (e) {
    console.log("onCouponItemClick:", e)
    var id = e.currentTarget.dataset.item.id;
    var curIndex = 0;
    for (var i = 0; i < this.data.couponData1.length; i++) {
      if (id == this.data.couponData1[i].id) {
        this.data.couponData1[i].isSelected = true;
        curIndex = i;
      } else {
        this.data.couponData1[i].isSelected = false;
      }
    }
    this._handleScroll(id);
    this.setData({
      couponData1: this.data.couponData1
    })
  },

  // data: {
  //   logs: []
  // },
  // onLoad: function () {
  //   this.setData({
  //     logs: (wx.getStorageSync('logs') || []).map(log => {
  //       return util.formatTime(new Date(log))
  //     })
  //   })
  // }
})