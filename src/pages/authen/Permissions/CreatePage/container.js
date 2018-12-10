import { getList, changeStatus,createPermission } from 'reducers/permission'
import { getList as getGroupList }  from 'reducers/group'


export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  getGroupList: (limit, page, sort, isAsc) => getGroupList(limit, page, sort, isAsc),
  changeStatus: (id, status) => changeStatus(id, status),
  createPermission: (model)=> createPermission(model)
}
export const mapStateToProps = (state, props) => {

  return {
    totalItems: state.permission.totalItems,
    page: state.permission.page,
    data: state.permission.permissions,
    permissionCreate: state.permission.permissionCreate || {},
    groups : state.group.groups
  }
}

export default { mapStateToProps, mapDispathToProps }
