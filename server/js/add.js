var vm = new Vue({
    el:'#add',
    data:{
        id:'',//用于标识对应一级菜单

        name:'',
        order_num:'',
        img:'',
        icon:'',

        imgFile:'',
        iconFile:'',

        imgpercent:'0%',
        iconpercent:'0%',
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

        stop:false, //所有输入都有数据才能提交

        key:[],
        imgUploadList:[{
            name:'img',
            url:'',
            key:'',
        }]
    },
    methods:{
        add:function(){
            this.stop = false
            for(var i in this.isActive){
                if(this.isActive[i].id == "name"){
                    if(this.name){
                        this.isActive[i].show = false
                    }else{
                       this.isActive[i].show = true
                       this.stop = true
                   }
               }
               if(this.isActive[i].id == "order_num"){
                if(this.order_num){
                    this.isActive[i].show = false
                }else{
                   this.isActive[i].show = true
                   this.stop = true
               }
           }
           if(this.isActive[i].id == "img"){
            if(this.img){
                this.isActive[i].show = false
            }else{
               this.isActive[i].show = true
               this.stop = true
           }
       }
       if(this.type == "main"){
        if(this.isActive[i].id == "icon"){
            if(this.icon){
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
data.name = this.name
data.order_num = this.order_num

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
    var self = this
    uploadImg(flag,key,token,name,file,function(res){
                for(var j in self.imgUploadList){
                    if(self.imgUploadList[j].name == "img"){
                        data.img = "http://xsxcx.qiniu.youyueworld.com/" + self.imgUploadList[j].key
                    }
                    if(self.imgUploadList[j].name == "icon"){
                        data.icon = "http://xsxcx.qiniu.youyueworld.com/" + self.imgUploadList[j].key
                    }
                }
                
                var url = ""
                console.info(self.type)
                if(self.type == "main"){
                    url = '../api/addMain'
                }else if(self.type == "categoryList"){
                    url = '../api/addCategoryList'
                    data.id = self.id
                }else if(self.type == "categoryDetail"){
                    url = '../api/addTypeList'
                    data.category_id = self.id
                }
                data = JSON.stringify(data)
                console.info(data)
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
                            location.reload();
                        }
                    }
                }) 

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
    var url = location.href
    var num = url.indexOf('?')
    url = url.substr(num+1)
    var parameter = url.split('&')
    var str = {}
    var temp = []
    for(var i in parameter){
        temp = parameter[i].split('=')
        // console.info(temp)
        str[temp[0]] = temp[1]
    }
    vm.type = str.type
    if(str.type == 'main'){
        
        vm.isActive.push({
            id:'icon',
            show:false
        })
        vm.imgUploadList.push({
            name:'icon',
            url:'',
            key:'',
        })
    }else if(str.type == "categoryList"){
        vm.id = str.id
    }else if(str.type == "categoryDetail"){
        vm.id = str.id
        // console.info(str)
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

    if(vm.type == "main"){
       if(vm.img && vm.icon){
           for(var j in vm.imgUploadList){
            getUploadToken(vm.imgUploadList[j].key,vm.imgUploadList[j].url)
        }
    } 
}else{
    if(vm.img){
       for(var j in vm.imgUploadList){
        getUploadToken(vm.imgUploadList[j].key,vm.imgUploadList[j].url)
    }
} 
}
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