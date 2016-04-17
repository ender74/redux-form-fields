import React, { Component } from 'react'

class ErrorDecorator extends Component {
    render() {
        const { children, error, touched } = this.props
        const showError = touched && error
        return <div style={ styles.div }>
                { children }
                <p style={ showError ? styles.error : styles.hidden }>{ error }</p>
            </div>
    }
}

export default ErrorDecorator
