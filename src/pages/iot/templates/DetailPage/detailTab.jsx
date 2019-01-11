import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from './detail'
import PropertyPage from './property'
import { Input, Button, Tabs, Icon } from 'antd'


const Search = Input.Search;
const TabPane = Tabs.TabPane;

@connect(
    mapStateToProps,
    mapDispathToProps,
)
export class DetailTabPage extends React.Component {

    componentWillMount() {
        const { match, getOne, getPropertiesByTemplate } = this.props
        getOne(match.params.id)
        // getPropertiesByTemplate('template', match.params.id)
    }

    render() {
        const { detail, update, updateProperty, match, history } = this.props
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
                    href='#/templates'
                >
                    Cancel
                        </Button>
                <Button
                    disabled={type === 'property'}
                    type='primary'
                    className='text-capitalize'
                    style={{ marginRight: '25px' }}
                    onClick={() => _update(type)}
                >
                    Change
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

        return (
            <div className='template-detail'>
                <Tabs defaultActiveKey='1' >
                <TabPane tab={<span><Icon type='project' />Properties</span>} key='1'>{tabProperty}</TabPane>
                    <TabPane tab={<span><Icon type='info-circle' />Information</span>} key='2'>{tabDetail}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default DetailTabPage