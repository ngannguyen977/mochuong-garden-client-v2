import { getList, getOne, create, update, destroy } from 'reducers/property'
const type = {
  del: 'del'
}
export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  getOne: id => getOne(id),
  create: (name, description,color,project) => create(name, description,color,project),
  update: (id, name, description) => update(id, name, description),
  destroy: ids => destroy(ids),
}

export const mapStateToProps = (state, props) => {
  let property = state.property || {}
  return {
    // master
    property,
    // page
    totalItems: property.totalItems,
    page: property.page,
    data: property.properties || [],
    // detail
    detail: property.detail,
    // model
    type,
    propertyCreate: property.propertyCreate || {},
    propertyUpdate: (property.detail || {}).propertyUpdate || {},
  }
}

export default { mapStateToProps, mapDispathToProps }
