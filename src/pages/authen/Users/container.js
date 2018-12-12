import { getList, changeStatus, create, destroy } from 'reducers/user'

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
    title: 'Groups',
    dataIndex: 'groups',
    width: '20%',
    render: tags => tags.map(tag => tag.name + ', ')
    ,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: '30%',
  }
]

const type = {
  del: 'del',
  changeStatus: 'change-status',
  attachPolicy: 'attach-policy',
  addToGroup: 'add-to-group'
}
const summaryColumns = [
  {
    title: 'Username',
    dataIndex: 'name',
    sorter: true,
    width: '33%',
  },
  {
    title: 'Full Name',
    dataIndex: 'policies',
    sorter: true,
    width: '33%',
  },
  {
    title: 'Last Activity',
    dataIndex: 'last_login',
    sorter: true,
    width: '33%',
  }
]

export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  changeStatus: (id, status) => changeStatus(id, status),
  create: model => create(model),
  destroy: (ids) => destroy(ids)
}
export const mapStateToProps = (state, props) => {
  return {
    totalItems: state.user.totalItems,
    page: state.user.page,
    data: state.user.users,
    userCreate: state.user.userCreate || {},
    groups: state.group.groups,
    steps: steps,
    reviewColumns: reviewColumns,
    summaryColumns:summaryColumns,
    type: type
  }
}

export default { mapStateToProps, mapDispathToProps }
