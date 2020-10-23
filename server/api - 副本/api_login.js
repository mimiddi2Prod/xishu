var mysql  = require('mysql'); 
var connection = mysql.createConnection({     
      host     : '127.0.0.1',       
      user     : 'root',              
      password : 'yhm7181587',
      port: '3306',                   
      database: 'xsxcx', 
});  
connection.connect();

function login(){
    this.Service = function(version, data, callback){
    	console.info(data)
    	connection.query('SELECT * FROM edit_login',function (err, result) {
    		if(err){
    			console.log('[SELECT ERROR] - ',err.message);
    			return;
    		} else if(!result.length){
    			return callback(1);
    		}

    		if(result[0].username != data.username){
    			return callback('Username Error!!!');
    		}else if(result[0].password != data.password){
    			return callback('Password Error!!!');
    		}else{
    			return callback(0);
    		}

    	});
    }
}

module.exports = login;