import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import {
    Form, Input, InputNumber, DatePicker, Checkbox, Icon, Button, Select, Row, Col, message
} from 'antd'
const { Option } = Select;
const alertOperator = [
    'Greater than',
    'Greater than or equal',
    'Equal',
    'Less than',
    'Less than or equal',
]
@connect(
    mapStateToProps,
    mapDispathToProps,
)
class DynamicFieldSet extends React.Component {
    remove = (key) => {
        const { getFieldValue, setFieldsValue } = this.props.form
        // can use data-binding to get
        let data = getFieldValue('data') || []
        // We need at least one passenger
        if (data.length === 1) {
            return
        }
        // can use data-binding to set
        setFieldsValue({
            moa: data.filter(x => x.key !== key)
        })
    }
    add = (row = { name: '', operator: 'Equal', value: '' }) => {
        const { createPropertyModel, form, match } = this.props
        const { getFieldValue, setFieldsValue } = form
        const { properties } = createPropertyModel
        let data = getFieldValue('data') || []
        if (properties && properties.alerts) {
            let property = properties.find(x => x.name === match.params.property) || {}
            if (property.alerts)
                data = property.alerts
        }
        data.push(row)

        setFieldsValue({
            moa: data
        })
    }
    componentWillMount() {
        const { priorities, getPriorities } = this.props
        if (!priorities || priorities.length === 0) {
            getPriorities(100)
        }
    }
    componentDidMount() {
        const { match, history, createPropertyModel } = this.props
        let propertyName = match.params.property
        if (!propertyName
            || propertyName === 'undefined'
            || !createPropertyModel.properties
            || !createPropertyModel.properties.find(x => x.name === propertyName)
        ) {
            message.warn('Please create property first!!!')
            history.goBack()
        } else {
            this.add()
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { createProperty, createPropertyModel, match, history } = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let propertyName = match.params.property
                let alerts = (values.data || []).filter(x => !undefined);
                let properties = createPropertyModel.properties || []
                let property = properties.find(x => x.name === propertyName)
                if (property) {
                    property.alerts = alerts
                }
                createProperty(createPropertyModel)
                history.push('/templates/create')
                message.info(`Create alerts for property ${propertyName} success!`)
            } else {
                message.error(`${err}!`)
            }
        });
    }
    changeOperator = (key, operator) => {
        const { getFieldValue, setFieldsValue } = this.props.form

        // reset alert value
        // setFieldsValue(`data[${row}][value]`,)
        let datas = getFieldValue('data') || []
        let data = datas.find(x => x.key === key)
        if (data) {
            data.operator = operator
        }
        setFieldsValue({
            moa: datas
        })
    }
    changePriority = (key, priority) => {
        const { getFieldValue, setFieldsValue } = this.props.form

        // reset alert value
        // setFieldsValue(`data[${row}][value]`,)
        let datas = getFieldValue('data') || []
        let data = datas.find(x => x.key === key)
        if (data) {
            data.priority = priority
        }
        setFieldsValue({
            moa: datas
        })
    }

    render() {
        const { getFieldDecorator, getFieldValue, getFieldsValue } = this.props.form
        const { createPropertyModel, match, priorities } = this.props
        let property = (createPropertyModel.properties || []).find(x => x.name === match.params.property) || {}
        // const datas = getFieldValue('data') || []
        getFieldDecorator('moa', { initialValue: property.alerts || [] })
        const data = getFieldValue('moa') || []
        console.log(getFieldsValue(), property, createPropertyModel)

        const dataTypes = (key) => (
            <Select name='data-operator' placeholder='operator' width='100px'
                onChange={(value) => this.changeOperator(key, value)}
            >
                {alertOperator.map(x => (
                    <Option key={x} value={x}>{x}</Option>
                ))}
            </Select>)
        const priorityElement = (key) => (
            <Select name='data-Priority' placeholder='Priority' width='100px'
                onChange={(value) => this.changePriority(key, value)}
            >
                {priorities.map(x => (
                    <Option key={x.id} value={x.name}>{x.name}</Option>
                ))}
            </Select>)

        const formItems = data.map((item, index) => (
            <Row className='alert-items' key={index + '_row'}>
                <Form.Item
                    key={index + '_priority'}
                    required={false}
                    className='d-inline-block alert-item'
                >
                    {getFieldDecorator(`data[${index}][priority]`, {
                        initialValue: item.priority,
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input alert's priority or delete this row.",
                            type: 'string'
                        }],
                    })(
                        priorityElement(index)
                    )}
                </Form.Item>
                <Form.Item
                    key={index}
                    required={false}
                    className='d-inline-block alert-item'
                >
                    {getFieldDecorator(`data[${index}][name]`, {
                        initialValue: item.name,
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please input alert's name or delete this row.",
                        }],
                    })(
                        <Input name='alert-name' placeholder="alert's name" />
                    )}
                </Form.Item>
                <Form.Item
                    required={false}
                    key={index + '_operator'}
                    className='d-inline-block alert-item'
                >
                    {getFieldDecorator(`data[${index}][operator]`, {
                        initialValue: item.operator,
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input operator or delete this row.",
                            type: 'string'
                        }],
                    })(
                        dataTypes(index)
                    )}
                </Form.Item>
                <Form.Item
                    required={false}
                    key={index + '_value'}
                    className='d-inline-block alert-item'
                >
                    {getFieldDecorator(`data[${index}][value]`, {
                        initialValue: item.value,
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input alert's value or delete this row.",
                        }],
                    })(
                        <Input name='alert-value' placeholder="alert's value" />
                    )}
                    <Form.Item
                        required={false}
                        key={index + '_key'}
                        className='hidden-item'
                    >
                        {getFieldDecorator(`data[${index}][key]`, {
                            initialValue: index,
                        })(
                            <Input type='hidden' name={`data[${index}][key]`} />
                        )}

                    </Form.Item>
                </Form.Item>
                {data.length > 1 ? (
                    <Icon
                        className='dynamic-delete-button d-inline-block'
                        type='minus-circle-o'
                        disabled={data.length === 1}
                        onClick={() => this.remove(index, item.key)}
                    />
                ) : null}
            </Row>
        ));
        return (
            <div className='alert-create' >
                <div className='row'>
                    <div className='col-lg-4 text-justify'>
                        <p>Alert is alert. After this template is created success, you can give these information for a person, so they can loged in.</p>
                    </div>
                    <div className='col-md-8'>
                        <div className='alert-item alert-item__title '>
                            <p className='alert-title '>Priority</p>
                        </div>
                        <div className='alert-item alert-item__title '>
                            <p className='alert-title '>Alert Name</p>
                        </div>
                        <div className='alert-item alert-item__title '>
                            <p className='alert-title '>Operator</p>
                        </div>
                        <div className='alert-item alert-item__title '>
                            <p className='alert-title '>Alert Value</p>
                        </div>
                        <Form onSubmit={this.handleSubmit} className='col-md-12 template-dynamic-form' >
                            {formItems}
                            <Form.Item >
                                <Button type='dashed' onClick={() => this.add()} style={{ width: '60%' }}>
                                    <Icon type='plus' /> Add field
                        </Button>
                            </Form.Item>
                            <Form.Item className='btn-control text-right'>
                                <a type='default' href='/#/templates/create'>Cancel</a>
                                <Button type='primary' htmlType='submit'>Create Alerts</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const CreatePage = Form.create()(DynamicFieldSet);

export default CreatePage