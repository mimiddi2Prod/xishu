const url = require('../utils/config.js')

function contact_us(callback) {
  wx.request({
    url: url.getContactUs,
    data: {
      // contact: 0
    },
    method: 'POST',
    success: function(res) {
      // console.info(res)
      // if (res.data.code == 0) {
        return callback(res.data)
      // }
    }
  })
}

function contact_us_img_txt(callback) {
  wx.request({
    url: url.getContactUsImgTxt,
    data: {
      // contact: 0
    },
    method: 'POST',
    success: function (res) {
      // console.info(res)
      // if (res.data.code == 0) {
      return callback(res.data)
      // }
    }
  })
}

function banner(callback) {
  wx.request({
    url: url.getBanner,
    data: {
      // banner: 0
    },
    method: "post",
    success: function(res) {
      // console.info(res)
      // if(res.data.code == 0){
        return callback(res.data)
      // }
    }
  })
}

function main_list(callback) {
  wx.request({
    url: url.getMainList,
    data: {
      // categorylist: 0
    },
    method: 'POST',
    success: function (res) {
      // console.info(res)
      // if (res.data.code == 0) {
      return callback(res.data)
      // }
    }
  })
}

function category_list(id,callback) {
  wx.request({
    url: url.getCategoryList,
    data: {
      id: id
    },
    method: 'POST',
    success: function(res) {
      // console.info(res)
      // if (res.data.code == 0) {
        return callback(res.data)
      // }
    }
  })
}

function category_detail(category_id, callback) {
  wx.request({
    url: url.getCategoryDetail,
    data: {
      categoryId: category_id
    },
    method: 'POST',
    success: function(res) {
      console.info(res)
      // if (res.data.code == 0) {
        return callback(res.data)
      // }
    }
  })
}

function commodity_info(commodity_id, callback) {
  wx.request({
    url: url.getCommodityInfo,
    data: {
      commodityId: commodity_id
    },
    method: 'POST',
    success: function(res) {
      console.info(res)
        return callback(res.data)
    }
  })
}

module.exports = {
  ContactUs: contact_us,
  ContactUsImgTxt:contact_us_img_txt,
  MainList: main_list,
  CategoryList: category_list,
  CategoryDetail: category_detail,
  CommodityInfo: commodity_info,
  banner: banner,
};