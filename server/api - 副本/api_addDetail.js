var mysql  = require('mysql'); 
var connection = mysql.createConnection({     
      host     : '127.0.0.1',       
      user     : 'root',              
      password : 'yhm7181587',
      port: '3306',                   
      database: 'xsxcx', 
});  
connection.connect();

function addDetail(){
    this.Service = function(version, data, callback){

		var commodityId = data.commodityId;
		var img = data.img;
		img = JSON.stringify(img) ;
		img = '{"urls":' + img + '}'
		var content = data.content
		var price = data.price
		var item_number = data.item_number
      connection.query('INSERT INTO commodity_info (commodity_id,img,content,price,item_number) VALUES (?,?,?,?,?)',[commodityId,img,content,price,item_number],function (err, result) {
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

module.exports = addDetail;