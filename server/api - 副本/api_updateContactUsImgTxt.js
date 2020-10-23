var mysql  = require('mysql'); 
var connection = mysql.createConnection({     
      host     : '127.0.0.1',       
      user     : 'root',              
      password : 'yhm7181587',
      port: '3306',                   
      database: 'xsxcx', 
});  
connection.connect();

function updateContactUsImgTxt(){
    this.Service = function(version, data, callback){
		var img = data.img
		var content = data.content
      connection.query('UPDATE contact_us_img_txt SET img = (?),content = (?)',[img,content],function (err, result) {
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

module.exports = updateContactUsImgTxt;