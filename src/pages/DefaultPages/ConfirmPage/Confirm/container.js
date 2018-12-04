import { REDUCER, submit } from 'reducers/confirm-email'

export const mapDispathToProps = {
  submit: (code) => submit(code),
}
export const mapStateToProps = (state, props) => {
  return {
    isSubmitForm: state.app.submitForms[REDUCER],
  }
}

export default { mapStateToProps, mapDispathToProps }
