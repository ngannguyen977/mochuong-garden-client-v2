import { getList, changeStatus,createUser } from 'reducers/user'
import { getList as getGroupList }  from 'reducers/group'

changeStepStatus = (current) => {
  for (let step of this.props.steps) {
    if (step.index < current) {
      step.icon = step.iconDefault
      step.status = 'finish'
    } else if (step.index === current) {
      if (step.index !== this.props.steps.length - 1) {
        step.icon = 'loading'
      }
      step.status = 'process'
    } else {
      step.icon = step.iconDefault
      step.status = 'wait'
    }
  }
}

export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  getGroupList: (limit, page, sort, isAsc) => getGroupList(limit, page, sort, isAsc),
  changeStatus: (id, status) => changeStatus(id, status),
  createUser: (model)=> createUser(model),
  changeStepStatus: (current)=> changeStepStatus(current)
}
export const mapStateToProps = (state, props) => {

  const steps = [{
    title: 'Adding details',
    subTitle: 'Adding User Information',
    icon: 'loading',
    iconDefault: 'user',
    status: 'process',
    index: 0,
    nextTitle: 'Next: Permission',
  }, {
    title: 'Set permission',
    subTitle: 'Set Permission for User',
    icon: 'solution',
    iconDefault: 'solution',
    status: 'wait',
    index: 1,
    nextTitle: 'Next: Review',
  }, {
    title: 'Review',
    subTitle: 'Review',
    icon: 'menu-unfold',
    iconDefault: 'menu-unfold',
    status: 'wait',
    index: 2,
    nextTitle: 'Create User',
  }, {
    title: 'Done',
    subTitle: 'Create User Complete',
    icon: 'check-circle',
    iconDefault: 'check-circle',
    status: 'wait',
    index: 3,
    nextTitle: 'Go to Users List',
  },];
  return {
    totalItems: state.user.totalItems,
    page: state.user.page,
    data: state.user.users,
    userCreate: state.user.userCreate || {},
    groups : state.group.groups,
    steps: steps
  }
}

export default { mapStateToProps, mapDispathToProps }
