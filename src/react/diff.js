
import { _render } from './react-dom'
export const _renderComponent = (component) => {

    let dom;

    const renderer = component.render();

    if (component.dom && component.componentWillUpdate) {
        component.componentWillUpdate();
    }

    dom = _render(renderer);

    if (component.dom) {
        if (component.componentDidUpdate) component.componentDidUpdate();
    } else if (component.componentDidMount) {
        component.componentDidMount();
    }

    if (component.dom && component.dom.parentNode) {
        component.dom.parentNode.replaceChild(dom, component.dom);
    }
    // 和真实 dom 互相引用
    component.dom = dom;
    dom._component = component;

}
export const setComponentProps = (component, props) => {

    if (!component.dom) {
        if (component.componentWillMount) component.componentWillMount();
    } else if (component.componentWillReceiveProps) {
        component.componentWillReceiveProps(props);
    }

    component.props = props;

    _renderComponent(component);

}

export const createComponent = (component, props) => {
    let instance;
    console.log('component', component)
    // 类组件
    if (component.prototype && component.prototype.render) {
        instance = new component(props);
        // 函数组件
    } else {
        instance = new Component(props);
        instance.constructor = component;
        instance.render = function () {
            return this.constructor(props);
        }
    }

    return instance;
}
export const renderComponent = (vnode) => {
    const component = createComponent(vnode.type, vnode.props);

    setComponentProps(component, vnode.props);

    return component.dom;
}