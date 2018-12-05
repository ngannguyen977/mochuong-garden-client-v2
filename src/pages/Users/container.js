import { getList } from 'reducers/user'

export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
}
export const mapStateToProps = (state, props) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      hidden: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
    },
    {
      title: 'Groups',
      dataIndex: 'userList',
    },
    {
      title: 'Create time',
      dataIndex: 'created_at',
    },
  ]
  return {
    columns: columns,
  }
}

export default { mapStateToProps, mapDispathToProps }
