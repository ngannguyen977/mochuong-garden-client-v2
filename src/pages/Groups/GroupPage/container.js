import { getData } from '../reducer'

export const mapDispathToProps = {
  getData: (limit, page, sort, isAsc) => getData(limit, page, sort, isAsc),
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
      title: 'Users',
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
