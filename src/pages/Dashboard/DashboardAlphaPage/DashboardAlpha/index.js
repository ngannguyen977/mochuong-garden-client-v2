import React from 'react'
import ChartCard from 'components/CleanComponents/ChartCard'
import SliderCard from '../../../components/SliderCard'
import { Button, Table } from 'antd'
import { tableData } from './data.json'
import ChartistGraph from 'react-chartist'
import Chartist from 'chartist'
import { Line, Bar, Radar, Polar, Pie, Doughnut } from 'react-chartjs-2'

class DashboardAlpha extends React.Component {
  state = {
    tableData: tableData,
  }

  render() {
    const pieData = {
      labels: [
        'HaProxy',
        'Security Calling Service',
        'Authentication Services',
        'Policy Service',
        'Resource service',
        'IoT service',
      ],
      datasets: [
        {
          data: [100, 50, 300, 200, 150, 600],
          backgroundColor: ['#cf1322', '#531dab', '#d46b08', '#7cb305', '#003a8c', '#c41d7f'],
          hoverBackgroundColor: ['#f5222d', '#722ed1', '#fa8c16', '#a0d911', '#0050b3', '#eb2f96'],
        },
      ],
    }

    const pieOptions = {}

    const polarData = {
      datasets: [
        {
          data: [11, 16, 7, 3, 14],
          backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
          label: 'My dataset', // for legend
        },
      ],
      labels: ['Đà Nẵng', 'Hà Nội', 'Huế', 'Vinh', 'Hồ Chí Minh'],
    }

    const polarOptions = {
      elements: {
        arc: {
          borderColor: '#4BC0C0',
        },
      },
    }
    const animationData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [1, 2, 2.7, 0, 3, 5, 3, 4, 8, 10, 12, 7],
        [0, 1.2, 2, 7, 2.5, 9, 5, 8, 9, 11, 14, 4],
        [10, 9, 8, 6.5, 6.8, 6, 5.4, 5.3, 4.5, 4.4, 3, 2.8],
      ],
    }

    const animatonOptions = {
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 !== 0 ? !1 : value
        },
      },
    }
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
    const services = [
      {
        name: 'Communication Service',
        status: ['CPU: 100% - unhealthy', 'Memory: 99% - unhealthy', 'Network: 100% - unhealthy'],
        icon: 'icmn-connection',
        level: 'danger',
      },
      {
        name: 'Security Calling Service',
        status: ['CPU: 73% - unhealthy', 'Memory: 80% - unhealthy', 'Network: 60% - unhealthy'],
        icon: 'icmn-phone',
        level: 'warning',
      },
      {
        name: 'Healthy check Service',
        status: ['CPU: 1% - healthy', 'Memory: 40% - healthy', 'Network: 2% - healthy'],
        icon: 'icmn-plus',
        level: 'normal',
      },
    ]
    const services2 = [
      {
        name: 'Authentication Service',
        status: ['CPU: 1% - healthy', 'Memory: 60% - healthy', 'Network: 5% - healthy'],
        icon: 'icmn-users',
        level: 'normal',
      },
      {
        name: 'IoT Service',
        status: ['CPU: 30% - healthy', 'Memory: 60% - healthy', 'Network: 30% - healthy'],
        icon: 'icmn-podcast',
        level: 'normal',
      },
      {
        name: 'Policy Service',
        status: ['CPU: 1% - healthy', 'Memory: 40% - healthy', 'Network: 2% - healthy'],
        icon: 'icmn-file-text2',
        level: 'normal',
      },
      {
        name: 'Resource Service',
        status: ['CPU: 1% - healthy', 'Memory: 40% - healthy', 'Network: 2% - healthy'],
        icon: 'icmn-file-stack',
        level: 'normal',
      },
    ]
    const gateways = [
      {
        name: 'OS Vietnam Showroom',
        status: ['Status: Disalarm', 'Last Connected: 4:05 PM Today'],
        icon: 'icmn-library',
        level: 'normal',
      },
      {
        name: 'OS Vietnam Office',
        status: ['Status: Alarm Away', 'Last Connected: 4:05 PM Today'],
        icon: 'icmn-office',
        level: 'normal',
      },
      {
        name: 'OS Mr. Tung',
        status: ['Status: Disalarm', 'Last Connected: 4:05 PM Today'],
        icon: 'icmn-home',
        level: 'normal',
      },
    ]
    const customers = [
      {
        name: 'Alex Huynh',
        status: ['Status: Near expired', 'Expired on: 4:05 PM Saturday'],
        icon: 'icmn-user',
        level: 'warning',
      },
      {
        name: 'Anh Tam',
        status: ['Status: Near expired', 'Expired on: 4:05 PM Saturday'],
        icon: 'icmn-user',
        level: 'normal',
      },
    ]

    return (
      <div>
        <div className="utils__title utils__title--flat mb-3">
          <span className="text-uppercase font-size-16">Statistics Overview</span>
        </div>
        <div className="row">
          <div className="col-xl-4">
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
          <div className="col-xl-4">
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
          <div className="col-xl-4">
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
        <div className="row">
          <div className="card">
            <div className="card-header">
              <div className="utils__title">
                <strong>Server Info</strong>
              </div>
              <div className="utils__titleDescription">
                Block with important Server Info information
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3">
                  <SliderCard data={services} />
                </div>
                <div className="col-lg-3">
                  <SliderCard data={gateways} />
                </div>
                <div className="col-lg-3">
                  <SliderCard data={services2} />
                </div>
                <div className="col-lg-3">
                  <SliderCard data={customers} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <div className="utils__title">Gateway connect status</div>
                <div className="utils__titleDescription">
                  Recently, more 36 gateways are connected.
                </div>
              </div>
              <div className="card-body">
                <div className="mb-5">
                  <ChartistGraph
                    className="height-300 chart-css-animations chartist-theme-dark chartist-animated"
                    data={animationData}
                    options={animatonOptions}
                    type="Line"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <div className="utils__title">Customer Region</div>
                <div className="utils__titleDescription">
                  We are tracking all customer when they registered.
                </div>
              </div>
              <div className="card-body">
                <div className="mb-5">
                  <Polar data={polarData} options={polarOptions} width={400} height={200} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <div className="utils__title">Cost Transfer</div>
                <div className="utils__titleDescription">Cost for all service registered.</div>
              </div>
              <div className="card-body">
                <div className="mb-5">
                  <Pie data={pieData} options={pieOptions} width={400} height={200} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <div className="utils__title">Recently Customer Registered</div>
                <div className="utils__titleDescription">
                  Recently, more 36 percent customer registration than last week.
                </div>
              </div>
              <div className="card-body">
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
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center pb-5">
              <Button type="primary" className="width-200" loading>
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
