import React from 'react'
import { Table, Button } from 'antd'

const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  })
}

class GroupPage extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  render() {
    console.log('render',this.props)
    const { loading, selectedRowKeys } = this.state
    const { columns } = this.props
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0

    return (
      <div>
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Users Management</strong>
            </div>
          </div>
          <div className="card-body">
            <p>
              While Bootstrap uses aaa<code>em</code>s or <code>rem</code>s for defining most sizes,{' '}
              <code>px</code>s are used for grid breakpoints and container widths. This is because
              the viewport width is in pixels and does not change with the{' '}
              <a href="https://drafts.csswg.org/mediaqueries-3/#units">font size</a>.
            </p>
            <p>
              See how aspects of the Bootstrap grid system work across multiple devices with a handy
              table.
            </p>
            <br />
            <div className="table-responsive">
              <div style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  onClick={this.start}
                  disabled={!hasSelected}
                  loading={loading}
                >
                  Reload
                </Button>
                <span style={{ marginLeft: 8 }}>
                  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
              </div>
              <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default GroupPage
