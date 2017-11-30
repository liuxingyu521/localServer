var http = require('http');

var express = require('express');
var app = express();

// server端口
var httpPort = 10080;

// 创建Server
var httpServer = http.createServer(app);


// 使用express（相当于中间件）处理请求
app.get('/', function(req, res){
		res.status(200);
		res.send('welcome to http server');
})

// 使用server监听端口
httpServer.listen(httpPort, function(){
	console.log('http-server lauched at http://localhost:%s', httpPort);
})
