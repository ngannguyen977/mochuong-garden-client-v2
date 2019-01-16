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
        if (!this.state.isLoaded) {
            this.add()
            this.setState({
                isLoaded: true
            })
        }
    }

    remove = (key) => {
        const { getFieldValue, setFieldsValue } = this.props.form
        const { form, createModel, dataTypes } = this.props
        // can use data-binding to get
        let properties = createModel.properties
        let data = getFieldValue('data') || []


        // We need at least one passenger
        if (data.length === 1) {
            return
        }
        // if (properties) {
        //     data = Object.assign(data, properties.map(x => ({ ...x, dataType: (dataTypes.find(a => a.id === x.dataType) || {}) }))) || []
        // }
        // can use data-binding to set
        setFieldsValue({
            formData: data.filter(x => x.key !== key)
        })
    }

    add = (row) => {
        const { form, createModel, dataTypes } = this.props
        const { getFieldValue, setFieldsValue } = form
        if (!row) {
            row = {
                dataType: dataTypes.find(x => x.name === 'String')
            }
        }
        let properties = createModel.properties
        let data = getFieldValue('data') || []
        if (properties) {
            data = Object.assign(data, properties.map(x => ({ ...x, dataType: (dataTypes.find(a => a.id === x.dataType) || {}) }))) || []
        }
        data.push(row)
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
                        history.push(`/alerts/${property.name}/thing`)
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
        const { isEdit, dataTypes, createModel, inheritCreateProperties } = this.props
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
                        key={index + '_btn_alert'}
                        className='d-inline-block property-item property-btn-control'
                    >
                        <Button htmlType='submit' onClick={(e) => this.handleSubmit(e, index, true)}> Add Alerts</Button>

                    </Form.Item>
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
                            {inheritCreateProperties.length > 0 && <table className='inherit-properties'>
                                <tbody>
                                    <tr>
                                        <th>Property Name</th>
                                        <th>Data Type</th>
                                        <th>Property Value</th>
                                    </tr>
                                </tbody>
                                {inheritCreateProperties.map(x => (
                                    <tbody key={x.id}>
                                        <tr>
                                            <td><Input name='property-name' disabled={true} value={x.name} /></td>
                                            <td><Input name='property-type' disabled={true} value={getDataTypeName(x.dataType)} /></td>
                                            <td><Input name='property-value' disabled={true} value={x.defaultValue} /></td>
                                        </tr>
                                        <tr>
                                            <td> <Checkbox className='check-box' name='property-isPersistent' checked={x.isPersistent}>Persistent</Checkbox></td>
                                            <td> <Checkbox className='check-box' name='property-isLogged' checked={x.isLogged}>Logged</Checkbox></td>
                                            <td> <Checkbox className='check-box' name='property-isReadOnly' checked={x.isReadOnly}>ReadOnly</Checkbox></td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>}
                            {inheritCreateProperties.length <= 0 && <h6><i>No inherit properties</i></h6>}
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
                                {!isEdit && <Form.Item >
                                    <Button type='primary' htmlType='submit'>Submit</Button>
                                </Form.Item>}
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