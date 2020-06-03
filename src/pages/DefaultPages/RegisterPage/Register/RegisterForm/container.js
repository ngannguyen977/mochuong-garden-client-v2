import { REDUCER, submit } from 'reducers/register'

export const mapDispatchToProps = {
  submit: model => submit(model),
}
export const mapStateToProps = (state, props) => {
  return {
    isSubmitForm: state.app.submitForms[REDUCER],
  }
}

export default { mapStateToProps, mapDispatchToProps }
