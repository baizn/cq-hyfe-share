import React, { Component } from 'react'

class Count extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1
        }
        this.addCount = this.addCount.bind(this)
        this.subCount = this.subCount.bind(this)
    }

    addCount() {
        this.setState({
            count: ++this.state.count
        })
    }

    subCount() {
        this.setState({
            count: --this.state.count
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.addCount}>add</button>
                <span>{this.state.count}</span>
                <button onClick={this.subCount}>sub</button>
            </div>
        )
    }
} 

export default Count