import { renderComponent } from './diff'

const textNodeTypes = ['string', 'number']

const setAttribute = (dom, name, value) => {
    if (name === 'className') {
        name = 'class'
    }
    // 正则匹配到事件函数
    if (/on\w+/.test(name)) {
        name = name.toLowerCase();
        dom[name] = value || '';
        // 如果属性名是style，则更新style对象
    } else if (name === 'style') {
        for (let name in value) {
            dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name];
        }
        // 普通属性
    } else {
        if (name in dom) {
            dom[name] = value || '';
        }
        if (value) {
            dom.setAttribute(name, value);
        } else {
            dom.removeAttribute(name);
        }
    }
}

// vnode 就是 babel 解析后执行 createElement 获取到的
export const _render = (vnode) => {
    const { type, children } = vnode
    console.log('type', type)
    if (textNodeTypes.indexOf(typeof vnode) >= 0) {
        return document.createTextNode(`${vnode}`)
    }
    if (typeof type === 'function') {
        return renderComponent(vnode)
    }
    const dom = document.createElement(vnode.type);

    if (vnode.props) {
        Object.keys(vnode.props).forEach(key => {
            const value = vnode.props[key];
            setAttribute(dom, key, value);
        });
    }
    children.forEach(child => render(child, dom));
    return dom;
}

export const render = (vnode, root) => {
    root.appendChild(_render(vnode))
}