import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import {
    Form, Input, InputNumber, Divider, message, Checkbox, Icon, Button, Select, Row, Col
} from 'antd'
const { TextArea } = Input
const { Option } = Select;

@connect(
    mapStateToProps,
    mapDispathToProps,
)
class DynamicFieldSet extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {

        const { detail } = this.props
        if (detail && !this.state.isLoaded) {
            this.add(undefined, true)
            this.setState({
                isLoaded: true
            })
        }
    }
    createOrUpdateProperty = (key, item) => {
        const { match, createProperty, updateProperty } = this.props
        const { getFieldValue, setFieldsValue } = this.props.form
        let data = getFieldValue('data') || []
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            }
        })
        let _data = data.find(x => x.key === key) || {}
        if (!_data.name) {
            message.warn(`Bạn phải nhập gì vào chứ!`)
            return
        }
        let model = {
            ..._data,
            dataType: _data.dataType,
            defaultValue: _data.defaultValue,
            parentId: +match.params.id,
            thingThingID: +match.params.id
        }
        //TODO: id alway null
        if (!item.id) {
            createProperty({ ...model })
            return
        }
        updateProperty(item.id, { ...model })

        // can use data-binding to set
        setFieldsValue({
            formData: data
        })
    }
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
            formData: data.filter(x => x.key !== key)
        })
        //TODO: call api remove
    }

    add = (row, isFirstLoad = false) => {
        const { form, dataTypes, customProperties } = this.props
        const { getFieldValue, setFieldsValue } = form
        if (!row) {
            row = {
                dataType: dataTypes.find(x => x.name === 'String')
            }
        }
        let data = getFieldValue('data') || []
        if (customProperties) {
            data = Object.assign(data, customProperties.map(x => ({ ...x, dataType: (dataTypes.find(a => a.id === x.dataType) || {}) })))
        }
        if (!isFirstLoad) {
            data.push(row)
        }
        setFieldsValue({
            formData: data
        })
    }

    handleSubmit = (e, key, addAlert = false) => {
        e.preventDefault()
        const { create, createModel, history, match, form } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                let properties = (values.data || []).filter(x => !undefined)
                // prepare added alerts
                if (createModel.properties) {
                    for (let property of properties) {
                        let item = createModel.properties.find(x => x.key === property.key)
                        if (item) {
                            property.alerts = item.alerts
                        }
                    }
                }
                create({ ...createModel, properties })
                if (addAlert) {
                    let property = (properties.find(x => x.key === key) || {})
                    if (property && property.name) {
                        history.push(`/alerts/${property.name}/thing?${property.name}?thingId=${(match.params || {}).id}&propertyId=${property.id}`)
                    }
                }
            } else {
                message.warn(`Bạn phải nhập gì vào chứ!`)
            }
        });
    }

    changeType() {
        const { getFieldValue, setFieldsValue } = this.props.form
        const { dataTypes } = this.props
        let datas = getFieldValue('data') || []
        setFieldsValue({
            formData: datas.map(x => ({ ...x, dataType: dataTypes.find(a => a.id === x.dataType) }))
        })
    }
    checkBoxChange(key, e) {
        let checked = e.target.checked
        const { getFieldValue, setFieldsValue } = this.props.form
        let datas = getFieldValue('data') || []
        let data = datas.find(x => x.key === key)
        if (data) {
            data.value = checked
        }
        setFieldsValue({
            formData: datas
        })
        this.handleSubmit(null, key)
    }
    render() {
        const { inheritProperties, dataTypes, createModel } = this.props
        const { getFieldDecorator, getFieldValue } = this.props.form
        const { properties } = createModel
        getFieldDecorator('formData', { initialValue: properties ? properties : [] })
        const data = getFieldValue('formData') || []
        const prepareDataTypes = (key) => (
            <Select name='data-type' placeholder='data type' width='100px'
                onChange={() => this.changeType()}
            >
                {dataTypes.map(x => (
                    <Option key={x.id} value={x.id}>{x.name}</Option>
                ))}
            </Select>)
        const getDataTypeName = (id) => {
            let dataType = dataTypes.find(x => x.id === id)
            if (!dataType) {
                return 'String'
            }
            return dataType.name
        }
        const preparePropertyValue = (key) => {
            let item = data.find(x => x.key === key) || {}
            let type = ((item.dataType || {}).name || '').toLowerCase()
            switch (type) {
                case 'number':
                    return (<InputNumber name='property-value' onChange={(e) => this.handleSubmit(e, key)} />)
                case 'json':
                    return (<TextArea rows={4} name='property-value' onChange={(e) => this.handleSubmit(e, key)} />)
                case 'boolean':
                    return (<Checkbox name='property-value' checked={item.defaultValue === true} onChange={(e) => this.checkBoxChange(key, e)} >{(item.defaultValue === true) ? 'True' : 'False'}</Checkbox>)
                case 'string':
                case 'picture':
                default:
                    return (<Input name='property-value' placeholder="property's value" onChange={(e) => this.handleSubmit(e, key)} />)
            }
        }
        const formItems = data.map((item, index) => (
            <Row className='property-items' key={index + '_row'}>
                <Col>
                    <Form.Item
                        key={index}
                        required={false}
                        className='d-inline-block property-item'
                    >
                        {getFieldDecorator(`data[${index}][name]`, {
                            initialValue: item.name,
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "Please input property's name or delete this row.",
                            }],
                        })(
                            <Input name='property-name' placeholder="Property's name"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        required={false}
                        key={index + '_type'}
                        className='d-inline-block property-item'
                    >
                        {getFieldDecorator(`data[${index}][dataType]`, {
                            initialValue: (item.dataType || {}).id,
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                message: "Please input data type or delete this row.",
                                type: 'number'
                            }],
                        })(
                            prepareDataTypes(index)
                        )}
                    </Form.Item>
                    <Form.Item
                        required={false}
                        key={index + '_value'}
                        className='d-inline-block property-item'
                    >
                        {getFieldDecorator(`data[${index}][defaultValue]`, {
                            initialValue: item.defaultValue,
                            validateTrigger: ['onChange', 'onBlur'],
                        })(
                            preparePropertyValue(index)
                        )}

                    </Form.Item>
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
                    <Form.Item
                        required={false}
                        key={index + '_id'}
                        className='hidden-item'
                    >
                        {getFieldDecorator(`data[${index}][id]`, {
                            initialValue: item.id,
                        })(
                            <Input type='hidden' name={`data[${index}][id]`} />
                        )}

                    </Form.Item>
                    <Form.Item
                        required={false}
                        key={index + '_btn_alert'}
                        className='d-inline-block property-item property-btn-control'
                    >
                        <Button htmlType='submit' onClick={(e) => this.handleSubmit(e, index, true)}>Manage Alerts</Button>

                    </Form.Item>
                    <Icon
                        className='dynamic-delete-button d-inline-block'
                        type='check-circle'
                        onClick={() => this.createOrUpdateProperty(index, item)}
                    />
                    {data.length > 1 ? (
                        <Icon
                            className='dynamic-delete-button d-inline-block'
                            type='minus-circle-o'
                            disabled={data.length === 1}
                            onClick={() => this.remove(index, item.key)}
                        />
                    ) : null}
                </Col>

                <Col className='checklist-item'>
                    <Form.Item
                        key={index + '_isLogged'}
                        required={false}
                        className='d-inline-block property-item__checkbox'
                    >
                        {getFieldDecorator(`data[${index}][isLogged]`, {
                            initialValue: item.isLogged,
                            validateTrigger: ['onChange', 'onBlur'],
                        })(
                            <Checkbox name='property-isLogged' defaultChecked={item.isLogged}>Logged</Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item
                        key={index + '_isPersistent'}
                        required={false}
                        className='d-inline-block property-item__checkbox'
                    >
                        {getFieldDecorator(`data[${index}][isPersistent]`, {
                            initialValue: item.isPersistent,
                            validateTrigger: ['onChange', 'onBlur'],
                        })(
                            <Checkbox name='property-isPersistent' defaultChecked={item.isPersistent}>Persistent</Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item
                        key={index + '_isReadOnly'}
                        required={false}
                        className='d-inline-block property-item__checkbox'
                    >
                        {getFieldDecorator(`data[${index}][isReadOnly]`, {
                            initialValue: item.isReadOnly,
                            validateTrigger: ['onChange', 'onBlur'],
                        })(
                            <Checkbox name='property-isReadOnly' defaultChecked={item.isReadOnly}>Read Only</Checkbox>
                        )}
                    </Form.Item>
                </Col>

            </Row>
        ))

        return (
            <div className='thing-property' >
                <div className='row'>
                    <div className='col-lg-2 text-justify'>
                        <p>Thing information include thingname and password, these field are provide for accession.
                            After this thing is created success, you can give these information for a person, so they can loged in.</p>
                    </div>
                    <div className='col-md-10'>
                        <div className='inherit-property'>
                            <h4>Inherit Properties</h4>
                            {inheritProperties.length > 0 && <table className='inherit-properties'>
                                <tbody>
                                    <tr>
                                        <th>Property Name</th>
                                        <th>Data Type</th>
                                        <th>Property Value</th>
                                    </tr>
                                </tbody>
                                {inheritProperties.map(x => (
                                    <tbody key={x.id}>
                                        <tr>
                                            <td><Input name='property-name' disabled={true} value={x.name} /></td>
                                            <td><Input name='property-type' disabled={true} value={getDataTypeName(x.dataType)} /></td>
                                            <td><Input name='property-value' disabled={true} value={x.defaultValue} /></td>
                                        </tr>
                                        <tr>
                                            <td> <Checkbox className='check-box' name='property-isPersistent' defaultChecked={x.isPersistent}>Persistent</Checkbox></td>
                                            <td> <Checkbox className='check-box' name='property-isLogged' defaultChecked={x.isLogged}>Logged</Checkbox></td>
                                            <td> <Checkbox className='check-box' name='property-isReadOnly' defaultChecked={x.isReadOnly}>ReadOnly</Checkbox></td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>}
                            {inheritProperties.length <= 0 && <h6><i>No inherit properties</i></h6>}
                        </div>
                        <Divider />
                        <div className='custom-property'>
                            <h4>Custom Properties</h4>
                            <div className='property-item property-item__title '>
                                <strong className='property-title '>Property Name</strong>
                            </div>
                            <div className='property-item property-item__title '>
                                <strong className='property-title '>Data Type</strong>
                            </div>
                            <div className='property-item property-item__title '>
                                <strong className='property-title '>Property Value</strong>
                            </div>
                            <Form onSubmit={this.handleSubmit} ref='form' name='createForm' className='col-md-12 thing-dynamic-form' >
                                {formItems}
                                <Form.Item>
                                    <Button type='dashed' onClick={() => this.add()} style={{ width: '60%' }}>
                                        <Icon type='plus' /> Add field
                        </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const PropertyPage = Form.create()(DynamicFieldSet);

export default PropertyPage