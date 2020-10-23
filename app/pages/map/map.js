// pages/map/map.js
let plugin = requirePlugin("routePlan")
let key = "H3PBZ-VOTWF-H2UJQ-NSEKS-SIHVQ-HFFXQ"
let referer = "TOHER喜树" // 调用插件的app的名称
let endPoint = JSON.stringify({
  name: "TOHER喜树",
  latitude: "30.545221",
  longitude: "104.085702"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: "104.085702",
    latitude: "30.545221",
    markers: [{
      iconPath: "/image/marker.png",
      id: 0,
      latitude: 30.545221,
      longitude: 104.085702,
      width: 50,
      height: 50,
      callout: {
        content: "TOHER喜树",
        display: "ALWAYS"
      }
    }],
  },
  routePlan() {
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + "&referer=" + referer + "&endPoint=" + endPoint,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    wx.getSystemInfo({
      complete: (res) => {
        console.info(res)
        self.setData({
          height: (750 / res.windowWidth * res.windowHeight) + "rpx"
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})