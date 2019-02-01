import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from './detail'
import PropertyPage from './property'
import CertificatePage from './certificate'
import ThingChildrenPage from './things'
import { Input, Button, Tabs, Icon } from 'antd'


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
            loadedTemplateProperties: false
        }
    }
    componentWillMount() {
        const { match, getOne } = this.props
        getOne(match.params.id)
    }

    handleTab(tab, id) {
        this.props.setCurrentTab(id, tab)
    }
    render() {
        const { detail, update, updateProperty, match, history, location, tabs } = this.props
        const _update = (type) => {
            switch (type) {
                case 'detail':
                    update(detail.id, detail, true)
                    break
                case 'property':
                    updateProperty(detail.id, true)
                    break
                default:
                    break
            }
        }
        const handleButton = (type) => (
            <div className='text-right'>
                <Button
                    type='default'
                    className='text-capitalize'
                    style={{ marginRight: '15px' }}
                    href='#/things'
                >
                    Cancel
                        </Button>
            </div>
        )

        const tabDetail = (
            <div className='detail-tab'>
                <DetailPage isEdit={true} />
                {handleButton('detail')}
            </div>
        )
        const tabProperty = (
            <div className='property-tab'>
                <PropertyPage match={match} history={history} isEdit={true} _update={_update} />
                {handleButton('property')}
            </div>
        )
        const tabThing = (
            <div className='property-tab'>
                <ThingChildrenPage match={match} history={history} location={location} isEdit={true} _update={_update} />
                {handleButton('thing')}
            </div>
        )
        const tabCertificate = (
            <div className='property-tab'>
                <CertificatePage match={match} history={history} location={location} isEdit={true} _update={_update} />
                {handleButton('certificate')}
            </div>
        )
        return (
            <div className='thing-detail'>
                <Tabs defaultActiveKey={(tabs.find(x => x.id === match.params.id) || {}).tab || '1'}
                    onTabClick={(tab) => this.handleTab(tab, match.params.id)}>
                    <TabPane tab={<span><Icon type='info-circle' />Information</span>} key='1'>{tabDetail}</TabPane>
                    <TabPane tab={<span><Icon type='project' />Properties</span>} key='2'>{tabProperty}</TabPane>
                    <TabPane tab={<span><Icon type='loading-3-quarters' />Activity Logs</span>} key='3'></TabPane>
                </Tabs>
            </div>
        )
    }
}

export default DetailTabPage