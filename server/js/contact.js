var delId = ''
var editId = ''
var vms = new Vue({
	el:"#main",
	data:{
		mainList:[],

		name:'',
		tel:'',
		mail:'',

		edit:true,

		commandData:{},
	},
	methods:{
		edt:function(id){
			this.edit = true
			// console.info(id)
			editId = id
			var name1 = ''
			for(var t in this.mainList){
				if(id == this.mainList[t].id){
					name1 = this.mainList[t].name
					this.commandData = this.mainList[t]
				}
			}
			$("#title").text("编辑");
			$("#content").text('是否更改   ('+name1 + ')   更改后不可恢复')

		},
		add:function(){
			var url = "../api/addContactUs"
			var data = {}
			data.name = this.name
			data.tel = this.tel
			data.mail = this.mail
			data = JSON.stringify(data)
			$.ajax({
				url:url,
					type:'post',
					contentType:'application/x-www-form-urlencoded',
					dataType:'json',
					data:data,
					success:function(res){
						console.info(res)
						if(res == "success"){
							location.reload(true)
						}
					}
				})
		},
		del:function(id){
			this.edit = false
			console.info(id)
			delId= id
			var name2 = ''
			for(var t in this.mainList){
				if(id == this.mainList[t].id){
					name2 = this.mainList[t].name
				}
			}
			$("#title").text("删除");
			$("#content").text('是否删除   ('+name2 + ')   删除后不可恢复')
		},		
	},
	watch:{

	}

})

function command(){
	var url = ''
	var data = {}
	console.info(vms.commandData)
	if(vms.edit){
		data = vms.commandData
		url = '../api/updateContactUs'
	}else{
		data.id = delId
		url = '../api/delContactUs'
	}
	data = JSON.stringify(data)
	$.ajax({
		url:url,
		type:'post',
		contentType:'application/x-www-form-urlencoded',
		dataType:'json',
		data:data,
		success:function(res){
			console.info(res)
			if(res == "delSuccess" || res == "success"){
				location.reload(true)
			}
		}
	})
}


getMainList()

function getMainList(){
	var data = {}
	data = JSON.stringify(data)
	var url = '../api/getContactUs'
	$.ajax({
		url:url,
		type:'post',
		contentType:'application/x-www-form-urlencoded',
		dataType:'json',
		data:data,
		success:function(res){
			console.info(res)
			vms.mainList = res
			$(document).ready(function(){
				$("#menu").load('menu.html');
			})
		}
	})
}