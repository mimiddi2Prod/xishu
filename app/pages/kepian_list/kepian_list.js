// pages/kepian_list/kepian_list.js
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
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
    wx.showLoading({
      title: '加载中',
    })
    // 客片推荐固定id=80 二级分类为category_id=121 使用首页及之后的接口逻辑再筛选数据
    api.CategoryDetail(121, function (res) {
      console.info(res)
      res = res.map(val => {
        val.img = val.img + '?imageView2/2/w/800/h/800'
        return val
      })
      self.setData({
        show_list: res
      })
      wx.hideLoading()
    })
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/index/detail?type=' + e.currentTarget.dataset.type + '&commodity_id=' + e.currentTarget.dataset.id,
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