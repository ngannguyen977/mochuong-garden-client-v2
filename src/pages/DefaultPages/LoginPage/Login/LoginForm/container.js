import { REDUCER, submit } from 'ducks/login'

export const mapDispathToProps = {
    submit: (username, password) => submit(username, password)
}
export const mapStateToProps = (state, props) => {
    return {
        isSubmitForm: state.app.submitForms[REDUCER],
    }
}

export default { mapStateToProps, mapDispathToProps }


