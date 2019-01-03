import { getList, getOne, create, update,remove } from 'reducers/project'

export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  getOne: id => getOne(id),
  create: (name, description) => create(name, description),
  update: (id, name, description) => update(id, name, description),
  remove: ids => remove(ids),
}
export const mapStateToProps = (state, props) => {
  let project = state.project || {}
  return {
    // master
    project,
    // page
    totalItems: project.totalItems,
    page: project.page,
    data: project.projects || [],
    // detail
    detail: project.detail,
    // model
    projectCreate: project.projectCreate || {},
    projectUpdate: (project.detail || {}).projectUpdate || {},
  }
}

export default { mapStateToProps, mapDispathToProps }
