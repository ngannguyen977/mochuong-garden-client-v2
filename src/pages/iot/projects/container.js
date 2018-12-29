import { getList, getOne } from 'reducers/project'
export const mapDispathToProps = {
    getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
    getOne: (id)=>getOne(id)
}
export const mapStateToProps = (state, props) => {
    let project = state.project || {}
    console.log( project.projects)
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
      projectUpdate: (project.detail || {}).projectUpdate || {}
    }
}

export default { mapStateToProps, mapDispathToProps }
