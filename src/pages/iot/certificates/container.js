import { getList, getOne, create, update, destroy, setCurrentTab, attachThing, removeThing, attachPolicy, removePolicy } from 'reducers/certificate'
import { getList as getThings } from 'reducers/thing'
import { getList as getPolicies } from 'reducers/policy'
const type = {
  del: 'del',
}
export const mapDispathToProps = {
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  getThings: (limit, page, sort, isAsc) => getThings(limit, page, sort, isAsc),
  getPolicies: (limit, page, sort, isAsc) => getPolicies(limit, page, sort, isAsc),
  getOne: id => getOne(id),
  create: (name, description, color, project) => create(name, description, color, project),
  update: (id, name, description) => update(id, name, description),
  destroy: ids => destroy(ids),
  setCurrentTab: (id, tab) => setCurrentTab(id, tab),
  attachThing: (id, thingId) => attachThing(id, thingId),
  removeThing: (id, thingId) => removeThing(id, thingId),
  attachPolicy: (id, policyIds) => attachPolicy(id, policyIds),
  removePolicy: (id, policyIds) => removePolicy(id, policyIds),
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
    tabs: certificate.tabs || [],
    thing: state.thing,
    policy: state.policy,
    // model
    type,
    certificateCreate: certificate.certificateCreate || {},
    certificateUpdate: (certificate.detail || {}).certificateUpdate || {},
  }
}

export default { mapStateToProps, mapDispathToProps }
