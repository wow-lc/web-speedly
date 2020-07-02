# webpack

## 相关常用插件
```
webpack-dev-server
启动一个本地服务，可以处理打包资源与静态文件的请求。
html-webpack-plugin
html模板
clean-webpack-plugin
清除插件
webpack.HotModuleReplacementPlugin
热更新加载
mini-css-extract-plugin
抽离css
style-loader css-loader less less-loader node-sass sass-loader 
```

## entry 
读取打包的入口文件

### 配置可以有多种形式： 字符串、 数组、 对象、 函数

- 1. 字符串  
直接引入文件路径
```
module.exports = {
    ...
    entry: "./scr/index.js"
    ...
}
```
- 2. 数组  
将多个资源预先合并，最后一个元素作为实际的入口文件
```
module.exports = {
    ...
    entry: ["babel/polyfill","./scr/index.js"]
    ...
}
```
- 3. 对象  
多入口配置，key 对应 chunk name， value 对应入口路径 
```
module.exports = {
    ...
    entry: {
        index: "./scr/index.js",
        lib: "./lib/index.js"
    }
    ...
}
```

> vendor属性   

在webpack中`vendor`一般指的是工程所使用的库、框架等第三方模块集中打包生成的bundle

```
module.exports = {
    ...
    entry: {
        index: "./scr/index.js",
        lib: "./lib/index.js",
        vendor: ["vue", "vue-router"...]
    }
    ...
}
```
**好处: 将公共模块chunk抽取出来，单独生成一个独立的bundle.js. 由于vendor只包含第三方模块，这部分不经常改动。可以利用客户断缓存，在后续用户请求的时候加快整体渲染。**

- 4. 函数 (可以返回 字符串 || Promise对象)
```
// 函数 
module.exports = {
    ...
    entry: () => "./src/index.js"
    ...
}

// Promise
module.exports = {
    ...
    entry: () => new Promise(resolve => {
        setTimeout(() => {
            resolve('./src/index.js')
        }, 1000);
    })
    ...
}
```

## output
资源打包的出口配置 (默认打包到`dist`目录)

- 单页面
```
module.exports = {
    ...
    output: {
        filename: 'bundle.js' 
    }
    ...
}
```

- 多页面 (必须用模板变量配置filename,区分出口文件)
```
module.exports = {
    ...
    output: {
        filename: '[name].[hash8]@[chunkhash].bundle.js' 
    }
    ...
}
```
