import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from './detail'
import { Input, Button, Tabs, Icon } from 'antd'
import ThingList from './thing'


const Search = Input.Search;
const TabPane = Tabs.TabPane;

@connect(
    mapStateToProps,
    mapDispathToProps,
)
export class DetailTabPage extends React.Component {

    componentWillMount() {
        const { match, getOne } = this.props
        getOne(match.params.name)
    }

    render() {
        const { detail, match, history ,location } = this.props
        const update = (type) => {
            switch (type) {
                case 'detail':
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
                    href='users'
                >
                    Cancel
                        </Button>
                <Button
                    disabled={type === 'detail'}
                    type='primary'
                    className='text-capitalize'
                    style={{ marginRight: '25px' }}
                    onClick={() => update(type)}
                >
                    Change
                        </Button>
            </div>
        )
        return (
            <div className='user-detail'>
                <Tabs defaultActiveKey='1' >
                    <TabPane tab={<span><Icon type='info-circle' />Information</span>} key='1'>
                        <div className='detail-tab'>
                            <DetailPage isEdit={true} />
                            {handleButton('detail')}
                        </div></TabPane>
                    <TabPane tab={<span><Icon type='profile' />Things</span>} key='2'>
                        <div className='thing-permission'>
                            <div className='form-group'>
                                <ThingList
                                    userUuid={(detail || {}).uuid}
                                    location={location}
                                    isEdit={true}
                                    match={match}
                                    history={history}
                                />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default DetailTabPage