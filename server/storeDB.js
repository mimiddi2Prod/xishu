
function dbController(){
	var mysql  = require('mysql'); 
	var connection = mysql.createConnection({     
		host     : '127.0.0.1',       
		user     : 'root',              
		password : 'yhm7181587',
		port: '3307',                   
		database: 'xsxcx',
	});  
	connection.connect()
}

module.exports = {
	dbController:dbController
}

