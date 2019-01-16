import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
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
        const { remove } = this.props
        const { getFieldValue, setFieldsValue } = this.props.form
        // can use data-binding to get
        let data = getFieldValue('data') || []

        let _data = data.find(x => x.key === key)
        if (_data && _data.id) {
            remove(_data.id)
        } else if (data.length === 1) {
            return
        }
        // can use data-binding to set
        setFieldsValue({
            formData: data.filter(x => x.key !== key)
        })
    }
    add = (row = { operator: 'Equal' }) => {
        const { propertyId } = queryString.parse(this.props.location.search)
        const { createThingPropertyModel, form, match } = this.props
        const { getFieldValue, setFieldsValue } = form
        const { properties } = (!propertyId || propertyId !== 'undefined') ? createThingPropertyModel : this.props
        let data = getFieldValue('data') || []
        let property = {}
        if (propertyId && propertyId !== 'undefined') {
            property = properties.find(x => x.id === +propertyId) || {}
        } else if (properties && properties.alerts) {
            property = properties.find(x => x.name === match.params.property) || {}
        }
        if (property.alerts)
            data = property.alerts
        data.push(row)
        setFieldsValue({
            formData: data
        })
    }
    componentWillMount() {
        const { getList } = this.props

        const { propertyId, thingId } = queryString.parse(this.props.location.search)
        if (propertyId && propertyId !== 'undefined') {
            getList('thing', propertyId, thingId)
        }
    }
    componentDidMount() {
        const { match, history, createThingPropertyModel, isEdit } = this.props
        const { propertyId, thingId } = queryString.parse(this.props.location.search)
        let propertyName = match.params.property
        if (!propertyName
            || propertyName === 'undefined'
            || (!isEdit && (!createThingPropertyModel.properties
                || !createThingPropertyModel.properties.find(x => x.name === propertyName)))
            || (isEdit && (!propertyId || !thingId))) {
            message.warn('Please create property first!!!')
            history.goBack()
        } else {
            this.add()
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { createProperty, createThingPropertyModel, match, history, createAlerts } = this.props
        const { propertyId } = queryString.parse(this.props.location.search)
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            }

            let propertyName = match.params.property
            let alerts = (values.data || []).filter(x => !undefined);
            let properties = createThingPropertyModel.properties || []
            let property = properties.find(x => x.name === propertyName)
            if (property) {
                property.alerts = alerts
            }
            if (propertyId && propertyId !== 'undefined') {
                // create for update property mode
                createAlerts(propertyId, alerts)
            } else {
                // create for create property mode
                createProperty(createThingPropertyModel)
                message.info(`Create alerts for property ${propertyName} success!`)
                history.push('/things/create?step=1')
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
            formData: datas
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
            formData: datas
        })
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form
        const { createThingPropertyModel, match, priorities, history } = this.props
        let property = (createThingPropertyModel.properties || []).find(x => x.name === match.params.property) || {}
        // const datas = getFieldValue('data') || []
        getFieldDecorator('formData', { initialValue: property.alerts || [] })
        const data = getFieldValue('formData') || []

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
                        <p>Alert is alert. After this thing is created success, you can give these information for a person, so they can loged in.</p>
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
                        <Form onSubmit={this.handleSubmit} className='col-md-12 thing-dynamic-form' >
                            {formItems}
                            <Form.Item >
                                <Button type='dashed' onClick={() => this.add()} style={{ width: '60%' }}>
                                    <Icon type='plus' /> Add field
                        </Button>
                            </Form.Item>
                            <Form.Item className='btn-control text-right'>
                                <Button type='default' style={{ marginRight: '10px' }} onClick={() => history.goBack()}>Back</Button>
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