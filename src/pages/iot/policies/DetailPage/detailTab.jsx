import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from './detail'
import { Input, Button, Tabs, Icon } from 'antd'
import ResourceList from './resource'

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
        const { update, detail } = this.props
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
                    onClick={() => update(detail.policyId,detail,true)}
                >
                    Change
                        </Button>
            </div>
        )
        const moreTabContent = (type, dom) => (
            <div className={type + ' row'}>
                <div className='col-lg-4 text-justify'>
                    <div className='form-group'>
                        <p>With most services, your policyname is a name you created, or that has been assigned to you. If you do not recall creating a policyname,
                             (or don't remember the name you chose), try using your e-mail address as your policyname.
                 If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
                        <p>With most services, your policyname is a name you created, or that has been assigned to you. If you do not recall creating a policyname,
                        (or don't remember the name you chose), try using your e-mail address as your policyname.
                 If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
                    </div>
                </div>
                <div className='col-lg-8'>
                    <h3 className='text-capitalize'>{type} for this policy</h3>
                    <div className='row'>
                        <div className='col-lg-9'>
                            <Search
                                placeholder={'search ' + type}
                                onSearch={value => console.log(value)}
                            // style={{ width: 200 }}
                            />
                            <small className='font-italic text-right'>*Add policy to groups help you manage your policies easier. You can add policy to many policies by add policy to group instead.</small>
                        </div>
                    </div>
                    <div className='form-group'>
                        {dom}
                    </div>
                </div>
            </div>
        )
        const tabDetail = (
            <div className='detail-tab'>
                <DetailPage isEdit={this.state.isDetail} />
                {handleButton}
            </div>
        )
        return (
            <div className='policy-detail'>
                <Tabs defaultActiveKey='1' >
                    <TabPane tab={<span><Icon type='info-circle' />Information</span>} key='1'>{tabDetail}</TabPane>
                    <TabPane tab={<span><Icon type='profile' />Resources</span>} key='2'>{moreTabContent('resources', <ResourceList />)}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default DetailTabPage