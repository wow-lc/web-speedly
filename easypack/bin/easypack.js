#! /usr/bin/env node

let entry = "./src/index.js";
let output = "./dist/index.js";

const fs = require('fs');
const path = require('path');
let modules = [];

let script = fs.readFileSync(entry,'utf-8');
script = script.replace(/require\(["'](.+?)["']\)/g, function() {
    let name = path.join('./src', arguments[1]);
    let content = fs.readFileSync(name, 'utf-8');
    console.log(content);
    
    modules.push({
        name,
        content
    });
    return `require('${name}')`;
});

console.log(script);

let template = `
    (function(modules) {
        function require(moduleId) {
            let module = {
                exports: {}
            };

            modules[moduleId].call(module.exports, module, module.exports, require);
            return module.exports;
        }

        return require('<%-entry%>');
    })({
        "<%-entry%>": (function (module, exports, require) {
            eval(\`<%-script%>\`);
        })
        <% for(let i = 0; i < modules.length; i ++) { %>,
            "<%-modules[i].name%>": (function (module, exports, require) {
                eval(\`<%-modules[i].content%>\`);
            })
        <% } %>
    })
`;

const ejs = require('ejs');
const result = ejs.render(template,{
    entry,
    script,
    modules
});

// 输入到目标文件
fs.writeFileSync(output,result);
console.log('编译成功');
