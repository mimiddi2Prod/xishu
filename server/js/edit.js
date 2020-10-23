var vm = new Vue({
    el:'#update',
    data:{
        list:'',
        // name:'',
        // order_num:'',
        img:'',
        icon:'',

        imgFile:'',
        iconFile:'',

        // imgpercent:'0%',
        // iconpercent:'0%',
        imgsrc:'',
        iconsrc:'',

        upload_num:0,

        type:'',

        isActive:[{
            id:'name',
            show:false
        },{
            id:'order_num',
            show:false
        },{
            id:'img',
            show:false
        }],

        stop:false,

        key:[],
        imgUploadList:[{
            name:'img',
            url:'',
            key:'',
        }]
    },
    methods:{
        update:function(){
            this.stop = false
            for(var i in this.isActive){
                if(this.isActive[i].id == "name"){
                    if(this.list.name){
                        this.isActive[i].show = false
                    }else{
                       this.isActive[i].show = true
                       this.stop = true
                   }
               }
               if(this.isActive[i].id == "order_num"){
                if(this.list.order_num){
                    this.isActive[i].show = false
                }else{
                   this.isActive[i].show = true
                   this.stop = true
               }
           }
           if(this.isActive[i].id == "img"){
            if(this.list.img){
                this.isActive[i].show = false
            }else{
               this.isActive[i].show = true
               this.stop = true
           }
       }
       if(this.type == "main"){
        if(this.isActive[i].id == "icon"){
            if(this.list.icon){
                this.isActive[i].show = false 
            }else{
               this.isActive[i].show = true
               this.stop = true
           }
       } 
   }

}

if(this.stop){
    return
}

var data = {}
// data.name = this.list.name
// data.order_num = this.list.order_num
    var self = this
if(this.imgFile || this.iconFile){
for(var r in this.imgUploadList){
    if(!this.imgUploadList[r].key){  
        this.imgUploadList.splice(r,1)
    }  
}

for(var k in this.imgUploadList){
    var file = {}
    var key = this.imgUploadList[k].key
    var token = this.imgUploadList[k].uploadToken
    var name = ''
    var flag =  this.imgUploadList[k].name
    if(this.imgUploadList[k].name == 'img'){
        name = this.imgFile.name
        file = this.imgFile
    }else{
        name = this.iconFile.name
        file = this.iconFile
    }

    // var t = 0

    uploadImg(flag,key,token,name,file,function(res){
                for(var j in self.imgUploadList){
                    if(self.imgUploadList[j].name == "img" && self.imgFile){
                        self.list.img = "http://xsxcx.qiniu.youyueworld.com/" + self.imgUploadList[j].key
                    }else{
                        self.list.img = self.list.img
                    }
                    if(self.imgUploadList[j].name == "icon" && self.iconFile){
                        self.list.icon = "http://xsxcx.qiniu.youyueworld.com/" + self.imgUploadList[j].key
                    }else{
                        self.list.icon = self.list.icon
                    }
                }
                data = JSON.stringify(self.list)
                console.info(data)
                var url = ""
                if(self.type == "main"){
                    url = '../api/updateMain'
                }else if(self.type == "categoryList"){
                    url = '../api/updateCategoryList'
                }else if(self.type == "categoryDetail"){
                    url = '../api/updateTypeList'
                }
                $.ajax({
                    url:url,
                    type:'post',
                    contentType:'application/x-www-form-urlencoded',
                    dataType:'json',
                    data:data,
                    success:function(res){
                        console.info(res)
                        if(res == "success"){
                            alert('提交成功')
                            history.back(-1);
                        }
                    }
                }) 

            })
}
}else{
    // data.img = this.list.img
    // data.icon = this.list.icon
    data = JSON.stringify(self.list)
                console.info(data)
                var url = ""
                if(self.type == "main"){
                    url = '../api/updateMain'
                }else if(self.type == "categoryList"){
                    url = '../api/updateCategoryList'
                }else if(self.type == "categoryDetail"){
                    url = '../api/updateTypeList'
                }
                $.ajax({
                    url:url,
                    type:'post',
                    contentType:'application/x-www-form-urlencoded',
                    dataType:'json',
                    data:data,
                    success:function(res){
                        console.info(res)
                        if(res == "success"){
                            alert('提交成功')
                            history.back(-1);
                        }
                    }
                }) 
}



}
},
watch:{
    img: function (val) {
            
            if(val){
                // 图片blob 用于上传
                this.imgFile = document.getElementById('inputImg').files[0]

                // 图片预览
                // var reads = new FileReader();
                // reads.readAsDataURL(this.imgFile)
                // reads.onload = function(e){

                // }
                this.imgsrc = window.URL.createObjectURL(this.imgFile);

                getUpload('img',this.imgsrc)
            }else{
                this.imgFile = ''
                this.imgsrc = ''
            }

        },
        icon:function(val){
            if(val){
                this.iconFile = document.getElementById('inputIcon').files[0]
                this.iconsrc = window.URL.createObjectURL(this.iconFile);
                // console.info(this.iconsrc)
                getUpload('icon',this.iconsrc)
            }else{
                this.iconFile = ''
                this.iconsrc = ''
            }
        }
    }
})

