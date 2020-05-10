export function createElement(type, props, ...children) {
    return {
        children,
        props,
        type
    }
}
