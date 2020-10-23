var mysql  = require('mysql'); 
var connection = mysql.createConnection({     
      host     : '127.0.0.1',       
      user     : 'root',              
      password : 'yhm7181587',
      port: '3306',                   
      database: 'xsxcx', 
});  
connection.connect();

function updateContactUs(){
    this.Service = function(version, data, callback){
		var mail = data.mail
		var tel = data.tel
		var name = data.name
		var id = data.id
      connection.query('UPDATE contact_us SET mail = (?),tel = (?),name = (?) WHERE id = (?)',[mail,tel,name,id],function (err, result) {
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

module.exports = updateContactUs;