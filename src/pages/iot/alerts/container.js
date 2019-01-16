import { create as createProperty } from 'reducers/template'
import { getList as getPriorities } from 'reducers/priority'
import { createAlerts, getList, remove } from 'reducers/alert'

export const mapDispathToProps = {
  createProperty: (model, iscreate) => createProperty(model, iscreate),
  getPriorities: (limit, page, sort, isAsc) => getPriorities(limit, page, sort, isAsc),
  createAlerts: (propertyId, alerts) => createAlerts(propertyId, alerts),
  getList: (type, parentid, templateid, limit, page, sort, isAsc) =>
    getList(type, parentid, templateid, limit, page, sort, isAsc),
  remove: id => remove(id),
}
export const mapStateToProps = (state, props) => {
  return {
    createPropertyModel: state.template.templateCreate || {},
    createThingPropertyModel: state.thing.thingCreate || {},
    priorities: (state.app.priority || {}).priorities || [],
    properties: (state.template.detail || {}).properties || [],
  }
}

export default { mapStateToProps, mapDispathToProps }
