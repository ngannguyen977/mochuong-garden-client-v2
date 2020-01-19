import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from './detail'
import ThingPage from './things'
import { Input, Button, Tabs, Icon } from 'antd'


const Search = Input.Search;
const TabPane = Tabs.TabPane;

@connect(
    mapStateToProps,
    mapDispathToProps,
)
export class DetailTabPage extends React.Component {

    render() {

        return (
            <div className='user-detail'>
                <Tabs defaultActiveKey='0' >
                    <TabPane tab={<span><Icon type='info-circle' />Notification</span>} key='0'>
                        <DetailPage isEdit={true} location={this.props.location} match={this.props.match} history={this.props.history} />
                    </TabPane>
                    <TabPane tab={<span><Icon type='info-circle' />Devices</span>} key='1'>
                        <ThingPage isEdit={true} location={this.props.location} match={this.props.match} history={this.props.history} />
                    </TabPane>
                    <TabPane tab={<span><Icon type='info-circle' />Information</span>} key='2'>
                        <ThingPage isEdit={true} location={this.props.location} match={this.props.match} history={this.props.history} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default DetailTabPage