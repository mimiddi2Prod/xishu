var vm = new Vue({
	el:"#example-navbar-collapse",
	data:{
		isActive:[{
			name:"main",
			active:true
		},{
			name:"banner",
			active:false
		},{
			name:"my",
			active:false
		}]
	},
})
		
$(document).ready(function(){
	var url  = window.location.href
	var active = url.split('/')[4].split('.')[0]
	if(active == "pic" || active == "contact"){
		active = 'my'
	}
	for(var i in vm.isActive){
		vm.isActive[i].active = false
		if(vm.isActive[i].name == active){
			vm.isActive[i].active = true
		}
	}
})

function signOut(){
	sessionStorage.removeItem("admin");
}