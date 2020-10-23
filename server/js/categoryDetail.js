var delcategory_id = ''
var vm = new Vue({
	el:"#commodityInfo",
	data:{
		categoryDetail:[],
		category_id:'',
	},
	methods:{
		edit:function(commodity_id){
			console.info(commodity_id)
			var data = []
			data[0] = {}
			data[0].type = 'categoryDetail'
			for(var t in this.categoryDetail){
				if(commodity_id == this.categoryDetail[t].commodity_id){
					data[0].data = this.categoryDetail[t]
				}
			}
		
			data = JSON.stringify(data)
			localStorage.perList = data;
			window.location.href='edit.html';
		},
		delete_commodity:function(commodity_id){
			console.info(commodity_id)
			delcategory_id = commodity_id
			var text = ''
			for(var t in this.categoryDetail){
				if(delcategory_id == this.categoryDetail[t].commodity_id){
					text = this.categoryDetail[t].name
				}
			}
			console.info(text)
			$("#title").text("删除");
			$("#content").text('是否删除   ('+text + ')   删除后不可恢复')
		},
		toCommodityInfo:function(e){
			console.info(e)
			window.location.href='commodityInfo.html?id='+e;
		},
		add:function(){
			console.info(this.categoryList)
			window.location.href='add.html?type=categoryDetail&id='+ this.category_id;
		}		
	},
	watch:{

	}

})

function deletep(){
	console.info(1)
	if(delcategory_id){
		var data = {}
		data.commodityId = delcategory_id
		data = JSON.stringify(data)
		var url = '../api/delTypeList'
		$.ajax({
			url:url,
			type:'post',
			contentType:'application/x-www-form-urlencoded',
			dataType:'json',
			data:data,
			success:function(res){
				if(res == "delSuccess"){
					location.reload(true)
				}
			}
		})
	}
}

getCategoryDetail()

function getCategoryDetail(){
	var url  = window.location.href
	var id = url.split('=')[1]
	vm.category_id = id
	var data = {}
	data.categoryId = id
	data = JSON.stringify(data)
	var url = '../api/getCategoryDetail'
	$.ajax({
		url:url,
		type:'post',
		contentType:'application/x-www-form-urlencoded',
		dataType:'json',
		data:data,
		success:function(res){
			console.info(res)
			if(res != 1){
				vm.categoryDetail = res
			}	
			$(document).ready(function(){
				$("#menu").load('menu.html');
			})
		}
	})
}