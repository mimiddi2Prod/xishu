var delId = ''
var vm = new Vue({
	el:"#main",
	data:{
		mainList:[],
	},
	methods:{
		edit:function(id){
			console.info(id)
			var data = []
			data[0] = {}
			data[0].type = 'main'
		
			for(var t in this.mainList){
				if(id == this.mainList[t].id){
					data[0].data = this.mainList[t]
				}
			}
		
			data = JSON.stringify(data)
			localStorage.perList = data;
			window.location.href='edit.html';
		},
		delete_main:function(id){
			delId= id
			var text = ''
			for(var t in this.mainList){
				if(id == this.mainList[t].id){
					text = this.mainList[t].name
				}
			}
			$("#title").text("删除");
			$("#content").text('是否删除   ('+text + ')   删除后不可恢复')
		},
		toCategoryList:function(e){
			console.info(e)
			window.location.href='categoryList.html?id='+e;
		}		
	},
	watch:{

	}

})

function deletep(){
	if(delId){
		var data = {}
		data.id = delId
		data = JSON.stringify(data)
		var url = '../api/delMain'
		$.ajax({
			url:url,
			type:'post',
			contentType:'application/x-www-form-urlencoded',
			dataType:'json',
			data:data,
			success:function(res){
				console.info(res)
				if(res == "delSuccess"){
					location.reload(true)
				}
			}
		})
	}
}

getMainList()

function getMainList(){
	var data = {}
	// data.username = this.username
	// data.password = this.password
	data = JSON.stringify(data)
	//console.info(data)
	// debugger
	var url = '../api/getMainList'
	$.ajax({
		url:url,
		type:'post',
		contentType:'application/x-www-form-urlencoded',
		dataType:'json',
		data:data,
		success:function(res){
			console.info(res)
			vm.mainList = res
			$(document).ready(function(){
				$("#menu").load('menu.html');
			})
		}
	})
}