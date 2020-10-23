var mysql  = require('mysql'); 
var connection = mysql.createConnection({     
      host     : '127.0.0.1',       
      user     : 'root',              
      password : 'yhm7181587',
      port: '3306',                   
      database: 'xsxcx', 
});  
connection.connect();

function getTitle(){
    this.Service = function(version, data, callback){
      connection.query('SELECT * FROM banner',function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      } else if(!result.length){
        console.info('查询失败')
        return callback(1);
      }
	  
	 result = JSON.stringify(result);
    result = JSON.parse(result);
	 
	for(var i in result){
		result[i].img = JSON.parse(result[i].img).urls;
	}

     console.log('查询成功');
     return callback(result);
  });
    }
}

module.exports = getTitle;