import { getList, getOne, create, destroy, update, setCurrentTab } from 'reducers/template'
import { getList as getProjects } from 'reducers/project'
import {
  getList as getPropertiesByTemplate,
  update as updateProperty,
  create as createProperty,
} from 'reducers/property'
import helper from '../../../helper'

const steps = [
  {
    title: 'Adding details',
    subTitle: 'Adding Template Information',
    icon: 'loading',
    iconDefault: 'template',
    status: 'process',
    index: 0,
    nextTitle: 'Next: Properties',
  },
  {
    title: 'Adding Properties ',
    subTitle: 'Add properties for Template',
    icon: 'solution',
    iconDefault: 'solution',
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
  createProperty: model => createProperty(model),
  setCurrentTab: (id, tab) => setCurrentTab(id, tab),
}
export const mapStateToProps = (state, props) => {
  let template = state.template || {}
  let properties = (template.detail || {}).properties || []

  //create
  let inheritCreateProperties = (state.property || {}).properties || []
  //edit
  let inheritProperties = properties
    .map(x => {
      if ((x.parent || {}).id && x.parent.id !== (template.detail || {}).id) {
        return x
      }
      return null
    })
    .filter(x => x)
  let customProperties = properties
    .map(x => {
      if ((x.parent || {}).id && x.parent.id === (template.detail || {}).id) {
        return x
      }
      return null
    })
    .filter(x => x)

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
    tabs: template.tabs || [],
    // model
    steps,
    summaryColumns,
    type,
    createModel: template.templateCreate || {},
    customProperties,
    inheritProperties,
    inheritCreateProperties,
    // project
    projects: (state.project || {}).projects || [],
    //configure
    dataTypes: state.app.dataTypes,
  }
}

export default { mapStateToProps, mapDispathToProps }