$(document).ready(function(){
    var globalData = JSON.parse(localStorage.perList)[0]
    console.info(globalData)
        vm.list = globalData.data
        vm.type = globalData.type
    if(globalData.type == 'main'){
        vm.isActive.push({
            id:'icon',
            show:false
        })
        vm.imgUploadList.push({
            name:'icon',
            url:'',
            key:'',
        })
    }

})

function getUpload(name,url){
    if(url){
     var urlpath = url.substring(url.lastIndexOf("/")+1).toLowerCase()
     for(var i in vm.imgUploadList){
        if(vm.imgUploadList[i].name == name){
            vm.imgUploadList[i].url = url
            vm.imgUploadList[i].key = urlpath
        }
        if(vm.type == "main"){
            if(vm.imgUploadList[i].name == name){
                vm.imgUploadList[i].url = url
                vm.imgUploadList[i].key = urlpath
            }
        }
    }

    // if(vm.type == "main"){
       // if(vm.img && vm.icon){
           for(var j in vm.imgUploadList){
            getUploadToken(vm.imgUploadList[j].key,vm.imgUploadList[j].url)
        }
    // } 
// }else{
    // if(vm.img){
       // for(var j in vm.imgUploadList){
        // getUploadToken(vm.imgUploadList[j].key,vm.imgUploadList[j].url)
    // }
// } 
// }
}
}

function getUploadToken(key,url){
    var data = {}
    data.key = key
    data.tempFilePath = url
    data = JSON.stringify(data)
    var url = '../api/getUploadToken'
    $.ajax({
        url:url,
        type:'post',
        contentType:'application/x-www-form-urlencoded',
        dataType:'json',
        data:data,
        success:function(res){
            for(var k in vm.imgUploadList){
                if(vm.imgUploadList[k].key == res.key){
                    vm.imgUploadList[k].uploadToken = res.uploadToken
                }
            }
            // console.info(vm.imgUploadList)
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


function uploadImg(flag,key,token,name,file,callback){
    console.info(flag)
    var putExtra = {
      fname: name,
      params: {},
      mimeType: null
  };

  var observer = {
    next(res){
                // ...
                if(flag == "img"){
                    vm.imgpercent = res.total.percent + '%'
                }
                if(flag == "icon"){
                    vm.iconpercent = res.total.percent + '%'
                }

                if(res.total.percent == 100){
                    return callback('success')
                }
            },
            error(err){
                // ...
            }, 
            complete(res){
                // ...
                console.info(res)
            }
        }
        var config = {
          useCdnDomain: true,
          region: qiniu.region.z0
      };

      var observable = qiniu.upload(file, key, token, putExtra, config)
    var subscription = observable.subscribe(observer) // 上传开始

}