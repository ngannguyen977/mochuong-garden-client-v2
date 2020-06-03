import { externalAuth } from 'reducers/auth'
export const mapDispatchToProps = {
  externalAuth: (model,link)=>externalAuth(model,link)

}
export const mapStateToProps = (state, props) => {
  return {
  }
}

export default { mapStateToProps, mapDispatchToProps }
