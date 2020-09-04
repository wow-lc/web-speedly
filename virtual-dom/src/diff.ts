import { VNode } from "./vnode";

export function diff(oldTree: VNode, newTree: VNode): object {
  let index = 0;
  let patches = {};
  dfsPatch(oldTree, newTree, index, patches);
  return patches;
}

/**
 * 深度遍历比较新旧差异
 * @param oldNode
 * @param newNode
 * @param patchs
 */
function dfsPatch(
  oldNode: VNode,
  newNode: VNode,
  index: number,
  patches: object
): void {
  // 记录当前层级的差异
  let currentPatch = [];
  if (oldNode instanceof Text && newNode instanceof Text) {
    if (oldNode !== newNode) {
      currentPatch.push({ type: "text", content: newNode });
    }
  } else if (oldNode.tagName === newNode.tagName) {
    // 新旧节点类型相同,比较节点的属性
    let attrPatches = diffAttrs(oldNode.attrs, newNode.attrs);
    // 新旧节点属性有发生改变
    if (JSON.stringify(attrPatches) !== "[]") {
      currentPatch.push({ type: "attr", attrs: attrPatches });
    }
    // 判断子节点的差异
    diffChildren(oldNode.children, newNode.children, ++index, patches);
  } else {
    // 新旧节点类型完全不同，直接替换
    currentPatch.push({ type: "replace", node: newNode });
  }

  patches[index] = currentPatch;
}

/**
 * 比较孩子节点差异
 *
 * @param oldChildren
 * @param newChildren
 * @param index 对比层级
 * @param patches
 */
function diffChildren(
  oldChildren: VDom[],
  newChildren: VDom[],
  index: number,
  patches: object
): void {
  let oldStartIdx = 0;
  let oldEndIdx = oldChildren.length - 1;
  let newStartIdx = 0;
  let newEndIdx = newChildren.length - 1;

  while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // TODO
  }
  // step 1: 相同且不需要移动位置的节点
  // step 2: 相同但需要移动位置的节点
  // step 3: 删除没有用到的旧节点，添加新节点到对应位置
}

/**
 * 判断VNode结点是否相同 (省略源码中isComment, data判断)
 * @param oldNode 
 * @param newNode 
 */
function sameNode(oldNode: VNode, newNode: VNode): boolean {
  return oldNode.key === newNode.key && (
    oldNode.tagName === newNode.tagName
  )
}

/**
 * 比较对象属性
 * @param oldAttrs
 * @param newAttrs
 */
function diffAttrs(oldAttrs: object, newAttrs: object): AttrObj[] {
  let attrPatches: AttrObj[] = [];
  Object.getOwnPropertyNames(oldAttrs).forEach((attrName) => {
    if (newAttrs[attrName]) {
      if (oldAttrs[attrName] !== newAttrs[attrName]) {
        attrPatches.push({
          type: "update",
          attrName,
          attrVal: newAttrs[attrName],
        });
      }
    } else {
      attrPatches.push({
        type: "delete",
        attrName,
        attrVal: newAttrs[attrName],
      });
    }
  });
  // 遍历newAttrs,是否有新增属性
  Object.getOwnPropertyNames(newAttrs).forEach((attrName) => {
    if (!oldAttrs[attrName]) {
      attrPatches.push({ type: "add", attrName, attrVal: newAttrs[attrName] });
    }
  });
  return attrPatches;
}
