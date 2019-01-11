import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import {
    Form, Input, InputNumber, DatePicker, message, Checkbox, Icon, Button, Select, Row, Col
} from 'antd'
const { TextArea } = Input
const { Option } = Select;
const propertyType = [
    'JSON',
    'NUMBER',
    'STRING',
    'PICTURE',
    'BOOLEAN'
]

@connect(
    mapStateToProps,
    mapDispathToProps,
)
class DynamicFieldSet extends React.Component {


    componentDidUpdate() {
        const { isEdit, detail } = this.props
        const { getFieldValue, setFieldsValue } = this.props.form
        let data = getFieldValue('moa') || []
        console.log('componentDidMount', data, detail)
        if (data.length === 0) {
            if (isEdit && detail) {
                this.add(undefined, true)
            }
            if (!isEdit) {
                this.add()
            }
        }
    }
    createOrAddProperty = (key, item) => {
        const { isEdit, match, createProperty, updateProperty, createModel, templateProperties } = this.props
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
            dataType: _data.type,
            defaultValue: _data.value,
            parentId: match.params.id
        }
        if (_data.id !== item.id) {
            message.warn(`Ky vay ta!`)
            return
        }
        if (!item.id) {
            createProperty({ ...model })
            return
        }
        updateProperty(item.id, { ...model })

        // can use data-binding to set
        setFieldsValue({
            moa: data
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
            moa: data.filter(x => x.key !== key)
        })
    }

    add = (row = { type: 'STRING' }, isFirstLoad = false) => {
        const { isEdit, form, createModel, detail, dataTypes } = this.props
        const { getFieldValue, setFieldsValue } = form
        let properties = isEdit ? (detail || {}).properties : createModel.properties
        let data = getFieldValue('data') || []
        console.log('fill data', properties,data)
        if (properties) {
            data = Object.assign(data, !isEdit ? properties : properties.map(x => ({ ...x, type: (dataTypes.find(a => a.id === x.id) || {}).name })))
        }
        if (!isFirstLoad) {
            data.push(row)
        }
        console.log('add sao null', data)
        setFieldsValue({
            moa: data
        })
    }

    handleSubmit = (e, key, addAlert = false) => {
        e.preventDefault();
        const { create, createModel, history, match } = this.props
        this.props.form.validateFields((err, values) => {
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
                console.log('Received values of form', properties)
                create({ ...createModel, properties })
                if (addAlert) {
                    let property = (properties.find(x => x.key === key) || {})
                    if (property && property.name) {
                        history.push(`/alerts/${property.name}?templateId=${(match.params || {}).id}&propertyId=${property.id}`)
                    }
                }
            } else {
                message.warn(`Bạn phải nhập gì vào chứ!`)
            }
        });
    }
    changeType(key, type) {
        const { getFieldValue, setFieldsValue } = this.props.form
        let datas = getFieldValue('data') || []
        let data = datas.find(x => x.key === key)
        if (data) {
            data.type = type
        }
        setFieldsValue({
            moa: datas
        })
    }
    checkBoxChange(key, e) {
        console.log(e)
        let checked = e.target.checked
        const { getFieldValue, setFieldsValue } = this.props.form
        let datas = getFieldValue('data') || []
        let data = datas.find(x => x.key === key)
        if (data) {
            data.value = checked
        }
        setFieldsValue({
            moa: datas
        })
    }
    render() {
        const { isEdit } = this.props
        const { getFieldDecorator, getFieldValue, getFieldsValue } = this.props.form
        const { properties } = this.props.createModel
        // console.log('render-data', initKeys, initData)
        getFieldDecorator('moa', { initialValue: properties ? properties : [] })
        const data = getFieldValue('moa') || []
        console.log(getFieldsValue(), properties)
        // console.log('render-get', data)
        const dataTypes = (key) => (
            <Select name='data-type' placeholder='data type' width='100px'
                onChange={(e) => this.changeType(key, e)}
            >
                {propertyType.map(x => (
                    <Option key={x} value={x}>{x}</Option>
                ))}
            </Select>)

        const preparePropertyValue = (key) => {
            let item = data.find(x => x.key === key) || {}
            switch (item.type) {
                case propertyType[1]://number
                    return (<InputNumber name='property-value' />)
                case propertyType[0]://json
                    return (<TextArea rows={4} name='property-value' />)
                case propertyType[4]: //bool
                    return (<Checkbox name='property-value' checked={item.value === true} onChange={(e) => this.checkBoxChange(key, e)} >{(item.value === true) ? 'True' : 'False'}</Checkbox>)
                case propertyType[2]://string
                case propertyType[3]://pic
                default:
                    return (<Input name='property-value' placeholder="property's value" />)
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
                            <Input name='property-name' placeholder="Property's name" />
                        )}
                    </Form.Item>
                    <Form.Item
                        required={false}
                        key={index + '_type'}
                        className='d-inline-block property-item'
                    >
                        {getFieldDecorator(`data[${index}][type]`, {
                            initialValue: item.type,
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                message: "Please input data type or delete this row.",
                                type: 'string'
                            }],
                        })(
                            dataTypes(index)
                        )}
                    </Form.Item>
                    <Form.Item
                        required={false}
                        key={index + '_value'}
                        className='d-inline-block property-item'
                    >
                        {getFieldDecorator(`data[${index}][value]`, {
                            initialValue: item.value,
                            validateTrigger: ['onChange', 'onBlur'],
                            // rules: [{
                            //     // required: item.type !== '5',
                            //     message: "Please input property's value or delete this row.",
                            // }],
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
                        <Button htmlType='submit' onClick={(e) => this.handleSubmit(e, index, true)}> {isEdit && item.id ? 'Manage Alerts' : 'Add Alerts'}</Button>

                    </Form.Item>
                    {isEdit ? (
                        <Icon
                            className='dynamic-delete-button d-inline-block'
                            type='check-circle'
                            onClick={() => this.createOrAddProperty(index, item)}
                        />
                    ) : null}
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
            <div className='template-property' >
                <div className='row'>
                    <div className='col-lg-2 text-justify'>
                        <p>Template information include templatename and password, these field are provide for accession.
                            After this template is created success, you can give these information for a person, so they can loged in.</p>
                    </div>
                    <div className='col-md-10'>
                        <div className='property-item property-item__title '>
                            <p className='property-title '>Property Name</p>
                        </div>
                        <div className='property-item property-item__title '>
                            <p className='property-title '>Data Type</p>
                        </div>
                        <div className='property-item property-item__title '>
                            <p className='property-title '>Property Value</p>
                        </div>
                        <Form onSubmit={this.handleSubmit} className='col-md-12 template-dynamic-form' >
                            {formItems}
                            <Form.Item >
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
        )
    }
}

const PropertyPage = Form.create()(DynamicFieldSet);

export default PropertyPage