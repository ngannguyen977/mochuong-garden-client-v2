import { getList, getOne, create, destroy, update } from 'reducers/template'
import { getList as getProjects } from 'reducers/project'
import { getList as getPropertiesByTemplate, update as updateProperty, create as createProperty } from 'reducers/property'
import helper from '../../../helper'

const steps = [
  {
    title: 'Adding Properties ',
    subTitle: 'Add properties for Template',
    icon: 'loading',
    iconDefault: 'solution',
    status: 'process',
    index: 0,
    nextTitle: 'Next: Details',
  },
  {
    title: 'Adding details',
    subTitle: 'Adding Template Information',
    icon: 'solution',
    iconDefault: 'template',
    status: 'wait',
    index: 1,
    nextTitle: 'Next: Review',
  },
  {
    title: 'Review',
    subTitle: 'Review',
    icon: 'menu-unfold',
    iconDefault: 'menu-unfold',
    status: 'wait',
    index: 2,
    nextTitle: 'Create Template',
  },
  {
    title: 'Done',
    subTitle: 'Create Template Complete',
    icon: 'check-circle',
    iconDefault: 'check-circle',
    status: 'wait',
    index: 3,
    nextTitle: 'Go to Templates List',
  },
]

const reviewColumns = [
  {
    title: 'Policy name',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: '10%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: '30%',
  },
]

const summaryColumns = [
  {
    title: 'Templatename',
    dataIndex: 'templatename',
    sorter: true,
    width: '33%',
  },
  {
    title: 'Role',
    dataIndex: 'role.name',
    sorter: true,
    width: '33%',
  },
  {
    title: 'Last Activity',
    dataIndex: 'last_login',
    sorter: true,
    width: '15%',
    render: x => helper.formatDate(new Date(x)),
  },
]
const type = [
  {
    id: 1,
    text: 'generic',
  },
  {
    id: 2,
    text: 'remote',
  },
  {
    id: 3,
    text: 'gateway',
  },
  {
    id: 4,
    text: 'camera',
  },
]
const propertyType = [
  { id: 1, text: 'JSON' },
  { id: 2, text: 'NUMBER' },
  { id: 3, text: 'STRING' },
  { id: 4, text: 'PICTURE' },
  { id: 5, text: 'BOOLEAN' },
]
export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  getProjects: (limit, page, sort, isAsc) => getProjects(limit, page, sort, isAsc),
  create: (model, iscreate) => create(model, iscreate),
  update: (id, model, isUpdate) => update(id, model, isUpdate),
  updateProperty: (id, model) => updateProperty(id, model),
  destroy: ids => destroy(ids),
  getOne: id => getOne(id),
  getPropertiesByTemplate: (type, parentId, limit, page, sort, isAsc) =>
    getPropertiesByTemplate(type, parentId, limit, page, sort, isAsc),
  createProperty: (model) =>
    createProperty(model)
}
export const mapStateToProps = (state, props) => {
  console.log(state.template.detail)
  let template = state.template || {}
  let property = state.property || {}
  let properties = (property.properties || []).map(x => {
    let dataType = (propertyType.find(a => a.id === x.dataType) || {}).text
    return {
      id: x.id,
      name: x.name,
      type: dataType,
      value: x.defaultValue,
      isPersistent: x.isPersistent,
      isReadOnly: x.isReadOnly,
      isLogged: x.isLogged,
    }
  })
  return {
    // master
    template,
    // page
    totalItems: template.totalItems,
    page: template.page,
    data: template.templates || [],
    // detail
    detail: template.detail,
    properties: (template.detail || {}).properties,
    // detail: template.detail,
    templateProperties: properties,
    // model
    steps,
    reviewColumns,
    summaryColumns,
    type,
    createModel: template.templateCreate || {},
    // project
    projects: (state.project || {}).projects || [],
    //configure
    dataTypes: state.app.dataTypes
  }
}

export default { mapStateToProps, mapDispathToProps }
