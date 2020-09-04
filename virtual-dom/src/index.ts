import  { VNode } from './vnode';
import { diff } from './diff';
import {renderPathch} from './patch';

/**
 * <ul id="list">
 *  <li>txt_a</li>
 *  <li>txt_b</li>
 * </ul>
 */
let oldVTree = new VNode("ul",{},[
    new VNode("li", {}, ['txt_a']),
    new VNode("li", {}, ['txt_b']),
    new VNode("input"),
    "我是TextNode"
])

let oldDom = oldVTree.render();

document.body.append(oldDom);

/**
 * Diff
 * 1. 判断更新前后Virtual Dom Tree的差异 
 * 2. 根据差异更新到正式Dom
 */
// let patchs = diff(oldTree, newTree);
// renderPatch(oldDom, paths);


// for example
let newVTree = new VNode("ul",{},[
    new VNode("button", {}, ['txt_b']),
    new VNode("li", {}, ['txt_a']),
    new VNode("input")
]);

let patches = diff(oldVTree, newVTree);

renderPathch(oldDom, patches);