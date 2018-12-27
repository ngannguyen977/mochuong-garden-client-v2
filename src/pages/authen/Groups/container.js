import { getList, changeStatus, create, destroy, getOne, update, changeGroupsForUser,changeUsersForGroup } from 'reducers/group'
import { getList as getPermissions,changePermissionsForGroup } from 'reducers/permission'
import { create as createUser } from 'reducers/user'
import helper from '../../../helper'

const steps = [
  {
    title: 'Adding details',
    subTitle: 'Adding Group Information',
    icon: 'loading',
    iconDefault: 'usergroup',
    status: 'process',
    index: 0,
    nextTitle: 'Next: Add Users',
  },
  {
    title: 'Add users ',
    subTitle: 'Add users to Group',
    icon: 'user',
    iconDefault: 'user',
    status: 'wait',
    index: 1,
    nextTitle: 'Next: Permissions',
  },
  {
    title: 'Attach Permissions',
    subTitle: 'Attach Permissions for Group',
    icon: 'file-protect',
    iconDefault: 'file-protect',
    status: 'wait',
    index: 2,
    nextTitle: 'Next: Review',
  },
  {
    title: 'Review',
    subTitle: 'Review create a group',
    icon: 'menu-unfold',
    iconDefault: 'menu-unfold',
    status: 'wait',
    index: 3,
    nextTitle: 'Create Group',
  },
  {
    title: 'Done',
    subTitle: 'Create Group Complete',
    icon: 'check-circle',
    iconDefault: 'check-circle',
    status: 'wait',
    index: 4,
    nextTitle: 'Go to Groups List',
  },
]

const summaryColumns = [
  {
    title: 'Group name',
    dataIndex: 'name',
    sorter: true,
    width: '33%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width: '63%',
  },
]

const reviewUserColumns = [
  {
    title: 'Username',
    dataIndex: 'username',
    width: '20%',
  },
  {
    title: 'Role',
    dataIndex: 'role.name',
    width: '20%',
  },
  {
    title: 'Last Activity',
    dataIndex: 'last_login',
    sorter: true,
    width: '15%',
    render: x => helper.formatDate(new Date(x)),
  },
]
const reviewPermissionColumns = [
  {
    title: 'Permission name',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: '20%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width: '15%',
  },
]
const type = {
  del: 'del',
  changeStatus: 'change-status',
  attachPolicy: 'attach-policy',
  addUsers: 'add-users',
}

export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  changeStatus: (id, status) => changeStatus(id, status),
  create: (model, isCreate) => create(model, isCreate),
  destroy: ids => destroy(ids),
  createUser: (model, isCreate) => createUser(model, isCreate),
  getPermissions: () => getPermissions(),
  getOne: id => getOne(id),
  update: (id, model, isUpdate) => update(id, model, isUpdate),
  changeGroupsForUser: (groupIds, userId, isChange) => changeGroupsForUser(groupIds, userId, isChange),
  changeUsersForGroup: (groupId, userIds, isChange) => changeUsersForGroup(groupId, userIds, isChange),
  changePermissionsForGroup: (permissionIds, groupUuid, isChange) => changePermissionsForGroup(permissionIds, groupUuid, isChange)
}
export const mapStateToProps = (state, props) => {
  let group = state.group || {}
  return {
    // master
    group: group,
    // page
    totalItems: group.totalItems,
    page: group.page,
    data: group.groups,
    // detail
    detail: group.detail,
    // model
    groupCreate: group.groupCreate || {},
    summaryColumns: summaryColumns,
    reviewPermissionColumns: reviewPermissionColumns,
    reviewUserColumns: reviewUserColumns,
    steps: steps,
    type: type,
    // user
    userCreate: state.user.userCreate || {},
    userUpdate: (state.user.detail || {}).userUpdate || {},
    groupUpdate: (state.group.detail || {}).groupUpdate || {},
    // permission
    permission: state.permission,
    groupCreatePermission: (state.permission || {}).groupCreatePermission,
  }
}

export default { mapStateToProps, mapDispathToProps }
