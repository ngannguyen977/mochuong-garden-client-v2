import { getList, getOne, create, update, destroy } from 'reducers/certificate'
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
  let certificate = state.certificate || {}
  return {
    // master
    certificate,
    // page
    totalItems: certificate.totalItems,
    page: certificate.page,
    data: certificate.certificates || [],
    // detail
    detail: certificate.detail,
    // model
    type,
    certificateCreate: certificate.certificateCreate || {},
    certificateUpdate: (certificate.detail || {}).certificateUpdate || {},
  }
}

export default { mapStateToProps, mapDispathToProps }
