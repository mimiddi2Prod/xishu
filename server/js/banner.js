var vms = new Vue({
	el:"#banner",
	data:{
		img:'',//input的值
		imglist:[],

		// isActive:[{
		// 	id:'imglist',
		// 	show:false
		// }],

		// stop:false,
		imgUploadList:[]
	},
	methods:{
		delImg:function(url){
            delUrl  = url
            $("#title").text("删除");
            $("#content").text('是否删除图片')
        },
		submit:function(){
			// this.stop = false
			// for(var i in this.isActive){
			// 	if(this.isActive[i].id == "imglist"){
			// 		if(this.imglist.length != 0){
			// 			this.isActive[i].show = false
			// 		}else{
			// 			this.isActive[i].show = true
			// 			this.stop = true
			// 		}
			// 	}
			// }

			// if(this.stop){
			// 	return
			// }

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
        	console.info(data)
        	var url = "../api/updateBanner"
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
        }
    })
	}
}else{
	var img = []
	if(self.imglist.length > 0){
		console.info(1)
		for(var u in self.imglist){
			img.push(self.imglist[u].url)
		}
	}else{
		img = {"img":[]}
	}

	console.info(img)
	data.img = img
	data = JSON.stringify(data)
	console.info(data)
	var url = "../api/updateBanner"
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
}



},

},
watch:{
	img: function (val) {
		console.info(this.imglist)
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
console.info(this.imgUploadList)
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

getBanner()

function getBanner(){
	var data = {}
	// data.username = this.username
	// data.password = this.password
	data = JSON.stringify(data)
	//console.info(data)
	// debugger
	var url = '../api/getBanner'
	$.ajax({
		url:url,
		type:'post',
		contentType:'application/x-www-form-urlencoded',
		dataType:'json',
		data:data,
		success:function(res){
			console.info(res)
			if(res[0].img.length > 0){
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
	var url = '../api/getUploadToken'
	$.ajax({
		url:url,
		type:'post',
		contentType:'application/x-www-form-urlencoded',
		dataType:'json',
		data:data,
		success:function(res){
			for(var k in vms.imgUploadList){
				if(vms.imgUploadList[k].key == res.key){
					vms.imgUploadList[k].uploadToken = res.uploadToken
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
