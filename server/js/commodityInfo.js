var delUrl = ''
var vms = new Vue({
    el:'#add',
    data:{
        commodity_id:'',//对应菜单id

        content:'',
        price:1,
        item_number:'',
        img:'',//input选择的图片
        imglist:[],

        isadd:true,

        upload_num:0,

        type:'',

        isActive:[{
            id:'content',
            show:false
        },{
            id:'price',
            show:false
        },{
            id:'item_number',
            show:false
        },{
            id:'imglist',
            show:false
        }],

        stop:false,

        key:[],
        imgUploadList:[]
    },
    methods:{
        delImg:function(url){
            delUrl  = url
            $("#title").text("删除");
            $("#content").text('是否删除图片')
        },
        down:function(tableid){
            if(getExplorer()=='ie')
                {
                var curTbl = document.getElementById(tableid);
                var oXL = new ActiveXObject("Excel.Application");
                var oWB = oXL.Workbooks.Add();
                var xlsheet = oWB.Worksheets(1);
                var sel = document.body.createTextRange();
                sel.moveToElementText(curTbl);
                sel.select();
                sel.execCommand("Copy");
                xlsheet.Paste();
                oXL.Visible = true;

                try {
                var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
                } catch (e) {
                print("Nested catch caught " + e);
                } finally {
                oWB.SaveAs(fname);
                oWB.Close(savechanges = false);
                oXL.Quit();
                oXL = null;
                idTmr = window.setInterval("Cleanup();", 1);
                }

                }
                else
                {
                tableToExcel(tableid)
                }
        },
        submit:function(submitType){
            this.stop = false
            for(var i in this.isActive){
                if(this.isActive[i].id == "content"){
                    if(this.content){
                        this.isActive[i].show = false
                    }else{
                       this.isActive[i].show = true
                       this.stop = true
                   }
               }
           //     if(this.isActive[i].id == "price"){
           //      if(this.price){
           //          this.isActive[i].show = false
           //      }else{
           //         this.isActive[i].show = true
           //         this.stop = true
           //     }
           // }
       //     if(this.isActive[i].id == "item_number"){
       //      if(this.item_number){
       //          this.isActive[i].show = false
       //      }else{
       //         this.isActive[i].show = true
       //         this.stop = true
       //     }
       // }
       if(this.isActive[i].id == "imglist"){
        if(this.imglist.length != 0){
            this.isActive[i].show = false
        }else{
           this.isActive[i].show = true
           this.stop = true
       }
   }
}

if(this.stop){
    return
}

//使内容在前端用无序列表展示
// var contentArr = this.content.split('\n')

// var content = "<ul>"
// for (var i = 0; i < contentArr.length; i++) {
//     content += "<li>" + contentArr[i] + "</li>"
// }
// content += "</ul>"
var content = this.content

// 基于order对imgList里的图片进行排序
var len = this.imglist.length
for(var e = 0; e < len; e++){
    for(var g = 0; g < len-1-e; g++){
        if(Number(this.imglist[g].order) > Number(this.imglist[g+1].order)){
            var temp = this.imglist[g+1]
            this.imglist[g+1] = this.imglist[g]
            this.imglist[g] = temp
        }
    }
}

// data提交数据
var data = {}
var self = this
content = encodeURIComponent(content)
data.content = content
data.price = this.price
data.item_number = this.item_number
data.commodityId = this.commodity_id
if(this.imgUploadList.length > 0){
   for(var k in this.imgUploadList){

    var file = this.imgUploadList[k].file
    var key = this.imgUploadList[k].key
    var token = this.imgUploadList[k].uploadToken
    var name = this.imgUploadList[k].name

    var t = 0

    uploadImg(key,token,name,file,function(res){
        t++
        for(var j in self.imglist){
            if(res.key == self.imglist[j].key){
                self.imglist[j].url = "http://xsxcx.qiniu.youyueworld.com/" + self.imglist[j].key
            }
        }
        // t 图片上传完毕之后才提交
        if(t == self.imgUploadList.length){
            var img = []
            for(var u in self.imglist){
                img.push(self.imglist[u].url)
            }
            data.img = img
            data = JSON.stringify(data)
            // console.info(data)
            var url = ""
            if(submitType == "add"){
                url = "../api/addDetail"
            }else if(submitType == "edit"){
                url = "../api/updateDetail"
            }
            $.ajax({
                url:url,
                type:'post',
                contentType:'application/x-www-form-urlencoded',
                dataType:'json',
                data:data,
                success:function(res){
                    // console.info(res)
                    if(res == "success"){
                        alert('提交成功')
                        location.reload();
                    }
                }
            })
        }
    })
}
}else{
            var img = []
            for(var u in self.imglist){
                img.push(self.imglist[u].url)
            }
            data.img = img
            data = JSON.stringify(data)
            // console.info(data)
            var url = ""
            if(submitType == "add"){
                url = "../api/addDetail"
            }else if(submitType == "edit"){
                url = "../api/updateDetail"
            }
            $.ajax({
                url:url,
                type:'post',
                contentType:'application/x-www-form-urlencoded',
                dataType:'json',
                data:data,
                success:function(res){
                    // console.info(res)
                    if(res == "success"){
                        alert('提交成功')
                        location.reload();
                    }
                }
            })
}



},
},
watch:{
    img: function (val) {
        // console.info(this.imglist)
        if(val){
            // 图片blob 用于上传
            var imgFile = document.getElementById('inputImg').files[0]
            var imgsrc = window.URL.createObjectURL(imgFile);
            var urlpath = imgsrc.substring(imgsrc.lastIndexOf("/")+1).toLowerCase()
            var filename = imgFile.name
            // imglist用于图片展示预览
            this.imglist.push({
                url:'',
                order:'',
                key:'',
            })
            this.imglist[this.imglist.length - 1].url = imgsrc
            this.imglist[this.imglist.length - 1].order = this.imglist.length - 1
            this.imglist[this.imglist.length - 1].key = urlpath
            // imgUploadList用于新增加的图片上传
            this.imgUploadList.push({
                url:'',
                key:'',
                name:'',
                file:'',
            })
            this.imgUploadList[this.imgUploadList.length - 1].url = imgsrc
            this.imgUploadList[this.imgUploadList.length - 1].key = urlpath
            this.imgUploadList[this.imgUploadList.length - 1].name = filename
            this.imgUploadList[this.imgUploadList.length - 1].file = imgFile
// console.info(this.imgUploadList)
            getUploadToken(urlpath,imgsrc)

        }
        },
    }
})

