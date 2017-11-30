# local_server

这个repo使用express来初始化一个本地服务器，支持 `http/https` ，它可以用来在本地做代理。

## 使用步骤

1. 安装环境（node，express）

    * node环境，去 [node官网](https://nodejs.org/en/download/) 下载对应安装包，安装即可
    * 使用 `npm install` 安装express，因为项目目录下已经写好了npm配置文件 `package.json`

        ```sh
        # 在项目根目录下
        => npm install
        ```


2. 此时代理服务器环境已经搭建好，**默认**使用 `http` 代理服务器，在命令行运行以下命令：

    ```sh
    => node server.js
    # 输出： http-server lauched at http://localhost:10080
    
    # 或者使用 npm 脚本
    => npm run http
    # 输出： http-server lauched at http://localhost:10080
    ```

3. **如果需要搭建 `https` 代理服务器，需要在本地创建ssl证书**。

    切换到 `certificate` 目录下执行以下命令(该目录下 `README.md` 有详细说明)：

    ```sh
    => openssl genrsa 1024 > ./private.pem
    => openssl req -new -key ./private.pem -out ./csr.pem
    => openssl x509 -req -days 365 -in ./csr.pem -signkey ./private.pem -out ./custom.crt
    ```
    
    此时，ssl证书已生成，可以用来服务https.
    
    切换到项目根目录 `localServer` 下，运行 `node server.js`，此时本地代理服务器已启动，命令行输出如下：
    
    ```sh
    => node https-server.js
    # 输出： https-server lauched at http://localhost:10088
    
    # 或者使用 npm 脚本
    => npm run https
    # 输出： https-server lauched at http://localhost:10080
    ```
    
4. **如需代理别的url**，修改 `server.js` (http)或 `https-server.js`(https)文件，如下面例子：

    ```javascript
    app.get('/getPersonInfo'，function(req, res){
        // 如果接口请求存在跨域问题，只需设置 Access-Control-Allow-Origin: *
        res.set('Access-Control-Allow-Origin', '*');

        var mockData = {
            name: 'Xuer',
            age: 18
        }
        res.status(200).send(mockData);
        res.end();
    })
    ```

