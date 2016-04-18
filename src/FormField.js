import React, { Component } from 'react'
import { InputGroup, FormGroup, FormControl, HelpBlock, Col } from 'react-bootstrap'
import ErrorDecorator from './ErrorDecorator'

class FormField extends Component {
    render() {
        const { error, touched } = this.props
        const newProps = Object.assign({}, this.props)
        if (!newProps.type)
            newProps.type='text'
        const hasError = touched && error
        const bsStyle = hasError ? 'error' : 'success'
        const addon = this.props.buttonAfter
        return (
            <FormGroup validationState={ bsStyle }>
                <InputGroup style = {{ width: '100%' }}>
                    {this.props.addonBefore && <InputGroup.Addon>{ this.props.addonBefore }</InputGroup.Addon> }
                    <FormControl {...newProps} />
                </InputGroup>
                <FormControl.Feedback />
                { hasError && <HelpBlock>{ error }</HelpBlock> }
            </FormGroup>
        )
    }
}

export default FormField
