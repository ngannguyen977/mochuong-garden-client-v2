import { getList, changeStatus } from 'reducers/group'


export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  changeStatus: (id, status) => changeStatus(id, status),
}
export const mapStateToProps = (state, props) => {

  return {
    totalItems: state.group.totalItems,
    page: state.group.page,
    data: state.group.groups
  }
}

export default { mapStateToProps, mapDispathToProps }
