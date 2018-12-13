import { getList, create, destroy } from 'reducers/permission'
import helper from '../../../helper'

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
const type = {
  del: 'del',
  changeStatus: 'change-status',
  attachPolicy: 'attach-policy',
  addToGroup: 'add-to-group',
}
export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  create: model => create(model),
  destroy: ids => destroy(ids),
}
export const mapStateToProps = (state, props) => {
  return {
    totalItems: state.permission.totalItems,
    page: state.permission.page,
    data: state.permission.permissions,
    permissionCreate: state.permission.permissionCreate || {},
    summaryColumns: summaryColumns,
    steps: steps,
    type: type,
  }
}

export default { mapStateToProps, mapDispathToProps }
