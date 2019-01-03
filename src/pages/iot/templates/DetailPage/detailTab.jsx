import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from './detail'
import { Input, Button, Tabs, Icon } from 'antd'


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
        const { detail, changeGroupsForTemplate, templateUpdate, changePermissionsForTemplate } = this.props
        let groupIds = ((detail || {}).groups || []).map(x => x.id)
        const update = (type) => {
            switch (type) {
                case 'groups':
                    changeGroupsForTemplate(templateUpdate.groups, detail.id, true)
                    break
                case 'permissions':
                    changePermissionsForTemplate(templateUpdate.permissions, detail.uuid, true)
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
        const moreTabContent = (type, dom) => (
            <div className={type + ' row'}>
                <div className='col-lg-4 text-justify'>
                    <div className='form-group'>
                        <p>Template permissions specify what tasks templates can perform and what features templates can access. For example, templates with the “Handle Device is sense in third floor” permission can view Devices pages, and templates can access any in third floor is sense.</p>
                        <p>You can add this template to groups, then this template will have all permissions in these groups. Another way, you can set permissions for this template explicit by click on button switch to change to attach permission mode. </p>
                    </div>
                </div>
                <div className='col-lg-8'>
                    <h3 className='text-capitalize'>{type} for this template</h3>
                    <div className='row'>
                        <div className='col-lg-9'>
                            <Search
                                placeholder={'search ' + type}
                                onSearch={value => console.log(value)}
                            // style={{ width: 200 }}
                            />
                            <small className='font-italic text-right'>*Add template to groups help you manage your templates easier. You can add permission to many templates by add permission to group instead.</small>
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
                    {handleButton(type)}
                </div>
            </div>
        )
        const tabDetail = (
            <div className='detail-tab'>
                <DetailPage isEdit={true} />
                {handleButton('detail')}
            </div>
        )

        return (
            <div className='template-detail'>
                <Tabs defaultActiveKey='1' >
                    <TabPane tab={<span><Icon type='info-circle' />Information</span>} key='1'>{tabDetail}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default DetailTabPage