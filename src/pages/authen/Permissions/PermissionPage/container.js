import { getList, changeStatus } from 'reducers/permission'


export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  changeStatus: (id, status) => changeStatus(id, status),
}
export const mapStateToProps = (state, props) => {

  return {
    totalItems: state.permission.totalItems,
    page: state.permission.page,
    data: state.permission.permissions
  }
}

export default { mapStateToProps, mapDispathToProps }
