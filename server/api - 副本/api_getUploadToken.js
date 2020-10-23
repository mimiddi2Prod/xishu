var qiniu = require("qiniu");
var mysql  = require('mysql'); 
var connection = mysql.createConnection({     
      host     : '127.0.0.1',       
      user     : 'root',              
      password : 'yhm7181587',
      port: '3306',                   
      database: 'xsxcx', 
});  
connection.connect();

function getUploadToken(){
    this.Service = function(version, data, callback){
		
		var accessKey = 'r4jtfPWWt-3YWnuJCVH9DAIp2h2SSBE5i6LwZJ7B';
		var secretKey = 'qStM0CzH2Lnt1-CWcqya4VGuQiR-WeByx4blseQI';
		var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
		var bucket = "huamiaoyouli";
		
		var keyToOverwrite = data.key;
		var options = {
			scope: bucket + ":" + keyToOverwrite,
		};
		var putPolicy = new qiniu.rs.PutPolicy(options);
		var uploadToken=putPolicy.uploadToken(mac);
		
		var list = {}
		
		list.uploadToken = uploadToken
		list.key = data.key
		list.tempFilePath = data.tempFilePath
		return callback(list);
    }
}

module.exports = getUploadToken;