import { _renderComponent } from './diff'

export class Component {
    constructor(props = {}) {
        this.props = props;
        // 禁止直接修改 props
        Object.freeze(this.props);
    }
    setState(nextState) {
        // 简单合并
        Object.assign(this.state, nextState);
        _renderComponent(this);
    }
}