Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
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
    current: 'tab1',
    tabs: [
      {
        key: 'tab1',
        title: 'Tab 1',
        content: 'Content of tab 1',

      },
      {
        key: 'tab2',
        title: 'Tab 2',
        content: 'Content of tab 2',
      },
      {
        key: 'tab3',
        title: 'Tab 3',
        content: 'Content of tab 3',
      },
      {
        key: 'tab4',
        title: 'Tab 4',
        content: 'Content of tab 4',
      },
      {
        key: 'tab5',
        title: 'Tab 5',
        content: 'Content of tab 5',
      },
      {
        key: 'tab6',
        title: 'Tab 6',
        content: 'Content of tab 6',
      },
      {
        key: 'tab7',
        title: 'Tab 7',
        content: 'Content of tab 7',
      },
    ],
    
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
  // 滚动切换标签样式
  switchTab: function (e) {
    console.log(e)
    // this.setData({
    //   // currentTab: e.detail.current
    // });
    // this.checkCor();
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
  onSwiperChange(e) {
    console.log('onSwiperChange', e)
    const { current: index, source } = e.detail
    const { key } = this.data.tabs[index]

    if (!!source) {
      this.setData({
        key,
        index,
      })
    }
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
  }
})
