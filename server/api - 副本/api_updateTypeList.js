var mysql  = require('mysql'); 
var connection = mysql.createConnection({     
      host     : '127.0.0.1',       
      user     : 'root',              
      password : 'yhm7181587',
      port: '3306',                   
      database: 'xsxcx', 
});  
connection.connect();

function updateTypeList(){
    this.Service = function(version, data, callback){
		var img = data.img
		var name = data.name
		var order_num = data.order_num
		var commodity_id = data.commodity_id
      connection.query('UPDATE category_detail SET name = (?),img = (?),order_num = (?) WHERE commodity_id = (?)',[name,img,order_num,commodity_id],function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
		
     console.log('更新成功');
	 var data = 'success'
     return callback(data);
  });
    }
}

module.exports = updateTypeList;