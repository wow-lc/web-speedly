# CommonJS
Node应用由模块组成，采用CommonJS规范

> commonJs规范（javascript: not just for browsers any more!）

**注意：CommonJS的实现基于io读取文件，所不能再浏览器端使用**

## 模块
CommonJS中规定每个文件是一个模块

> 与直接引入script标签的区别

- script标签引入:
    顶层作用域是全局作用域，在进行变量和函数声明时会污染全局变量
- commonjs： 
    形成一个属于模块自身的作用域，所有变量及函数只有自己能访问，对外不可见

## 导出
导出是一个模块向外部暴露自身的唯一方式  
commonjs模块内部有个module对象存放当前模块信息