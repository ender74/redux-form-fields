import React, { Component } from 'react'

export default class ErrorDecorator extends Component {
    render() {
        const { children, error, touched } = this.props
        const showError = touched && error
        return <div style={ styles.div }>
                { children }
                { showError && <span style={ styles.error }>{ error }</span> }
            </div>
    }
}

const styles = {
    div: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    error: {
        color: 'red',
        marginBottom: '10px'
    }
}

