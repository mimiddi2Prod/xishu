var mysql  = require('mysql'); 
var connection = mysql.createConnection({     
      host     : '127.0.0.1',       
      user     : 'root',              
      password : 'yhm7181587',
      port: '3306',                   
      database: 'xsxcx', 
});  
connection.connect();

function addMain(){
    this.Service = function(version, data, callback){
		var img = data.img
		var name = data.name
		var order_num = data.order_num
		var icon = data.icon
      connection.query('INSERT INTO main_list (name,img,order_num,icon) VALUES (?,?,?,?)',[name,img,order_num,icon],function (err, result) {
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

module.exports = addMain;