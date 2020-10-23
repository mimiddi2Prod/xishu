var delcategory_id = ''
var vm = new Vue({
	el:"#categoryList",
	data:{
		categoryList:[],
		id:'',
	},
	methods:{
		edit:function(category_id){
			console.info(category_id)
			var data = []
			data[0] = {}
			data[0].type = 'categoryList'
			for(var t in this.categoryList){
				if(category_id == this.categoryList[t].category_id){
					data[0].data = this.categoryList[t]
				}
			}
		
			data = JSON.stringify(data)
			localStorage.perList = data;
			window.location.href='edit.html';
		},
		delete_categoryList:function(category_id){
			delcategory_id = category_id
			var text = ''
			for(var t in this.categoryList){
				if(delcategory_id == this.categoryList[t].category_id){
					text = this.categoryList[t].name
				}
			}
			// console.info(text)
			$("#title").text("删除");
			$("#content").text('是否删除   ('+text + ')   删除后不可恢复')
		},
		toCategoryDetail:function(e){
			console.info(e)
			window.location.href='categoryDetail.html?id='+e;
		},
		add:function(){
			console.info(this.categoryList)
			window.location.href='add.html?type=categoryList&id='+this.id;
		}		
	},
	watch:{

	}

})

function deletep(){
	console.info(1)
	if(delcategory_id){
		var data = {}
		data.categoryId = delcategory_id
		data = JSON.stringify(data)
		var url = '../api/delCategoryList'
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

getCategoryList()

function getCategoryList(){
	var url  = window.location.href
	var id = url.split('=')[1]
	vm.id = id
	var data = {}
	data.id = id
	data = JSON.stringify(data)
	var url = '../api/getCategoryList'
	$.ajax({
		url:url,
		type:'post',
		contentType:'application/x-www-form-urlencoded',
		dataType:'json',
		data:data,
		success:function(res){
			if(res != 1){
				vm.categoryList = res
			}
			$(document).ready(function(){
				$("#menu").load('menu.html');
			})
		}
	})
}