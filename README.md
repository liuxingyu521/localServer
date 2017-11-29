# local_server

> 这个repo用来初始化一个本地服务器，支持 `http/https` ，它可以用来在本地做代理。

## 使用步骤

1. 切换到 `certificate` 目录下执行以下命令(该目录下有详细说明)：

    ```sh
    => openssl genrsa 1024 > ./private.pem
    => openssl req -new -key ./private.pem -out ./csr.pem
    => openssl x509 -req -days 365 -in ./csr.pem -signkey ./private.pem -out ./custom.crt
    ```
    
    此时，ssl证书已生成，可以用来服务https.
    
2. 切换到项目根目录 `localServer` 下，运行 `node server.js`，此时本地代理服务器已启动，命令行输出如下：

    ![lauched interface](img/lauched.png)
    
3. 如需代理别的url，修改 `server.js` 文件，如下面例子：

    ```javascript
    app.get('/getPersonInfo'， function(req, res){
        var mockData = {
            name: 'Xuer',
            age: 18
        }
        res.status(200).send(mockData);
        res.end();
    })
    ```

