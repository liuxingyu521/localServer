var http = require('http');
var axios = require('axios');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// 使用body-parser插件来解析post请求的request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));

// server端口
var httpPort = 10080;

// 创建Server
var httpServer = http.createServer(app);


// 使用express（相当于中间件）处理请求
app.get('/get', function(req, res){
	res.status(200);
	res.send('welcome to http server');
	res.end();
})

// post 请求
app.post('/post', function(req, res){
	// 使用req.body来解析请求体
	res.status(200).send(req.body);
	res.end();
})

// 代理请求其他接口数据
app.get('/getPersonInfo', function (req, res) {
  axios({
      url: 'http://abc.com/getPersonInfo',
      method: 'get'
    })
    .then(function (response) {
      res.status(200).send(response.data);
      res.end();
    })

})

// 使用server监听端口
httpServer.listen(httpPort, function(){
	console.log('http-server lauched at http://localhost:%s', httpPort);
})
