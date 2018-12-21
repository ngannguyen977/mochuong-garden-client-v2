import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from './detail'
import { Input, Button, Tabs, Icon } from 'antd'
import GroupList from '../../Groups/GroupPage/group.summary'
import PermissionList from '../../Permissions/PermissionPage/permission.summary'
import queryString from 'query-string'

const Search = Input.Search;
const TabPane = Tabs.TabPane;

@connect(
    mapStateToProps,
    mapDispathToProps,
)
export class DetailTabPage extends React.Component {

    componentWillMount() {
        const { match, getOne } = this.props
        getOne(match.params.id)
    }

    render() {
        const { update, detail } = this.props
        let groupIds = ((detail || {}).groups || []).map(x => x.id)
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
                    onClick={() => update(detail.id, detail, true)}
                >
                    Change
                        </Button>
            </div>
        )
        const moreTabContent = (type, dom) => (
            <div className={type + ' row'}>
                <div className='col-lg-4 text-justify'>
                    <div className='form-group'>
                        <p>User permissions specify what tasks users can perform and what features users can access. For example, users with the “Handle Device is sense in third floor” permission can view Devices pages, and users can access any in third floor is sense.</p>
                        <p>You can add this user to groups, then this user will have all permissions in these groups. Another way, you can set permissions for this user explicit by click on button switch to change to attach permission mode. </p>
                    </div>
                </div>
                <div className='col-lg-8'>
                    <h3 className='text-capitalize'>{type} for this user</h3>
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
                <DetailPage isEdit={true} />
                {handleButton}
            </div>
        )

        return (
            <div className='user-detail'>
                <Tabs defaultActiveKey='1' >
                    <TabPane tab={<span><Icon type='info-circle' />Information</span>} key='1'>{tabDetail}</TabPane>
                    <TabPane tab={<span><Icon type='team' />Groups</span>} key='2'>{moreTabContent('groups',
                        <GroupList
                            groupIds={groupIds}
                            userId={(detail || {}).id}
                        />)}</TabPane>
                    <TabPane tab={<span><Icon type='profile' />Permissions</span>} key='3'>{moreTabContent('permissions', <PermissionList
                        userId={(detail || {}).id}
                        groupIds={groupIds}
                        permissionIds={((detail || {}).permissions || []).map(x => x.policyId)} />)}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default DetailTabPage