
import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { setPermissionPerGroup } from 'reducers/permission'

export const REDUCER = 'template'

const NS = `@@${REDUCER}/`
const api = constant.api.iot
const templateApi = `${api.host}/${api.template}`

export const setTemplatePage = createAction(`${NS}SET_TEMPLATE_PAGE`)
export const setTemplateDetailPage = createAction(`${NS}SET_TEMPLATE_DETAIL_PAGE`)
export const createTemplateState = createAction(`${NS}CREATE_TEMPLATE`)
export const updateTemplateState = createAction(`${NS}UPDATE_TEMPLATE`)
export const getTemplatesInGroup = createAction(`${NS}GET_TEMPLATES_GROUP`)
export const getPermission = createAction(`${NS}GET_TEMPLATE_PERMISSION`)

export const getList = (limit = 10, page = 0, sort = 'name', isAsc = false) => (
  dispatch,
  getState,
) => {
  axios
    .get(templateApi, { params: { limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      let { thingTemplates, page, totalItems } = response.data
      dispatch(setTemplatePage({ templates:thingTemplates, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get template list fail'
      message.error(errorMessage)
    })
}

export const getOne = id => (dispatch, getState) => {
  axios
    .get(`${templateApi}/${id}`)
    .then(response => {
      dispatch(setTemplateDetailPage(response.data))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get template fail'
      message.error(errorMessage)
    })
}
export const create = (model, isCreate = false) => (dispatch, getState) => {
  dispatch(createTemplateState(model))
  if (isCreate) {
    let _model = {
      group_ids: model.groups,
      password: model.password,
      password_confirm: model.confirm,
      templatename: model.templatename,
    }
    axios
      .post(templateApi, _model)
      .then(response => {
        let { templates, page, totalItems } = getState().template
        templates.push(response.data)
        dispatch(setTemplatePage({ templates, page, totalItems: totalItems++ }))
        if (model.permissions && Array.isArray(model.permissions) && model.permissions.length > 0) {
          createTemplatePolicy(response.data.uuid, {
            policyIds: model.permissions.map(x => x.policyId).join(),
          })
            .then(message.success('attach permission success'))
            .catch(error => {
              let errorMessage =
                ((error.response || {}).data || {}).message ||
                `create permission for template ${model.templatename} fail`
              message.error(errorMessage)
            })
        }
        dispatch(createTemplateState({}))
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || 'create template fail'
        message.error(errorMessage)
      })
  }
  dispatch(setPermissionPerGroup(null))
}
export const changeStatus = (id, status) => (dispatch, getState) => {
  axios
    .patch(`${templateApi}/${id}`, { active: status })
    .then(response => {
      let { templates, page, totalItems } = getState().template
      if (templates && Array.isArray(templates) && templates.length > 0) {
        let templateId = templates.findIndex(x => x.id === response.data.id)
        if (templateId) {
          templates[(id = templateId)] = response.data
          dispatch(setTemplatePage({ templates, page, totalItems }))
          notification['success']({
            message: 'Change status of templates success!',
            description:
              'Templates status are updated. When templates was left their job, you will remove them by delete templates button or just deactive these templates.',
          })
        }
      }
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'change status template fail'
      message.error(errorMessage)
    })
}
export const destroy = ids => (dispatch, getState) => {
  axios
    .delete(`${templateApi}?ids=${ids}`)
    .then(response => {
      notification['success']({
        message: 'Delete template success!',
        description:
          'These templates will be delete permanly shortly in 1 month. In that time, if you re-create these template, we will revert information for them.',
      })
      let { templates, page, totalItems } = getState().template
      dispatch(
        setTemplatePage({
          templates: templates.filter(template => !ids.includes(template.id)),
          page,
          totalItems: totalItems - ids.length,
        }),
      )
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete template fail'
      message.error(errorMessage)
    })
}

const initialState = {
  totalItems: -1,
  page: 0,
  templates: [],
}
const ACTION_HANDLES = {
  [setTemplatePage]: (state, { templates, page, totalItems }) => ({ ...state, templates, page, totalItems }),
  [createTemplateState]: (state, templateCreate) => ({ ...state, templateCreate }),
  [updateTemplateState]: (state, templateUpdate) => {
    return { ...state, detail: { ...state.detail, templateUpdate } }
  },
  [setTemplateDetailPage]: (state, detail) => ({ ...state, detail }),
  [getPermission]: (state, permissions) => ({ ...state, permissions }),
  [getTemplatesInGroup]: (state, templatesInGroup) => ({ ...state, templatesInGroup }),
}
export default createReducer(ACTION_HANDLES, initialState)
