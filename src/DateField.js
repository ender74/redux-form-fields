import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import moment from 'moment'
import DatePicker from 'react-date-picker'
import { Button, Glyphicon, Modal, FormGroup, FormControl, HelpBlock, InputGroup, InputControl } from 'react-bootstrap'

import FormField from './FormField'

function isValidDate(date) {
    return date && moment(date).isValid()
}

function parseLocalDate(text) {
    return moment(text, moment.localeData().longDateFormat('LL'))
}

function formatLocalDate(moment) {
    return moment.format('LL')
}

function parseISODate(date) {
    return isValidDate(date) ? moment(date) : moment()
}

function formatISODate(moment) {
    return moment.toISOString()
}

function formatUTCText(date) {
    return isValidDate(date) ? formatDate(moment(date)) : date
}

const PickDateModal = ({ isOpen, onRequestClose, valueForPicker, onChange }) => {
    return (
        <Modal show={ isOpen } onHide={ onRequestClose } backdrop={ true } aria-labelledby="contained-modal-title-lg">
            <Modal.Header closeButton={ true }>
                Datum wählen
            </Modal.Header>
            <Modal.Body>
                <DatePicker
                    date={ valueForPicker }
                    onChange={ onChange }
                    hideFooter='true'
                />
            </Modal.Body>
        </Modal>
    )
}

class DateField extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onChangePick = this.onChangePick.bind(this)
    }

    render() {
        const date = parseLocalDate(this.props.value)
        const btnPickDate = (
            <Button onClick={ this.openModal } tooltip='Datum auswählen'>
                <Glyphicon glyph='calendar' />
            </Button>
        )
        const valueForPicker = date != null && date.isValid() ? date : moment()

        const { error, touched } = this.props
        const newProps = Object.assign({}, this.props)
        if (!newProps.type)
            newProps.type='text'
        const hasError = touched && error
        const bsStyle = hasError ? 'error' : 'success'
        const addon = this.props.buttonAfter

        return (
            <div style= {styles.base}>
                <FormGroup validationState={ bsStyle }>
                    <InputGroup style = {{ width: '100%' }}>
                        <FormControl {...newProps} />
                        <InputGroup.Button>{ btnPickDate }</InputGroup.Button>
                    </InputGroup>
                    { hasError && <HelpBlock>{ error }</HelpBlock> }
                </FormGroup>
                <PickDateModal
                    isOpen={ this.state.modalIsOpen }
                    onRequestClose={ this.closeModal }
                    style={styles.modal}
                    valueForPicker={ valueForPicker }
                    onChange={ this.onChangePick }
                />
            </div>
        )
    }

    openModal() {
        this.setState({modalIsOpen: true})
    }

    closeModal() {
        this.setState({modalIsOpen: false})
    }

    onChangePick(date, moment) {
        this.props.onChange( formatLocalDate(moment) )
        this.closeModal()
    }
}

const styles = {
    base: {
        display: 'table'
    }
}

const ExportClass = injectIntl(DateField)

ExportClass.isValidDate = isValidDate
ExportClass.parse = (value) => {
    return formatISODate(parseLocalDate(value))
}
ExportClass.format = (value) => {
    return formatLocalDate(parseISODate(value))
}
ExportClass.isValid = (value) => {
    return typeof(value) == 'undefined' || parseLocalDate(value).isValid()
}

export default ExportClass