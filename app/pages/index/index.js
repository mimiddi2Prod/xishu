const app = getApp()
const api = require('../../utils/api.js')

Page({
  data: {
    banner: [],
    product: [],
    catelog: [{
      title: "摄影",
      src: "https://mp.weixin.qq.com/s/HFpYmA8A3qshLg79K5BPPw"
    }, {
      title: "咖啡",
      src: "https://mp.weixin.qq.com/s/dsE4LECj2a1ztpVucggysA"
    }, {
      title: "花艺",
      src: "https://mp.weixin.qq.com/s/O0NPX41heqf3yI6R_oajiA"
    }, {
      title: "门店"
    }]
  },

  onLoad: function () {
    this.getMainList()
  },

  toDetail: function (e) {
    wx.navigateTo({
      url: 'category_list?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type,
    })
  },

  getMainList: function () {
    var self = this
    wx.showLoading({
      title: '加载中',
    })

    api.banner(function (res) {
      // console.info(res)
      res[0].img = res[0].img.map(val => {
        val = val + '?imageView2/2/w/800/h/800'
        return val
      })
      self.setData({
        banner: res[0].img
      })
    })

    api.MainList(function (res) {
      // console.info(res)
      res = res.map(val => {
        val.img = val.img + '?imageView2/2/w/800/h/800'
        val.icon = val.icon + '?imageView2/2/w/400/h/400'
        return val
      }).filter(val => {
        return val.id != 80
      })
      self.setData({
        product: res
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // this.getMainList()
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  }

})