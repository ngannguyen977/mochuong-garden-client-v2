import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'

export const REDUCER = 'template'

const NS = `@@${REDUCER}/`
const api = constant.api.iot
const templateApi = `${api.host}/${api.template}`
const templatePropertyApi = `${api.host}/${api.templateProperty}`
const templateAlertApi = `${api.host}/${api.alertTemplate}`

export const setTemplatePage = createAction(`${NS}SET_TEMPLATE_PAGE`)
export const setTemplateDetailPage = createAction(`${NS}SET_TEMPLATE_DETAIL_PAGE`)
export const createTemplateState = createAction(`${NS}CREATE_TEMPLATE`)
export const updateTemplateState = createAction(`${NS}UPDATE_TEMPLATE`)
export const getTemplatesInGroup = createAction(`${NS}GET_TEMPLATES_GROUP`)
export const getPermission = createAction(`${NS}GET_TEMPLATE_PERMISSION`)
export const currentTab = createAction(`${NS}SET_CURRENT_TAB`)

export const getList = (limit = 18, page = 0, sort = 'name', isAsc = false) => (
  dispatch,
  getState,
) => {
  axios
    .get(templateApi, { params: { limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      let { thingTemplates, page, totalItems } = response.data
      dispatch(setTemplatePage({ templates: thingTemplates, page, totalItems }))
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
      console.log('get one done')
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
    let templateModel = {
      name: model.name,
      description: model.description,
      parentId: (model.parent || {}).id,
      projectId: (model.project || {}).id,
      type: (model.type || {}).id,
      imageId: (model.image || {}).uuid
    }
    axios
      .post(templateApi, templateModel)
      .then(response => {
        //create thing template property
        if (model.properties && model.properties.length > 0) {
          let templateId = response.data.id
          let propertyPromises = model.properties.map(property => {
            let propertyModel = {
              dataType: property.dataType,
              defaultValue: (property.value || '').toString(),
              description: property.description,
              isLogged: property.isLogged,
              isPersistent: property.isPersistent,
              isReadOnly: property.isReadOnly,
              name: property.name,
              thingTemplateID: templateId,
            }
            return axios.post(templatePropertyApi, propertyModel)
          })
          Promise.all(propertyPromises).then(res => {
            const { priorities } = getState().priority
            let alertPromises = res.map(x => {
              let property = model.properties.find(a => a.name === (x.data || {}).name)

              return ((property || {}).alerts || []).map(a => {
                let alertModel = {
                  defaultValue: a.value,
                  description: a.description,
                  name: a.name,
                  priorityID: ((priorities || []).find(x => x.name === a.priority) || {}).id,
                  propertyTemplateID: x.data.id,
                }
                return axios.post(templateAlertApi, alertModel)
              })
            })
            Promise.all(alertPromises).then(x => {
              message.success('Create templace success!')
            })
          })
        }
        let { templates, page, totalItems } = getState().template
        templates.push(response.data)
        dispatch(setTemplatePage({ templates, page, totalItems: totalItems++ }))
        dispatch(createTemplateState({}))
      })
      .catch(error => {
        dispatch(createTemplateState({}))
        let errorMessage = ((error.response || {}).data || {}).message || 'create template fail'
        console.log(error.response.data)
        message.error(errorMessage)
      })
  }
}
export const update = (id, model, isUpdate) => (dispatch, getState) => {
  dispatch(setTemplateDetailPage(model))
  if (isUpdate) {
    axios
      .patch(`${templateApi}/${id}`, {
        description: model.description,
        name: model.name,
        imageId: model.imageId,
      })
      .then(response => {
        let { templates, page, totalItems } = getState().template
        if (templates && Array.isArray(templates) && templates.length > 0) {
          let templateId = templates.findIndex(x => x.id === response.data.id)
          if (templateId) {
            templates[(id = templateId)] = response.data
            dispatch(setTemplatePage({ templates, page, totalItems }))
            notification['success']({
              message: 'Update template information success!',
              description:
                'Templates status are updated. When templates was left their job, you will remove them by delete templates button or just deactive these templates.',
            })
          }
        }
      })
      .catch(error => {
        let errorMessage =
          ((error.response || {}).data || {}).message || 'change status template fail'
        message.error(errorMessage)
      })
  }
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
          templates: templates.filter(x => x.id != ids),
          page,
          totalItems: totalItems--,
        }),
      )
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete template fail'
      message.error(errorMessage)
    })
}
export const setCurrentTab = (id = 0, tab = '1') => (dispatch, getState) => {
  dispatch(currentTab({ id, tab }))
}
const initialState = {
  totalItems: -1,
  page: 0,
  templates: [],
}
const ACTION_HANDLES = {
  [setTemplatePage]: (state, { templates, page, totalItems }) => ({
    ...state,
    templates,
    page,
    totalItems,
  }),
  [createTemplateState]: (state, templateCreate) => ({ ...state, templateCreate }),
  [updateTemplateState]: (state, templateUpdate) => {
    return { ...state, detail: { ...state.detail, templateUpdate } }
  },
  [setTemplateDetailPage]: (state, detail) => ({ ...state, detail }),
  [getPermission]: (state, permissions) => ({ ...state, permissions }),
  [getTemplatesInGroup]: (state, templatesInGroup) => ({ ...state, templatesInGroup }),
  [currentTab]: (state, { id, tab }) => {
    if (!state.tabs) {
      state.tabs = []
    }
    let _tab = state.tabs.find(x => x.id === id)
    if (_tab) {
      _tab.tab = tab
    } else {
      state.tabs.push({ id, tab })
    }
    return state
  },
}
export default createReducer(ACTION_HANDLES, initialState)
