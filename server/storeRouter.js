function CuteRouter(){    
    this.Service = function(data, url, callback){
        var baseApi = {};
        var arr = url.split("/");
        var version = arr[1];
        var apiFunction = arr[2];

        switch(apiFunction){            
            case "login":
                var login = require("./api/api_login.js");
                baseApi = new login;
                break;
            case "getTitle":
                var getTitle = require("./api/api_getTitle.js");
                baseApi = new getTitle;
                break;
            case "getContactUs":
                var getContactUs = require("./api/api_getContactUs.js");
                baseApi = new getContactUs;
                break;
            case "getContactUsImgTxt":
                var getContactUsImgTxt = require("./api/api_getContactUsImgTxt.js");
                baseApi = new getContactUsImgTxt;
                break;
             case "getBanner":
                var getBanner = require("./api/api_getBanner.js");
                baseApi = new getBanner;
                break;
			case "getMainList":
                var getMainList = require("./api/api_getMainList.js");
                baseApi = new getMainList;
                break;
            case "getCategoryList":
                var getCategoryList = require("./api/api_getCategoryList.js");
                baseApi = new getCategoryList;
                break;
            case "getCategoryDetail":
                var getCategoryDetail = require("./api/api_getCategoryDetail.js");
                baseApi = new getCategoryDetail;
                break;
            case "getCommodityInfo":
                var getCommodityInfo = require("./api/api_getCommodityInfo.js");
                baseApi = new getCommodityInfo;
                break;
			case "getUploadToken":
                var getUploadToken = require("./api/api_getUploadToken.js");
                baseApi = new getUploadToken;
                break;
			case "addMain":
                var addMain = require("./api/api_addMain.js");
                baseApi = new addMain;
                break;
			case "addCategoryList":
                var addCategoryList = require("./api/api_addCategoryList.js");
                baseApi = new addCategoryList;
                break;
			case "addTypeList":
                var addTypeList = require("./api/api_addTypeList.js");
                baseApi = new addTypeList;
                break;
			case "addDetail":
                var addDetail = require("./api/api_addDetail.js");
                baseApi = new addDetail;
                break;
			case "addContactUs":
                var addContactUs = require("./api/api_addContactUs.js");
                baseApi = new addContactUs;
                break;
			case "delMain":
                var delMain = require("./api/api_delMain.js");
                baseApi = new delMain;
                break;
			case "delCategoryList":
                var delCategoryList = require("./api/api_delCategoryList.js");
                baseApi = new delCategoryList;
                break;
			case "delTypeList":
                var delTypeList = require("./api/api_delTypeList.js");
                baseApi = new delTypeList;
                break;
			case "delDetail":
                var delDetail = require("./api/api_delDetail.js");
                baseApi = new delDetail;
                break;
			case "delContactUs":
                var delContactUs = require("./api/api_delContactUs.js");
                baseApi = new delContactUs;
                break;
			case "updateMain":
                var updateMain = require("./api/api_updateMain.js");
                baseApi = new updateMain;
                break;
			case "updateCategoryList":
                var updateCategoryList = require("./api/api_updateCategoryList.js");
                baseApi = new updateCategoryList;
                break;
			case "updateTypeList":
                var updateTypeList = require("./api/api_updateTypeList.js");
                baseApi = new updateTypeList;
                break;
			case "updateDetail":
                var updateDetail = require("./api/api_updateDetail.js");
                baseApi = new updateDetail;
                break;
			case "updateBanner":
                var updateBanner = require("./api/api_updateBanner.js");
                baseApi = new updateBanner;
                break;
			case "updateContactUsImgTxt":
                var updateContactUsImgTxt = require("./api/api_updateContactUsImgTxt.js");
                baseApi = new updateContactUsImgTxt;
                break;
			case "updateContactUs":
                var updateContactUs = require("./api/api_updateContactUs.js");
                baseApi = new updateContactUs;
                break;
            case "uploadImg":
                var uploadImg = require("./api/api_uploadImg.js");
                baseApi = new uploadImg;
                break;
            default:
                callback({code:4, data:{}, error:"api错误"});
                return;
        }

        return baseApi.Service(version, data, callback);
    }
}

module.exports = CuteRouter;