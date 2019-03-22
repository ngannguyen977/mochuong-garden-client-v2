import { getList, getOne, changeStatus, create, destroy, getUsersByGroup } from 'reducers/user'
import {
  getList as getPermissions,
  getByGroup as getPermissionByGroup,
  getByUser as getPermissionByUser,
  changePermissionsForUser,
} from 'reducers/permission'
import {
  getList as getGroups,
  create as createGroup,
  changeGroupsForUser,
  changeUsersForGroup,
} from 'reducers/group'
import { getList as getThings ,getListByGraphQL } from 'reducers/thing'
import helper from '../../../helper'
import { gunzip } from 'zlib'
import { buffer } from '../../../../node_modules/rxjs/operator/buffer'

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

const type = {
  del: 'DELETE',
  changeStatus: 'CHANGE_STATUS',
  assignThing: 'ASSIGN_THING',
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
  getListByGraphQL: (keyword, limit, page, sort, isAsc, types, templateName, templateType) =>
  getListByGraphQL(keyword, limit, page, sort, isAsc, types, templateName, templateType),
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  getThings: (limit, page, sort, isAsc) => getThings(limit, page, sort, isAsc),
  changeStatus: (userName, status) => changeStatus(userName, status),
  create: (model, iscreate) => create(model, iscreate),
  // update: (model, iscreate) => update(model, iscreate),
  createGroup: (model, iscreate) => createGroup(model, iscreate),
  destroy: userNames => destroy(userNames),
  getOne: userName => getOne(userName),
  getPermissions: () => getPermissions(),
  getGroups: () => getGroups(),
  getPermissionByGroup: userNames => getPermissionByGroup(userNames),
  getUsersByGroup: groupName => getUsersByGroup(groupName),
  getPermissionByUser: userName => getPermissionByUser(userName),
  changeGroupsForUser: (groupNames, userName, isChange) =>
    changeGroupsForUser(groupNames, userName, isChange),
  changeUsersForGroup: (groupName, userNames, isChange) =>
    changeUsersForGroup(groupName, userNames, isChange),
  changePermissionsForUser: (permissionIds, userUuid, isChange) =>
    changePermissionsForUser(permissionIds, userUuid, isChange),
}
export const mapStateToProps = (state, props) => {
  let user = state.user || {}
  return {
    // master
    user,
    // page
    totalItems: user.totalItems,
    page: user.page,
    data: user.users || [],
    // detail
    detail: user.detail,
    // model
    steps,
    summaryColumns,
    type,
    usersInGroup: (state.user.usersInGroup || {}).users || [],
    userCreatePermission: (state.group || {}).permissions || [],
    userCreate: user.userCreate || {},
    userUpdate: (user.detail || {}).userUpdate || {},
    // group
    group: state.group,
    groupCreate: state.group.groupCreate || {},
    groups: state.group.groups,
    // permission
    permission: state.permission,
    // thing
    thing: state.thing,
  }
}

export default { mapStateToProps, mapDispathToProps }
