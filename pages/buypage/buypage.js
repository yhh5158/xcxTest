//logs.js
const util = require('../../utils/util.js')
var placeholder = ['想买什么，就买什么！请填写商品名称和数量', '请填写咖啡品类、口味、杯型等具体要求', '请填写酒类名称、度数等', '请填写早餐名称份数、是否忌口等要求', '请填写早餐名称份数、是否忌口等要求', '请填写药品名称、厂家等要求', '请填写生鲜的种类、重量、体积等要求']
var placeholderInit = ['雨伞', '卫生巾', '电池', '胶带', '植筋', '扑克牌', '与我联系', '需要小票', '洗发水', '面包']
Page({
  /**
   * 页面的初始数据
   */

  data: {
    couponData: [{
        id: "1",
        itemIcon: "icon-gouwu",
        itemDec: "随意购",
        isSelected: true,
        placeholderdetail: ['雨伞', '卫生巾', '电池', '胶带', '植筋', '扑克牌', '与我联系', '需要小票', '洗发水', '面包']
      },
      {
        id: "2",
        itemIcon: "icon-kafei",
        itemDec: "咖啡",
        isSelected: false,
        placeholderdetail: ['咖啡', '卫生巾', '电池', '胶带', '植筋', '扑克牌', '与我联系', '需要小票', '洗发水', '面包']
      },
      {
        id: "3",
        itemIcon: "icon-jiu",
        itemDec: "酒",
        isSelected: false,
        placeholderdetail: ['酒', '卫生巾', '电池', '胶带', '植筋', '扑克牌', '与我联系', '需要小票', '洗发水', '面包']
      },
      {
        id: "4",
        itemIcon: "icon-zaocan",
        itemDec: "早餐",
        isSelected: false,
        placeholderdetail: ['早餐', '卫生巾', '电池', '胶带', '植筋', '扑克牌', '与我联系', '需要小票', '洗发水', '面包']
      },
      {
        id: "5",
        itemIcon: "icon-xiaoye",
        itemDec: "宵夜",
        isSelected: false,
        placeholderdetail: ['宵夜', '卫生巾', '电池', '胶带', '植筋', '扑克牌', '与我联系', '需要小票', '洗发水', '面包']
      },
      {
        id: "6",
        itemIcon: "icon-yaopin",
        itemDec: "药品",
        isSelected: false,
        placeholderdetail: ['药品', '卫生巾', '电池', '胶带', '植筋', '扑克牌', '与我联系', '需要小票', '洗发水', '面包']
      },
      {
        id: "7",
        itemIcon: "icon-shengxian",
        itemDec: "生鲜",
        isSelected: false,
        placeholderdetail: ['生鲜', '卫生巾', '电池', '胶带', '植筋', '扑克牌', '与我联系', '需要小票', '洗发水', '面包']
      }
    ],
    defaultString: placeholder[0],
    bottomplaceholderdetail: placeholderInit,
    inputbuyValue: '',   
    scrollLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onLoad:", options)
    // let phone = "phoneData.phone"; //获取上个页面的电话号码
    // let phoneIsp = "phoneData.phoneIsp"; //获取上个页面的归属地
    // if (options.phone) {
    //   this.setData({
    //     [phone]: options.phone,
    //     [phoneIsp]: options.phoneIsp
    //   })
    // }

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
  bottomPlaceholderItemClick:function(e){
    console.log(e)
    var id = e.currentTarget.id
    this.setData({     
      inputbuyValue: this.data.inputbuyValue + " " + this.data.bottomplaceholderdetail[id]   
    })
  },
  inputupdate: function (e) {
    console.log(e)
    var input = e.detail.value;
    this.setData({
      inputbuyValue: input
    })
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
      couponData: this.data.couponData,
      bottomplaceholderdetail: this.data.couponData[id - 1].placeholderdetail,
      inputbuyValue: '',
      defaultString: placeholder[id - 1]
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