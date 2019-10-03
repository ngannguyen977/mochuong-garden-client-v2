import {
  changePassword
} from "reducers/user"


export const mapDispathToProps = {
  changePassword: (id,model) => changePassword(id,model)
}
export const mapStateToProps = (state, props) => {

  return {

  }
}

export default { mapStateToProps, mapDispathToProps }
