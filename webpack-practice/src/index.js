import addContent from './add-content';
import './main.css';
import './main.less';

document.write('my first webpack ~ <br/>');
addContent();

// hot
if(module.hot){console.log('hot');
    module.hot.accept();
}