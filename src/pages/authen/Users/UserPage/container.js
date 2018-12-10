import { getList, changeStatus } from 'reducers/user'


export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  changeStatus: (id, status) => changeStatus(id, status),
}
export const mapStateToProps = (state, props) => {
  return {
    totalItems: state.user.totalItems,
    page: state.user.page,
    data: state.user.users
  }
}

export default { mapStateToProps, mapDispathToProps }
