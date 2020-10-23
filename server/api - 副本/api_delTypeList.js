var mysql  = require('mysql'); 
var connection = mysql.createConnection({     
      host     : '127.0.0.1',       
      user     : 'root',              
      password : 'yhm7181587',
      port: '3306',                   
      database: 'xsxcx', 
});  
connection.connect();

function delTypeList(){
    this.Service = function(version, data, callback){
		var commodityId = data.commodityId
      connection.query('DELETE FROM category_detail WHERE commodity_id = (?)',[commodityId],function (err, result) {
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

module.exports = delTypeList;