var mysql  = require('mysql'); 
var connection = mysql.createConnection({     
  host     : '127.0.0.1',       
  user     : 'root',              
  password : 'yhm7181587',
  port: '3306',                   
  database: 'xsxcx', 
});  
connection.connect();

function getCommodityInfo(){
  this.Service = function(version, data, callback){
   connection.query('SELECT * FROM commodity_info WHERE commodity_id = '+ data.commodityId,function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      } else if(!result.length){
        console.info('查询失败')
        return callback(1);
      }

    console.log('查询成功');
	console.info(result)
	result = JSON.stringify(result);
    result = JSON.parse(result);
	 
	for(var i in result){
		result[i].img = JSON.parse(result[i].img).urls;
	}
    

     return callback(result);
  });
 }
}

module.exports = getCommodityInfo;