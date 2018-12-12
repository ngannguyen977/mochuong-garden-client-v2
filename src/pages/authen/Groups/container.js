import { getList, changeStatus, create, destroy } from 'reducers/group'
import helper from '../../../helper'

const steps = [{
  title: 'Adding details',
  subTitle: 'Adding Group Information',
  icon: 'loading',
  iconDefault: 'usergroup',
  status: 'process',
  index: 0,
  nextTitle: 'Next: Add Users',
}, {
  title: 'Add users ',
  subTitle: 'Add users to Group',
  icon: 'user',
  iconDefault: 'user',
  status: 'wait',
  index: 1,
  nextTitle: 'Next: Attach Policies',
}, {
  title: 'Attach Policies',
  subTitle: 'Attach Policies for Group',
  icon: 'file-protect',
  iconDefault: 'file-protect',
  status: 'wait',
  index: 2,
  nextTitle: 'Next: Review',
}, {
  title: 'Review',
  subTitle: 'Review create a group',
  icon: 'menu-unfold',
  iconDefault: 'menu-unfold',
  status: 'wait',
  index: 3,
  nextTitle: 'Create Group',
}, {
  title: 'Done',
  subTitle: 'Create Group Complete',
  icon: 'check-circle',
  iconDefault: 'check-circle',
  status: 'wait',
  index: 4,
  nextTitle: 'Go to Groups List',
},];

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
  }
]

const reviewUserColumns = [
  {
    title: 'Username',
    dataIndex: 'username',
    width: '20%',
  },
  {
    title: 'Full Name',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Last Activity',
    dataIndex: 'last_login',
    sorter: true,
    width: '15%',
    render: (x => helper.formatDate(new Date(x)))
  }
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
  }
]
const type = {
  del: 'del',
  changeStatus: 'change-status',
  attachPolicy: 'attach-policy',
  addToGroup: 'add-to-group'
}

export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  changeStatus: (id, status) => changeStatus(id, status),
  create: model => create(model),
  destroy: (ids) => destroy(ids)
}
export const mapStateToProps = (state, props) => {

  return {
    totalItems: state.group.totalItems,
    page: state.group.page,
    data: state.group.groups,
    groupCreate: state.group.groupCreate || {},
    summaryColumns: summaryColumns,
    reviewPermissionColumns:reviewPermissionColumns,
    reviewUserColumns:reviewUserColumns,
    steps: steps,
    type: type
  }
}

export default { mapStateToProps, mapDispathToProps }
