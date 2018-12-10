import { getList, changeStatus,createUser } from 'reducers/user'
import { getList as getGroupList }  from 'reducers/group'


export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  getGroupList: (limit, page, sort, isAsc) => getGroupList(limit, page, sort, isAsc),
  changeStatus: (id, status) => changeStatus(id, status),
  createUser: (model)=> createUser(model)
}
export const mapStateToProps = (state, props) => {

  return {
    totalItems: state.user.totalItems,
    page: state.user.page,
    data: state.user.users,
    userCreate: state.user.userCreate || {},
    groups : state.group.groups
  }
}

export default { mapStateToProps, mapDispathToProps }
