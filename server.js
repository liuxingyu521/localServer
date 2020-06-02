const http = require("http");
const axios = require("axios");
const express = require("express");
const Middlewares = require("./serverMiddleware");

const app = express();

// 使用内建 body-parser 中间件，可将 request 的 body 数据解析到 req.body 对象上
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 解决跨域问题
app.use(Middlewares.CrossAssign());

// server端口
var httpPort = 10080;

// 创建Server
var httpServer = http.createServer(app);

// 使用express（相当于中间件）处理请求
app.get("/", function (req, res) {
  res.status(200);
  res.send("welcome to http server");
});

// post 请求
app.post("/post", function (req, res) {
  // 使用req.body来解析请求体
  res.status(200).json(req.body);
});

// 代理请求其他接口数据
app.get("/getPersonInfo", function (req, res) {
  axios({
    url: "http://abc.com/getPersonInfo",
    method: "get",
  }).then(function (response) {
    res.status(200).send(response.data);
  });
});

// 使用server监听端口
httpServer.listen(httpPort, function () {
  console.log("http-server lauched at http://localhost:%s", httpPort);
});
