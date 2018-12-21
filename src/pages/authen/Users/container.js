import { getList, getOne, changeStatus, create, destroy, getUsersByGroup } from 'reducers/user'
import { getList as getPermissions, getByGroup as getPermissionByGroup } from 'reducers/permission'
import { getList as getGroups, create as createGroup } from 'reducers/group'
import helper from '../../../helper'

const steps = [
  {
    title: 'Adding details',
    subTitle: 'Adding User Information',
    icon: 'loading',
    iconDefault: 'user',
    status: 'process',
    index: 0,
    nextTitle: 'Next: Permission',
  },
  {
    title: 'Set permission',
    subTitle: 'Set Permission for User',
    icon: 'solution',
    iconDefault: 'solution',
    status: 'wait',
    index: 1,
    nextTitle: 'Next: Review',
  },
  {
    title: 'Review',
    subTitle: 'Review',
    icon: 'menu-unfold',
    iconDefault: 'menu-unfold',
    status: 'wait',
    index: 2,
    nextTitle: 'Create User',
  },
  {
    title: 'Done',
    subTitle: 'Create User Complete',
    icon: 'check-circle',
    iconDefault: 'check-circle',
    status: 'wait',
    index: 3,
    nextTitle: 'Go to Users List',
  },
]

const reviewColumns = [
  {
    title: 'Policy name',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: '10%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: '30%',
  },
]

const type = {
  del: 'del',
  changeStatus: 'change-status',
  attachPolicy: 'attach-policy',
  addToGroup: 'add-to-group',
  group: 'group',
  permission: 'permission',
}
const summaryColumns = [
  {
    title: 'Username',
    dataIndex: 'username',
    sorter: true,
    width: '33%',
  },
  {
    title: 'Role',
    dataIndex: 'role.name',
    sorter: true,
    width: '33%',
  },
  {
    title: 'Last Activity',
    dataIndex: 'last_login',
    sorter: true,
    width: '15%',
    render: x => helper.formatDate(new Date(x)),
  },
]

export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  changeStatus: (id, status) => changeStatus(id, status),
  create: (model, iscreate) => create(model, iscreate),
  createGroup: (model, iscreate) => createGroup(model, iscreate),
  destroy: ids => destroy(ids),
  getOne: id => getOne(id),
  getPermissions: () => getPermissions(),
  getGroups: () => getGroups(),
  getPermissionByGroup: ids => getPermissionByGroup(ids),
  getUsersByGroup: groupId => getUsersByGroup(groupId),
}
export const mapStateToProps = (state, props) => {
  let user = state.user || {}
  return {
    totalItems: user.totalItems,
    page: user.page,
    data: user.users,
    userCreate: user.userCreate || {},
    groupCreate: state.group.groupCreate || {},
    groups: state.group.groups,
    steps: steps,
    reviewColumns: reviewColumns,
    summaryColumns: summaryColumns,
    type: type,
    detail: user.detail,
    permission: state.permission,
    group: state.group,
    userCreatePermission: (state.permission || {}).userCreatePermission,
    usersInGroup: state.user.usersInGroup,
  }
}

export default { mapStateToProps, mapDispathToProps }