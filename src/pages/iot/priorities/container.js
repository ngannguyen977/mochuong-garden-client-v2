import { getList, getOne, create, update, destroy } from 'reducers/priority'
const type = {
  del: 'del',
}
export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  getOne: id => getOne(id),
  create: (name, description, color, project) => create(name, description, color, project),
  update: (id, name, description) => update(id, name, description),
  destroy: ids => destroy(ids),
}

export const mapStateToProps = (state, props) => {
  let priority = state.priority || {}
  return {
    // master
    priority,
    // page
    totalItems: priority.totalItems,
    page: priority.page,
    data: priority.priorities || [],
    // detail
    detail: priority.detail,
    // model
    type,
    priorityCreate: priority.priorityCreate || {},
    priorityUpdate: (priority.detail || {}).priorityUpdate || {},
  }
}

export default { mapStateToProps, mapDispathToProps }
