import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

function mapStateToProps(state){
    return {
        count : state
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(Actions,dispatch)
    }
}

class Count extends Component {
    render() {
        const { count, actions } = this.props
        return (
            <div>
                <button onClick={actions.addCount}>add</button>
                <span>{count.count}</span>
                <button onClick={actions.subCount}>sub</button>
            </div>
        )
    }
} 

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Count)