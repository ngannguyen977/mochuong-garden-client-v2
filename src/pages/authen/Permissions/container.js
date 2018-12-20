import {
  getList,
  create,
  update,
  destroy,
  getListService,
  getListActionOfService,
  getOne,
  getByUser,
  getByGroup
} from 'reducers/permission'
import { create as createUser } from 'reducers/user'
import { getList as getGroups, create as createGroup } from 'reducers/group'

const steps = [
  {
    title: 'Adding Info',
    subTitle: 'Add some information',
    icon: 'loading',
    iconDefault: 'info',
    status: 'process',
    index: 0,
    nextTitle: 'Next: Services',
  },
  {
    title: 'Select Service',
    subTitle: 'Choose a Service',
    icon: 'customer-service',
    iconDefault: 'customer-service',
    status: 'wait',
    index: 1,
    nextTitle: 'Next: Actions',
  },
  {
    title: 'Select Actions',
    subTitle: 'Select Actions',
    icon: 'coffee',
    iconDefault: 'coffee',
    status: 'wait',
    index: 2,
    nextTitle: 'Next: Resources',
  },
  {
    title: 'Add Resources',
    subTitle: 'Adding resources',
    icon: 'menu-unfold',
    iconDefault: 'menu-unfold',
    status: 'wait',
    index: 3,
    nextTitle: 'Review',
  },
  {
    title: 'Review',
    subTitle: 'Review',
    icon: 'sync',
    iconDefault: 'sync',
    status: 'wait',
    index: 4,
    nextTitle: 'Create Permission',
  },
  {
    title: 'Done',
    subTitle: 'Create Permission Complete',
    icon: 'check-circle',
    iconDefault: 'check-circle',
    status: 'wait',
    index: 5,
    nextTitle: 'Go to Permissions List',
  },
]
const actionColumns = [
  {
    title: 'Action name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
  },
  {
    title: 'type',
    dataIndex: 'type',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Resource name',
    dataIndex: 'resourceType',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width: '40%',
  },
]
const summaryColumns = [
  {
    title: 'Permission name',
    dataIndex: 'name',
    sorter: true,
    width: '33%',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    sorter: true,
    width: '33%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width: '33%',
  },
]
const reviewColumns = [
  {
    title: 'Actions',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: '10%',
  },
  {
    title: 'Resource',
    dataIndex: 'resource',
    width: '30%',
  },
]

const type = {
  del: 'del',
  changeStatus: 'change-status',
  addToGroup: 'add-to-group',
  addToUser: 'add-to-user',
}
export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  getListService: (keyword, keysort, skip, count, orderDescending) =>
    getListService(keyword, keysort, skip, count, orderDescending),
  getListActionOfService: shortName => getListActionOfService(shortName),
  create: (model, isCreate) => create(model, isCreate),
  createGroup: (model, isCreate) => createGroup(model, isCreate),
  destroy: ids => destroy(ids),
  update: (policyId, model, isUpdate) => update(policyId, model, isUpdate),
  getOne: id => getOne(id),
  createUser: (model, isCreate) => createUser(model, isCreate),
  getByUser: (userId) => getByUser(userId),
  getByGroup:(groupIds)=>getByGroup(groupIds)
}
export const mapStateToProps = (state, props) => {
  let permission = state.permission || {}

  return {
    permission: permission,
    totalItems: permission.totalItems,
    page: permission.page,
    data: permission.permissions,
    userCreate: state.user.userCreate || {},
    permissionCreate: permission.permissionCreate || {},
    services: (permission.services || {}).records || [],
    serviceTotal: (permission.services || {}).total || 0,
    actions: permission.actions || [],
    actionTotal: (permission.actions || []).length,
    userPermission: permission.userPermission,
    steps: steps,
    type: type,
    summaryColumns: summaryColumns,
    actionColumns: actionColumns,
    reviewColumns: reviewColumns,
    detail: permission.detail,
    groupCreate: state.group.groupCreate,
    userCreatePermission: permission.userCreatePermission
  }
}

export default { mapStateToProps, mapDispathToProps }
