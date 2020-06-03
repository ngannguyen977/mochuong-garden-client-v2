import { REDUCER, submit } from 'reducers/login'

export const mapDispatchToProps = {
  submit: (username, password) => submit(username, password),
}
export const mapStateToProps = (state, props) => {
  return {
    isSubmitForm: state.app.submitForms[REDUCER],
  }
}

export default { mapStateToProps, mapDispatchToProps }
