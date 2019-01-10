const dataStrorage = require('../../utils/datastorage.js')

var bottomHeight = 0;
var windowHeight = 0;
var windowWidth = 0;

var currentTabId;

var currentItemId;

Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    list:[{
      name : 'v1'
    },{
        name: 'v2'
    }],
    mapHeight:'',
    curItemId:'',
    // latitude:0,
    // longitude:0,
    showmarker:false,
    markers:[],
    covers:[],
    // markers: [{
    //   id: 1,
    //   latitude: 23.099994,
    //   longitude: 113.324520,
    //   name: 'T.I.T 创意园',
    //   iconPath: '../image/location.png'
    // }],
  
    // covers: [{
    //   latitude: 23.099994,
    //   longitude: 113.344520,
    //   iconPath: '../image/location.png'
    // }, {
    //   latitude: 23.099994,
    //   longitude: 113.304520,
    //   iconPath: '../image/location.png'
    // }],
    current: '1',
    tabs: [
    {
      id: '1',
      tag: '帮我送',
    },
    {
      id: '2',
      tag: '帮我买',
    },{
      id: '3',
      tag: '帮我买3',
    }, {
      id: '4',
      tag: '帮我买4',
    }, {
      id: '5',
      tag: '帮我买5',
    }
  ],//dataStrorage.getTabs(),
    

    toView: 'yellow',
    scrollTop: 0,
    //滚动的数组
    scrolls: dataStrorage.getItemsByTabId('1'),

  },
  onTabsChange(e) {
    console.log('onTabsChange', e)
    const { key } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)

    this.setData({
      key,
      index,
    })
  },
  regionchange(e) {
    var that = this;
    console.log(e)
    if(e.type == 'end'){
      this.mapCtx.getCenterLocation({
        type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          console.log('lat = ' + latitude)
          console.log('long = ' + longitude)
          // wx.openLocation({
          //   latitude,
          //   longitude,
          //   scale: 18
          // })
          var currentmarkers = [{
            id: 2,
            latitude: latitude,
            longitude: longitude,
            iconPath: '../image/location.png',
            callout: {
              content: "老人头",
              bgColor: "#fff",
              color: "#f00",
              padding: 10,
              display: "ALWAYS",
              borderRadius: 5
            }
          }]
          console.log('showmarker = ' + that.data.showmarker)
          that.setData({
            markers :currentmarkers,
            showmarker :true
             });
          console.log('showmarker = ' + that.data.markers[0].latitude)
        }
      })
    }
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
    // this.mapCtx.moveToLocation()
    var that = this
    wx.getLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        that.changeMapHeight();
      }
    })
    },
  getCenterLocation: function () {
    var that = this
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude:23.10229,
        longitude:113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude:23.10229,
        longitude:113.3345211,
      }, {
        latitude:23.00229,
        longitude:113.3345211,
      }]
    })
  },

  changeMapHeight: function () {
    var that = this;
    var count = 0;
    wx.getSystemInfo({
      success: function (res) {
        windowHeight = res.windowHeight;
        windowWidth = res.windowWidth;

        //创建节点选择器
        var query = wx.createSelectorQuery();
        query.select('#bottom-layout').boundingClientRect()
        query.exec(function (res) {
          bottomHeight = res[0].height;
          that.setMapHeight();
        })
      }
    })
  },
  setMapHeight: function (params) {
    var that = this;
    that.setData({
      mapHeight: (windowHeight - bottomHeight) + 'px'
    })
  },


  onChange:function(e){
    console.log(e.detail.key);
    this.setData({
      current: e.detail.key,
      scrolls:dataStrorage.getItemsByTabId(e.detail.key)
    })
    currentTabId = this.data.current;
  },

  onitemClick:function(e){
    currentItemId = e.currentTarget.id;
    console.log(e.currentTarget.id);
    this.setData({
      curItemId: currentItemId
    })
    wx.navigateTo({
      url: '../logs/logs?tabId='+currentTabId+"&itemId="+currentItemId
    })
  },
  
  upper: function (e) {
    console.log('滚动到顶部')
  },
  lower: function (e) {
    console.log('滚动到底部')
  },
  scroll: function (e) {
    console.log(e)
  },

})
