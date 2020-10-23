var CuteRouter = require("./storeRouter.js");
var http = require("http");
var url = require("url");
var fs = require('fs');
var path = require('path');
var ContentType = require("./storeContent-type.js");
var optfile  =  require('./readImage.js'); 
var writefile = require('./uploadImg.js');
var router = new CuteRouter();
var port = 9003;


var express = require('express');
var fs =require('fs');
var multer = require('multer');
var app = express();
//if(process.argv.length > 2){
//	port = parseInt(process.argv[2]);
//}

http.createServer(function(req, res){

	var urlPath = url.parse(req.url).pathname;
	var ext = path.extname(urlPath);
	var contentType = ContentType.GetContentType(ext);
	//console.info(req)
	if(ext != ""){
		res.writeHead(200, {"content-type": + contentType });
		if(req.url!=="/fav/favicon.ico"){
			// console.info(ext)
			if(ext.split('/')[0] == ".png"){
				// console.info(1)
				optfile.readImg('./img'+req.url,res);
			}else{
				// console.info(2)
				fs.readFile(urlPath.substr(1), function (err, data) {
					if (err) {
						console.log(err);
						// HTTP 状态码: 404 : NOT FOUND
						// Content Type: text/plain
						res.writeHead(404, {'Content-Type': + contentType });
					}else{             
						// HTTP 状态码: 200 : OK
						// Content Type: text/plain
						if(ext == ".css"){
							// console.info(ext)
							// console.info( contentType)
							res.writeHead(200, {'Content-Type':  'text/css'});
						}else{
							res.writeHead(200, {'Content-Type': + contentType});
						}
						    
				 
						// 响应文件内容
					res.write(data.toString());        
					}
					//  发送响应数据
					res.end();
				}); 
			}
		}		
	}else{
		var data = "";
		req.on('data', function(chunk){
			data += chunk.toString();
		});
		//console.info(data)
		//return
		req.on('end', function(){
			console.info("on request end, data:\n" + data + ", url:\n" + urlPath);
			router.Service(JSON.parse(data), urlPath, function(json){

				res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
				res.write(JSON.stringify(json));
				res.end();
			});      
		});
	}

}).listen(port);

console.info("server work on port:" + port);