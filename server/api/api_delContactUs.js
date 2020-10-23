var mysql  = require('mysql'); 
var connection = mysql.createConnection({     
      host     : '127.0.0.1',       
      user     : 'root',              
      password : 'yhm7181587',
      port: '3306',                   
      database: 'xsxcx', 
});  
connection.connect();

function delContactUs(){
    this.Service = function(version, data, callback){
		var id = data.id
      connection.query('DELETE FROM contact_us WHERE id = (?)',[id],function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }

     console.log('删除成功');
	 var data = 'delSuccess'
     return callback(data);
  });
    }
}

module.exports = delContactUs;