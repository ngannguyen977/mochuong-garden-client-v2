import {
  getList,
  create,
  update,
  destroy,
  getListService,
  getListActionOfService,
  getOne,
  getByUser,
  getByGroup,
  changePoliciesForUser,
} from 'reducers/policy'
import { create as createUser } from 'reducers/user'
import { getList as getGroups, create as createGroup } from 'reducers/group'
import { getList as getProjects } from 'reducers/project'

const steps = [
  {
    title: 'Adding Info',
    subTitle: 'Add some information',
    icon: 'loading',
    iconDefault: 'info',
    status: 'process',
    index: 0,
    nextTitle: 'Next: Actions',
  },
  {
    title: 'Select Actions',
    subTitle: 'Select Actions',
    icon: 'coffee',
    iconDefault: 'coffee',
    status: 'wait',
    index: 1,
    nextTitle: 'Next: Resources',
  },
  {
    title: 'Add Resources',
    subTitle: 'Adding resources',
    icon: 'menu-unfold',
    iconDefault: 'menu-unfold',
    status: 'wait',
    index: 2,
    nextTitle: 'Review',
  },
  {
    title: 'Review',
    subTitle: 'Review',
    icon: 'sync',
    iconDefault: 'sync',
    status: 'wait',
    index: 3,
    nextTitle: 'Create Policy',
  },
  {
    title: 'Done',
    subTitle: 'Create Policy Complete',
    icon: 'check-circle',
    iconDefault: 'check-circle',
    status: 'wait',
    index: 4,
    nextTitle: 'Go to Policies List',
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
    title: 'Policy name',
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
  cancel: 'cancel'
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
  getByUser: (userId, groupIds) => getByUser(userId, groupIds),
  getByGroup: groupIds => getByGroup(groupIds),
  changePoliciesForUser: (policyIds, userUuid, isChange) =>
    changePoliciesForUser(policyIds, userUuid, isChange),
  getProjects: (limit, page, sort, isAsc) => getProjects(limit, page, sort, isAsc),
}
export const mapStateToProps = (state, props) => {
  let policy = state.policy || {}
  return {
    // master
    policy,
    // page
    totalItems: policy.totalItems,
    page: policy.page,
    data: policy.policies,
    // detail
    detail: policy.detail,
    // model
    steps,
    type,
    summaryColumns,
    actionColumns,
    reviewColumns,
    policyCreate: policy.policyCreate || {},
    services: (policy.services || {}).records || [],
    serviceTotal: (policy.services || {}).total || 0,
    actions: policy.actions || [],
    actionTotal: (policy.actions || []).length,
    // user
    userCreate: state.user.userCreate || {},
    userPolicies: state.user.policies,
    userDetail: state.user.detail || {},
    userCreatePolicy: policy.userCreatePolicy,
    // group
    groupCreate: state.group.groupCreate,
    groupPolicies: state.group.policies,
    projects: (state.project || {}).projects || [],
    //
    iotActions: state.app.iotActions
  }
}

export default { mapStateToProps, mapDispathToProps }
