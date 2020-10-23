const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_list: [],
    id: '',
    Data_disappears_in_outer_space: false,
    // cha: [{
    //   name: '水果茶',
    //   image: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3472925928,2631794860&fm=173&s=5DA004D540B3B1DAD2BC9EA903002005&w=640&h=587&img.JPEG',
    // }, {
    //   name: '岩茶',
    //   image: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1802618924,2318534440&fm=85&app=57&f=JPEG?w=121&h=75&s=C2321FC6CAB22A8631C9F1060300E043',
    // }, {
    //   name: '绿茶',
    //   image: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1889767689,3012965168&fm=58&bpow=800&bpoh=800',
    // }],

    // haixianganhuo: [{
    //   name: '山珍',
    //   image: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=82738914,3222229171&fm=85&app=57&f=JPEG?w=121&h=75&s=0F527A81840130EE64187D060300B0D1',
    // }, {
    //   name: '海味',
    //   image: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2677596033,3821881208&fm=58&bpow=600&bpoh=450',
    // }],

    // guochandianxin: [{
    //   name: '糖',
    //   image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4097062807,1577115292&fm=27&gp=0.jpg',
    // }, {
    //   name: '饼',
    //   image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2743043091,2740604877&fm=27&gp=0.jpg',
    // }, {
    //   name: '糕点',
    //   image: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2183402925,364802563&fm=58&bpow=600&bpoh=396',
    // }],

    // jinkoulingshi: [{
    //   name: '糖',
    //   image: 'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=4040224442,2014694309&fm=85&s=11965C9612A04EBD75A20BBE0300802B',
    // }, {
    //   name: '饼',
    //   image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2161929516,1052199983&fm=27&gp=0.jpg',
    // }, {
    //   name: '膨化食品',
    //   image: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2953536631,3723786654&fm=85&app=57&f=JPEG?w=121&h=75&s=D10AB9577440FB07DE7A146203006039',
    // }],

    // hongjiu: [{
    //   name: '法国',
    //   image: 'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=3585509332,1902704901&fm=202&src=2000&mola=new&crop=v1',
    // }],

    // lihe: [{
    //   name: '婚庆',
    //   image: 'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2318269876,300839771&fm=202&src=608&mola=new&crop=v1',
    // }],

    // qita: [{
    //   name: '洗护用品',
    //   image: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=615129175,1758336190&fm=179&app=42&f=JPEG?w=242&h=242',
    // }],

  },

  toDetail: function (e) {
    wx.navigateTo({
      url: 'type_list?category_type=' + e.currentTarget.dataset.type + '&category_id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var type = options.type

    wx.setNavigationBarTitle({
      title: type,
    })
    this.setData({
      id: id
    })

    this.getCategoryList()
  },

  getCategoryList: function () {
    var self = this
    wx.showLoading({
      title: '加载中',
    })

    api.CategoryList(self.data.id, function (res) {
      // console.info(res)
      if (res == 1) {
        self.setData({
          Data_disappears_in_outer_space: true
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
        return
      }
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
    this.getCategoryList()
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