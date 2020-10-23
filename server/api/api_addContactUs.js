var mysql  = require('mysql'); 
var connection = mysql.createConnection({     
      host     : '127.0.0.1',       
      user     : 'root',              
      password : 'yhm7181587',
      port: '3306',                   
      database: 'xsxcx', 
});  
connection.connect();

function addContactUs(){
    this.Service = function(version, data, callback){
		var name = data.name
		var tel = data.tel
		var mail = data.mail
      connection.query('INSERT INTO contact_us (name,tel,mail) VALUES (?,?,?)',[name,tel,mail],function (err, result) {
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

module.exports = addContactUs;