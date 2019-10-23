import { REDUCER, submit } from 'reducers/confirm-email'
import { restrictAccessConfirmPage } from 'reducers/forgot'

export const mapDispathToProps = {
  submit: code => submit(code),
  restrictAccessConfirmPage: isAccessible => restrictAccessConfirmPage(isAccessible)

}
export const mapStateToProps = (state, props) => {
  return {
    isSubmitForm: state.app.submitForms[REDUCER],
    isAccessible: state.app.isAccessible
  }
}

export default { mapStateToProps, mapDispathToProps }
