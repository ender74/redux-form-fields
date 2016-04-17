import React, { Component } from 'react'
import { Input } from 'react-bootstrap'
import ErrorDecorator from './ErrorDecorator'

class FormField extends Component {
    render() {
        const { error, touched } = this.props
        const newProps = Object.assign({}, this.props)
        if (!newProps.type)
            newProps.type='text'
        return <ErrorDecorator error={ error } touched={ touched }><Input {...newProps} /></ErrorDecorator>
    }
}

export default FormField