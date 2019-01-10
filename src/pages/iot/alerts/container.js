import { create as createProperty } from 'reducers/template'
import { getList as getPriorities } from 'reducers/priority'

export const mapDispathToProps = {
  createProperty: (model, iscreate) => createProperty(model, iscreate),
  getPriorities: (limit, page, sort, isAsc) => getPriorities(limit, page, sort, isAsc)
}
export const mapStateToProps = (state, props) => {
  return {
    createPropertyModel: state.template.templateCreate || {},
    priorities: (state.priority || {}).priorities || []
  }
}

export default { mapStateToProps, mapDispathToProps }
