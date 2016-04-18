import React, { Component } from 'react'
import { Input } from 'react-bootstrap'
import ErrorDecorator from './ErrorDecorator'

class FormField extends Component {
    render() {
        const { error, touched } = this.props
        const newProps = Object.assign({}, this.props)
        if (!newProps.type)
            newProps.type='text'
        const hasError = touched && error
        const bsStyle = hasError ? 'error' : 'success'
        return (
            <ErrorDecorator error={ error } touched={ touched }>
                <Input {...newProps} bsStyle={ bsStyle } hasFeedback={ touched } />
            </ErrorDecorator>
        )
    }
}

export default FormField
