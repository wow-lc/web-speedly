
    (function(modules) {
        function require(moduleId) {
            let module = {
                exports: {}
            };

            modules[moduleId].call(module.exports, module, module.exports, require);
            return module.exports;
        }

        return require('./src/index.js');
    })({
        "./src/index.js": (function (module, exports, require) {
            eval(`const str = require('src\a.js');
console.log(str);
`);
        })
        ,
            "src\a.js": (function (module, exports, require) {
                eval(`module.exports = "hello easypack";`);
            })
        
    })
