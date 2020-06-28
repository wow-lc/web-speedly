const fs = require('fs');

const result = req('./a.js');

function req(moduleName){
    const content = fs.readFileSync(moduleName, 'utf-8');
    let module = {
        exports: {}
    };

    const fn = new Function('module','req', content + '\n return module.exports;');
    return fn(module, req);
}

console.log(result);