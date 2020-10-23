const api = require('../../utils/api.js')
let plugin = requirePlugin("routePlan")
let key = "H3PBZ-VOTWF-H2UJQ-NSEKS-SIHVQ-HFFXQ"
let referer = "TOHER喜树" // 调用插件的app的名称
let endPoint = JSON.stringify({
  name: "TOHER喜树",
  latitude: "30.545221",
  longitude: "104.085702"
})
Page({
  data: {
    img: '',
    QQ: '',
    Tel: '',
    content: '',

    // 地图
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
    height:"300rpx"
  },
  routePlan() {
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + "&referer=" + referer + "&endPoint=" + endPoint,
    })
  },
  onLoad: function() {
    var self = this
    api.ContactUsImgTxt(function(res){
      self.setData({
        img: res[0].img,
        content: res[0].content,
      })
    })
    api.ContactUs(function(res) {
      self.setData({
        contact_us:res,
      })
    })
  },

  Clipboar: function(e) {
    var text = e.currentTarget.dataset.text.toString()
    wx.setClipboardData({
      data: text,
    })
  },

  call: function(e) {
    var tel = e.currentTarget.dataset.text.toString()
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    var self = this
    api.ContactUsImgTxt(function (res) {
      self.setData({
        img: res[0].img,
        content: res[0].content,
      })
      wx.stopPullDownRefresh()
    })
    api.ContactUs(function (res) {
      self.setData({
        contact_us: res,
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  }
})