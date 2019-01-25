import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from './detail'
import { Input, Button, Tabs, Icon } from 'antd'
import ResourceList from './resource'
import CertificatePage from './certificate'

const Search = Input.Search;
const TabPane = Tabs.TabPane;

@connect(
    mapStateToProps,
    mapDispathToProps,
)
export class DetailTabPage extends React.Component {
    constructor() {
        super()
        this.state = {
            isDetail: true
        }
    }
    componentWillMount() {
        const { match, getOne } = this.props
        getOne(match.params.id)
    }
    render() {
        const { update, detail, match, history, location } = this.props
        const handleButton = (
            <div className='text-right'>
                <Button
                    type='default'
                    className='text-capitalize'
                    style={{ marginRight: '15px' }}
                    href='#/policies'
                >
                    Cancel
                        </Button>
                <Button
                    type='primary'
                    className='text-capitalize'
                    style={{ marginRight: '25px' }}
                    onClick={() => update(detail.policyId, detail, true)}
                >
                    Change
                        </Button>
            </div>
        )
        const tabDetail = (
            <div className='detail-tab'>
                <DetailPage isEdit={this.state.isDetail} />
                {handleButton}
            </div>
        )
        const tabCertificate = (
            <div className='property-tab'>
                <CertificatePage match={match} history={history} location={location} isEdit={true} />
                {handleButton}
            </div>
        )
        return (
            <div className='policy-detail'>
                <Tabs defaultActiveKey='1' >
                    <TabPane tab={<span><Icon type='info-circle' />Information</span>} key='1'>{tabDetail}</TabPane>
                    <TabPane tab={<span><Icon type='api' />Certificate</span>} key='2'>{tabCertificate}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default DetailTabPage