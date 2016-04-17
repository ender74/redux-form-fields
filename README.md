# redux-form-fields

- [Summary](#summary)
- [Examples](#examples)

#### Summary
This library provides some easy to use react components to be used together with
redux-form and react-bootstrap.

#### Examples

##### FormField
The FormField component is a bootstrap Input element together with an error
decorator to show the validation status from redux-form. You can use it as an direct
replacement for html _input_ tags like follows:

    render() {
        const onSubmit = (values) => this.props.onUpdate(this.props.todo, values)
        const {fields: {text, url, due, location}, handleSubmit} = this.props
        return (
            <aside>
                <FormField
                    {...text} />
                <FormField
                    placeholder='http://www.log84.de'
                    {...url} />
                <FormField
                    placeholder='17.03.2016'
                    {...due} />
                <FormField
                    placeholder='Panoramastraße 1A, 10178 Berlin'
                    {...location} />
                <ButtonToolbar>
                    <Button bsStyle='success' onClick={ handleSubmit(onSubmit) }>Confirm</Button>
                </ButtonToolbar>
            </aside>
        )
    }

If there is an error, the input field will be marked with an error decorator and the error text
will be shown.