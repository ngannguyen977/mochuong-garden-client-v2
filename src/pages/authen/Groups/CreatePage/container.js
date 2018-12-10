import { getList, changeStatus,createGroup } from 'reducers/group'
import { getList as getUserList }  from 'reducers/user'


export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  getUserList: (limit, page, sort, isAsc) => getUserList(limit, page, sort, isAsc),
  changeStatus: (id, status) => changeStatus(id, status),
  createGroup: (model)=> createGroup(model)
}
export const mapStateToProps = (state, props) => {

  return {
    totalItems: state.group.totalItems,
    page: state.group.page,
    data: state.group.groups,
    groupCreate: state.group.groupCreate || {},
    groups : state.group.groups
  }
}

export default { mapStateToProps, mapDispathToProps }
