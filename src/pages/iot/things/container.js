import {
  getList,
  getOne,
  create,
  destroy,
  update,
  setCurrentTab,
  attachThing,
  removeThing,
  registerGateway,
  getUsers,
  getAllUsers,
  getListByGraphQL,
  createThingPolicy,
  removeThingPolicy,
  deleteThingPolicy,
} from "reducers/thing"
import {
  getList as getPropertiesByTemplate,
  update as updateProperty,
  create as createProperty,
} from "reducers/property"
import helper from "../../../helper"

const steps = [
  {
    title: "Adding details",
    subTitle: "Adding Thing Information",
    icon: "loading",
    iconDefault: "thing",
    status: "process",
    index: 0,
    nextTitle: "Next: Properties",
  },
  {
    title: "Adding Properties ",
    subTitle: "Add properties for Thing",
    icon: "solution",
    iconDefault: "solution",
    status: "wait",
    index: 1,
    nextTitle: "Next: Review",
  },
  {
    title: "Review",
    subTitle: "Review",
    icon: "menu-unfold",
    iconDefault: "menu-unfold",
    status: "wait",
    index: 2,
    nextTitle: "Create Thing",
  },
  {
    title: "Done",
    subTitle: "Create Thing Complete",
    icon: "check-circle",
    iconDefault: "check-circle",
    status: "wait",
    index: 3,
    nextTitle: "Go to Things List",
  },
]

const summaryColumns = [
  {
    title: "Thingname",
    dataIndex: "thingname",
    sorter: true,
    width: "33%",
  },
  {
    title: "Role",
    dataIndex: "role.name",
    sorter: true,
    width: "33%",
  },
  {
    title: "Last Activity",
    dataIndex: "last_login",
    sorter: true,
    width: "15%",
    render: x => helper.formatDate(new Date(x)),
  },
]

export const mapDispathToProps = {
  getListByGraphQL: (keyword, limit, page, sort, isAsc, types, templateName, templateType) =>
    getListByGraphQL(keyword, limit, page, sort, isAsc, types, templateName, templateType),
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  create: (model, iscreate) => create(model, iscreate),
  update: (id, model, isUpdate) => update(id, model, isUpdate),
  updateProperty: (id, model) => updateProperty(id, model),
  destroy: ids => destroy(ids),
  getOne: id => getOne(id),
  getPropertiesByTemplate: (type, parentId, limit, page, sort, isAsc) =>
    getPropertiesByTemplate(type, parentId, limit, page, sort, isAsc),
  createProperty: model => createProperty(model),
  setCurrentTab: (id, tab) => setCurrentTab(id, tab),
  attachThing: (parentId, id) => attachThing(parentId, id),
  removeThing: (parentId, id) => removeThing(parentId, id),
  registerGateway: serialNumber => registerGateway(serialNumber),
  getUsers: (thingName, limit, page, sort, isAsc) => getUsers(thingName, limit, page, sort, isAsc),
  getAllUsers: (thingName, limit, page, sort, isAsc) =>
    getAllUsers(thingName, limit, page, sort, isAsc),
  createThingPolicy: (userUuid, thingName, type) => createThingPolicy(userUuid, thingName, type),
  removeThingPolicy: (userUuid, thingName, type) => removeThingPolicy(userUuid, thingName, type),
  deleteThingPolicy: (userUuid, thingName) => deleteThingPolicy(userUuid, thingName),
}
export const mapStateToProps = (state, props) => {
  let thing = state.thing || {}
  let properties = (thing.detail || {}).properties || []

  //create
  let inheritCreateProperties = (state.property || {}).properties || []
  //edit
  let inheritProperties = properties
    .map(x => {
      if (x.template) {
        return {
          ...x,
          name: x.template.name,
          dataType: x.template.dataType,
          defaultValue: x.template.defaultValue,
          isPersistent: x.template.isPersistent,
          isReadOnly: x.template.isReadOnly,
          isLogged: x.template.isLogged,
        }
      }
      return null
    })
    .filter(x => x)
  let customProperties = properties
    .map(x => {
      if (!x.template) {
        return {
          ...x,
          defaultValue: x.value,
        }
      }
      return null
    })
    .filter(x => x)
  return {
    // master
    thing,
    // page
    totalItems: thing.totalItems,
    page: thing.page,
    data: thing.things || [],
    // detail
    detail: thing.detail,
    properties: (thing.detail || {}).properties,
    tabs: thing.tabs || [],
    user: state.user,
    // model
    steps,
    summaryColumns,
    type: state.app.thingTypes,
    createModel: thing.thingCreate || {},
    customProperties,
    inheritProperties,
    inheritCreateProperties,
    // project
    projects: (state.project || {}).projects || [],
    //configure
    dataTypes: state.app.dataTypes,
    certificates: (thing.detail || {}).certificates || [],
    token: state.app.userState.token,
  }
}

export default { mapStateToProps, mapDispathToProps }
