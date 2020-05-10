import React, { Component, render } from './react'

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count
        }
    }
    increment() {
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        return <h1 onClick={() => this.increment()}>{ this.state.count }</h1>
    }
}
render(
    <Counter count={10} />,
    document.getElementById( 'root' )
);