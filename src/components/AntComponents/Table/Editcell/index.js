import React from 'react'
import './style.scss'
import { Table, Input, Icon, Button, Popconfirm } from 'antd'

export default function(ReactDOM, mountNode) {
  class EditableCell extends React.Component {
    state = {
      value: this.props.value,
      editable: false,
    }
    handleChange = e => {
      const value = e.target.value
      this.setState({ value })
    }
    check = () => {
      this.setState({ editable: false })
      if (this.props.onChange) {
        this.props.onChange(this.state.value)
      }
    }
    edit = () => {
      this.setState({ editable: true })
    }
    render() {
      const { value, editable } = this.state
      return (
        <div className='editable-cell'>
          {editable ? (
            <div className='editable-cell-input-wrapper'>
              <Input value={value} onChange={this.handleChange} onPressEnter={this.check} />
              <Icon type='check' className='editable-cell-icon-check' onClick={this.check} />
            </div>
          ) : (
            <div className='editable-cell-text-wrapper'>
              {value || ' '}
              <Icon type='edit' className='editable-cell-icon' onClick={this.edit} />
            </div>
          )}
        </div>
      )
    }
  }

  class EditableTable extends React.Component {
    constructor(props) {
      super(props)
      this.columns = [
        {
          title: 'name',
          dataIndex: 'name',
          width: '30%',
          render: (text, record) => (
            <EditableCell value={text} onChange={this.onCellChange(record.key, 'name')} />
          ),
        },
        {
          title: 'age',
          dataIndex: 'age',
        },
        {
          title: 'address',
          dataIndex: 'address',
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          render: (text, record) => {
            return this.state.dataSource.length > 1 ? (
              <Popconfirm title='Sure to delete?' onConfirm={() => this.onDelete(record.key)}>
                <a href='#;'>Delete</a>
              </Popconfirm>
            ) : null
          },
        },
      ]

      this.state = {
        dataSource: [
          {
            key: '0',
            name: 'Edward King 0',
            age: '32',
            address: 'London, Park Lane no. 0',
          },
          {
            key: '1',
            name: 'Edward King 1',
            age: '32',
            address: 'London, Park Lane no. 1',
          },
        ],
        count: 2,
      }
    }
    onCellChange = (key, dataIndex) => {
      return value => {
        const dataSource = [...this.state.dataSource]
        const target = dataSource.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value
          this.setState({ dataSource })
        }
      }
    }
    onDelete = key => {
      const dataSource = [...this.state.dataSource]
      this.setState({ dataSource: dataSource.filter(item => item.key !== key) })
    }
    handleAdd = () => {
      const { count, dataSource } = this.state
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`,
      }
      this.setState({
        dataSource: [...dataSource, newData],
        count: count + 1,
      })
    }
    render() {
      const { dataSource } = this.state
      const columns = this.columns
      return (
        <div>
          <Button className='editable-add-btn' onClick={this.handleAdd}>
            Add
          </Button>
          <Table bordered dataSource={dataSource} columns={columns} />
        </div>
      )
    }
  }

  ReactDOM.render(<EditableTable />, mountNode)
}
