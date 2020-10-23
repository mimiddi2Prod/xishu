		var vm = new Vue({
			el:"#login",
			data:{
				username:'',
				password:'',
			},
			methods:{
				login:function(){
					var data = {}
					data.username = this.username
					data.password = this.password
					data = JSON.stringify(data)
					//console.info(data)
					// debugger
					var url = './api/login'
					$.ajax({
						url:url,
						type:'post',
						contentType:'application/x-www-form-urlencoded',
						dataType:'json',
						data:data,
						success:function(res){
							if(res == "0"){
								sessionStorage.setItem("admin",'0');
								window.location.href = "./html/main.html"
							}else{
								alert(res);
							}
						}
					})
				},
			},
			watch:{

			}

		})
		
		$(document).ready(function(){
			
		})