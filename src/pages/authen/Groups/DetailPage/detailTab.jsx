import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from './detail'
import { Input, Button, Tabs, Icon } from 'antd'
import UserList from '../../Users/UserPage/user.summary'
import PermissionList from '../../Permissions/PermissionPage/permission.summary'
const Search = Input.Search;

const TabPane = Tabs.TabPane;

@connect(
    mapStateToProps,
    mapDispathToProps,
)
export class DetailTabPage extends React.Component {

    render() {
        const handleButton = (
            <div className='text-right'>
                <Button
                    type='default'
                    className='text-capitalize'
                    style={{ marginRight: '15px' }}
                    href='#/users'
                >
                    Cancel
                        </Button>
                <Button
                    type='primary'
                    className='text-capitalize'
                    style={{ marginRight: '25px' }}
                >
                    Change
                        </Button>
            </div>
        )
        const moreTabContent = (type, dom) => (
            <div className={type + ' row'}>
                <div className='col-lg-4 text-justify'>
                    <div className='form-group'>
                        <p>With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
                             (or don't remember the name you chose), try using your e-mail address as your username.
                 If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
                        <p>With most services, your username is a name you created, or that has been assigned to you. If you do not recall creating a username,
                        (or don't remember the name you chose), try using your e-mail address as your username.
                 If your e-mail address does not work, and you are trying to log into a service where you have an account number, try using that number.</p>
                    </div>
                </div>
                <div className='col-lg-8'>
                    <h3 className='text-capitalize'>{type} in this group</h3>
                    <div className='row'>
                        <div className='col-lg-9'>
                            <Search
                                placeholder={'search ' + type}
                                onSearch={value => console.log(value)}
                            // style={{ width: 200 }}
                            />
                            <small className='font-italic text-right'>*Add user to groups help you manage your users easier. You can add permission to many users by add permission to group instead.</small>
                        </div>
                        <div className='col-lg-3 text-right'>
                            <Button
                                type='primary'
                                className='text-capitalize'
                                onClick={this.start}
                                style={{ marginRight: '5px' }}
                                href={'#/' + type + '/create'}
                            >
                                Create&ensp;{type}
                            </Button>
                        </div>
                    </div>
                    <div className='form-group'>
                        {dom}
                    </div>
                    {handleButton}
                </div>
            </div>
        )
        const tabDetail = (
            <div className='detail-tab'>
                <DetailPage />
                {handleButton}
            </div>
        )

        return (
            <div className='user-detail'>
                <Tabs defaultActiveKey='1' >
                    <TabPane tab={<span><Icon type='info-circle' />Information</span>} key='1'>{tabDetail}</TabPane>
                    <TabPane tab={<span><Icon type='user' />Users</span>} key='2'>{moreTabContent('users', <UserList />)}</TabPane>
                    <TabPane tab={<span><Icon type='profile' />Permissions</span>} key='3'>{moreTabContent('permissions', <PermissionList />)}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default DetailTabPage