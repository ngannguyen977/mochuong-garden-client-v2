import React from 'react'
import PaymentCard from 'components/CleanComponents/PaymentCard'
import PaymentAccount from 'components/CleanComponents/PaymentAccount'
import PaymentTx from 'components/CleanComponents/PaymentTx'
import ChartCard from 'components/CleanComponents/ChartCard'
import { Button, Input, Icon, Table } from 'antd'
import { tableData } from './data.json'

class DashboardAlpha extends React.Component {
  state = {
    tableData: tableData,
  }

  render() {
    const tableColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Quota',
        dataIndex: 'Quota',
        key: 'Quota',
      },
      {
        title: 'Address',
        dataIndex: 'Address',
        key: 'Address',
      },
      {
        title: 'Associated Gateway',
        dataIndex: 'Associated',
        key: 'Associated',
      },
      {
        title: 'Security Calling',
        dataIndex: 'Expired',
        key: 'Expired',
      },
      {
        title: 'Devices',
        dataIndex: 'device',
        key: 'device',
      },
    ]

    return (
      <div>
        <div className='utils__title utils__title--flat mb-3'>
          <span className='text-uppercase font-size-16'>Statistics Overview</span>
        </div>
        <div className='row'>
          <div className='col-xl-4'>
            <ChartCard
              title={'Transactions'}
              amount={'1240'}
              chartProps={{
                width: 120,
                height: 107,
                lines: [
                  {
                    values: [2, 11, 8, 14, 18, 20, 26],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
          <div className='col-xl-4'>
            <ChartCard
              title={'Income'}
              amount={'290,240'}
              chartProps={{
                width: 120,
                height: 107,
                lines: [
                  {
                    values: [20, 80, 67, 120, 132, 66, 97],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
          <div className='col-xl-4'>
            <ChartCard
              title={'Outcome'}
              amount={'284,056'}
              chartProps={{
                width: 120,
                height: 107,
                lines: [
                  {
                    values: [42, 40, 80, 67, 84, 20, 97],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='card-header'>
                <div className='utils__title'>Recently Customer Registered</div>
                <div className='utils__titleDescription'>
                  Recently, more 36 percent customer registration than last week.
                </div>
              </div>
              <div className='card-body'>
                <Table
                  rowKey={x => x.name}
                  columns={tableColumns}
                  dataSource={this.state.tableData}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center pb-5'>
              <Button type='primary' className='width-200' loading>
                Load More...
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardAlpha
