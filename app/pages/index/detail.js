// pages/index/detail.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    price: '',
    item_number: '',
    imglist: [],
    commodityId: '',
  },

  bigimg: function (e) {
    console.info(e)
    var img = e.currentTarget.dataset.img
    var urls = []
    urls = this.data.img
    wx.previewImage({
      urls: urls,
      current: img
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var commodityId = options.commodity_id
    var commodityType = options.type

    wx.setNavigationBarTitle({
      title: commodityType,
    })

    this.setData({
      commodityId: commodityId
    })

    this.getCommodityInfo()
  },

  getCommodityInfo: function () {
    var self = this
    wx.showLoading({
      title: '加载中',
    })

    api.CommodityInfo(self.data.commodityId, function (res) {
      // console.info(res)
      if (res != 1) {
        res[0].img = res[0].img.map(val => {
          val = val + '?imageView2/2/w/1600/h/1600'
          return val
        })
        res[0].content = decodeURIComponent(res[0].content)
        self.setData({
          content: res[0].content,
          price: res[0].price,
          item_number: res[0].item_number,
          imglist: res[0].img
        })
      }
      wx.hideLoading()
      wx.stopPullDownRefresh()
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
    this.getCommodityInfo()
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