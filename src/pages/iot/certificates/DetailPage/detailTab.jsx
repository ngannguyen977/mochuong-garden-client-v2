import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from './detail'
import ThingPage from './thing'
import PolicyPage from './policy'
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


        const tabDetail = (
            <div className='detail-tab'>
                <DetailPage isEdit={true} match={match}/>
            </div>
        )
        const tabThing = (
            <div className='property-tab'>
                <ThingPage match={match} history={history} location={location} isEdit={true} _update={_update} />
            </div>
        )
        const tabPolicy = (
            <div className='property-tab'>
                <PolicyPage match={match} history={history} location={location} isEdit={true} _update={_update} />
            </div>
        )
        return (
            <div className='thing-detail'>
                <Tabs defaultActiveKey={(tabs.find(x => x.id === match.params.id) || {}).tab || '1'}
                    onTabClick={(tab) => this.handleTab(tab, match.params.id)}>
                    <TabPane tab={<span><Icon type='info-circle' />Information</span>} key='1'>{tabDetail}</TabPane>
                    <TabPane tab={<span><Icon type='share-alt' />Things</span>} key='2'>{tabThing}</TabPane>
                    <TabPane tab={<span><Icon type='profile' />Policies</span>} key='3'>{tabPolicy}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default DetailTabPage