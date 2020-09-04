export class VNode {
  constructor(
    public tagName: string,
    public attrs: object = {},
    public children: any[] = [],
    public key?: string | number
  ) {
    this.key = key;
    this.tagName = tagName;
    this.attrs = attrs;
    this.children = children;
  }
  
  // 生成真实的dom
  render() : HTMLElement {
    let dom : any = null;
    
    if(this instanceof VNode) { // 判断当前是否为VNode
      dom = document.createElement(this.tagName);
      Object.keys(this.attrs).forEach(key => {
        dom.setAttribute(key, this.attrs[key]);
      })

      if(this.children && this.children.length > 0) {
        let childrenDom = this.children.map(child => this.render.call(child));
        childrenDom.forEach(item => dom.appendChild(item));
      }
    } else if(typeof this === 'string'){
      dom = document.createTextNode(this);
    }
    
    return dom;
  }
}