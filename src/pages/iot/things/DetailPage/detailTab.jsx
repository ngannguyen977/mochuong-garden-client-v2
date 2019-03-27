import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from './detail'
import UserPage from './user'
import { Input, Button, Tabs, Icon } from 'antd'


const TabPane = Tabs.TabPane;

@connect(
    mapStateToProps,
    mapDispathToProps,
)
export class DetailTabPage extends React.Component {
    constructor() {
        super()
        this.state = {
            loadedTemplateProperties: false
        }
    }
    componentWillMount() {
        const { match, getOne } = this.props
        getOne(match.params.name)
    }

    handleTab(tab, id) {
        this.props.setCurrentTab(id, tab)
    }
    render() {
        const { match, location, tabs, history,userState } = this.props
        let isAdmin = userState.role.name === 'CLIENT_ADMIN'
        const handleButton = (
            <div className='text-right'>
                <Button
                    type='default'
                    className='text-capitalize'
                    style={{ marginRight: '15px' }}
                    href='#/things'
                >
                    Back
                        </Button>
            </div>
        )
        return (
            <div className='thing-detail'>
                <Tabs defaultActiveKey={(tabs.find(x => x.id === match.params.id) || {}).tab || '1'}
                    onTabClick={(tab) => this.handleTab(tab, match.params.id)}>
                    <TabPane tab={<span><Icon type='info-circle' />Information</span>} key='1'> <div className='detail-tab'>
                        <DetailPage isEdit={true} />
                        {handleButton}
                    </div></TabPane>
                   {isAdmin && <TabPane tab={<span><Icon type='user' />Users</span>} key='2'> <div className='user-tab'>
                        <UserPage isEdit={true} location={location} match={match} history={history} />
                        {handleButton}
                    </div></TabPane>}
                    <TabPane tab={<span><Icon type='loading-3-quarters' />Activity Logs</span>} key='3'></TabPane>
                </Tabs>
            </div>
        )
    }
}

export default DetailTabPage