var mysql  = require('mysql'); 
var connection = mysql.createConnection({     
      host     : '127.0.0.1',       
      user     : 'root',              
      password : 'yhm7181587',
      port: '3306',                   
      database: 'xsxcx', 
});  
connection.connect();

function addTypeList(){
    this.Service = function(version, data, callback){
		var category_id = data.category_id
		var img = data.img
		var name = data.name
		var order_num = data.order_num
      connection.query('INSERT INTO category_detail (category_id,name,img,order_num) VALUES (?,?,?,?)',[category_id,name,img,order_num],function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }

     console.log('插入成功');
	 var data = 'success'
     return callback(data);
  });
    }
}

module.exports = addTypeList;