function deleteImg(){
    if(vms.imgUploadList.length != 0){
        for(var j in vms.imgUploadList){
            if(vms.imgUploadList[j].url == delUrl){
                vms.imgUploadList.splice(i,1)
            }
        }
    }
    for(var i in vms.imglist){
        if(vms.imglist[i].url == delUrl){
            vms.imglist.splice(i,1)
            $("#myModal").modal('hide')
        }
    }
}

// 判断浏览器
var idTmr;
function getExplorer() {
var explorer = window.navigator.userAgent ;
//ie
if (explorer.indexOf("MSIE") >= 0) {
return 'ie';
}
//firefox
else if (explorer.indexOf("Firefox") >= 0) {
return 'Firefox';
}
//Chrome
else if(explorer.indexOf("Chrome") >= 0){
return 'Chrome';
}
//Opera
else if(explorer.indexOf("Opera") >= 0){
return 'Opera';
}
//Safari
else if(explorer.indexOf("Safari") >= 0){
return 'Safari';
}
}

function Cleanup() {
window.clearInterval(idTmr);
CollectGarbage();
}
var tableToExcel = (function() {
var uri = 'data:application/vnd.ms-excel;base64,',
template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
format = function(s, c) {
return s.replace(/{(\w+)}/g,
function(m, p) { return c[p]; }) }
return function(table, name) {
if (!table.nodeType) table = document.getElementById(table)
var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
window.location.href = uri + base64(format(template, ctx))
}
})()

getCommodityInfo()

function getCommodityInfo(){
    var url  = window.location.href
    var id = url.split('=')[1]
    vms.commodity_id = id
    var data = {}
    data.commodityId = id
    data = JSON.stringify(data)
    var url = '../api/getCommodityInfo'
    $.ajax({
        url:url,
        type:'post',
        contentType:'application/x-www-form-urlencoded',
        dataType:'json',
        data:data,
        success:function(res){
            if (res != 1) {
                vms.isadd=false

                if (res[0].img != '') {
                    for(var q in res[0].img){
                        vms.imglist.push({
                            url:'',
                            order:'',
                            key:'',
                        })
                        vms.imglist[q].url = res[0].img[q]
                        vms.imglist[q].order = q
                    }
                }
                if (res[0].content != '') {
                  res[0].content = decodeURIComponent(res[0].content)
                  // var text = res[0].content
                  // text = text.replace('<ul>', '')
                  // text = text.replace('</ul>', '')
                  // text = text.split('<li>')
                  // text.shift()
                  // for (var i = 0; i < text.length; i++) {
                  //   text[i] = text[i].replace('</li>', '\n')
                  // }
                  // var content = ''
                  // for (var j = 0; j < text.length; j++) {
                  //   content += text[j]
                  // }
                  // vms.content = content
                  vms.content = res[0].content
                }

                vms.price = res[0].price
                vms.item_number = res[0].item_number
            }
            $(document).ready(function(){
                $("#menu").load('menu.html');
            })
        }
    })
}

function getUploadToken(key,url){
    var data = {}
    data.key = key
    data.tempFilePath = url
    data = JSON.stringify(data)
    console.info(data)
    var url = '../api/getUploadToken'
    $.ajax({
        url:url,
        type:'post',
        contentType:'application/x-www-form-urlencoded',
        dataType:'json',
        data:data,
        success:function(res){
            console.info(res)
            for(var k in vms.imgUploadList){
                if(vms.imgUploadList[k].key == res.key){
                    vms.imgUploadList[k].uploadToken = res.uploadToken
                }
            }
            // console.info(vms.imgUploadList)
        }
    })
}

// function getName(picname,callback){
//     var myDate = new Date();
//     var year = myDate.getFullYear()
//     var month = myDate.getMonth()+1
//     var date = myDate.getDate()
//     var hours = myDate.getHours()
//     var minutes = myDate.getMinutes()
//     var seconds = myDate.getSeconds()
//     var picname = '.' + picname.split('.')[1]

//     var imgName = year + '_' + month +'_' +  date + '_' + hours + '_' + minutes + '_' + seconds + picname
//     return callback(imgName)
// }


function uploadImg(key,token,name,file,callback){
    var putExtra = {
      fname: name,
      params: {},
      mimeType: null
  };

  var observer = {
    next(res){
        // console.info(res)
                // ...
                // if(flag == "img"){
                //     vms.imgpercent = res.total.percent + '%'
                // }

                // if(res.total.percent == 100){
                //     return callback('success')
                // }
            },
            error(err){
                // ...
            },
            complete(res){
                // ...
                // console.info(res)
                return callback(res)
            }
        }
        var config = {
          useCdnDomain: true,
          region: qiniu.region.z0
      };

      var observable = qiniu.upload(file, key, token, putExtra, config)
    var subscription = observable.subscribe(observer) // 上传开始

}
