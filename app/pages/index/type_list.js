// pages/index/type_list.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_list: [],
    categoryId: '',
  },

  toDetail: function (e) {
    wx.navigateTo({
      url: 'detail?type=' + e.currentTarget.dataset.type + '&commodity_id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var categoryId = options.category_id
    var categoryType = options.category_type

    this.setData({
      categoryId: categoryId
    })

    wx.setNavigationBarTitle({
      title: categoryType,
    })

    this.getCategoryDetail()
  },

  getCategoryDetail: function () {
    var self = this
    wx.showLoading({
      title: '加载中',
    })

    api.CategoryDetail(self.data.categoryId, function (res) {
      // console.info(res)
      res = res.map(val => {
        val.img = val.img + '?imageView2/2/w/800/h/800'
        return val
      })
      self.setData({
        show_list: res
      })
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
    this.getCategoryDetail()
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