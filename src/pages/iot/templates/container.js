import { getList, getOne, changeStatus, create, destroy } from 'reducers/template'
import {
  getList as getPermissions,
  getByGroup as getPermissionByGroup,
  getByTemplate as getPermissionByTemplate,
  changePermissionsForTemplate,
} from 'reducers/permission'
import {
  getList as getGroups,
  create as createGroup,
  changeGroupsForTemplate,
  changeTemplatesForGroup,
} from 'reducers/group'
import helper from '../../../helper'

const steps = [
  {
    title: 'Adding details',
    subTitle: 'Adding Template Information',
    icon: 'loading',
    iconDefault: 'template',
    status: 'process',
    index: 0,
    nextTitle: 'Next: Permission',
  },
  {
    title: 'Set permission',
    subTitle: 'Set Permission for Template',
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
    nextTitle: 'Create Template',
  },
  {
    title: 'Done',
    subTitle: 'Create Template Complete',
    icon: 'check-circle',
    iconDefault: 'check-circle',
    status: 'wait',
    index: 3,
    nextTitle: 'Go to Templates List',
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
  generic: 1,
  remote: 2,
  gateway: 3,
  camera: 4
}
const summaryColumns = [
  {
    title: 'Templatename',
    dataIndex: 'templatename',
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
}
export const mapStateToProps = (state, props) => {
  let template = state.template || {}
  return {
    // master
    template,
    // page
    totalItems: template.totalItems,
    page: template.page,
    data: template.templates || [],
    // detail
    detail: template.detail,
    // model
    steps,
    reviewColumns,
    summaryColumns,
    type,
    // group
    group: state.group,
    groupCreate: state.group.groupCreate || {},
    groups: state.group.groups,
    // permission
    permission: state.permission,
  }
}

export default { mapStateToProps, mapDispathToProps }
