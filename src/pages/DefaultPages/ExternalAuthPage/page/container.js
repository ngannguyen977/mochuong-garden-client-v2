import { externalAuth } from 'reducers/auth'
export const mapDispathToProps = {
  externalAuth: (model,link)=>externalAuth(model,link)

}
export const mapStateToProps = (state, props) => {
  return {
  }
}

export default { mapStateToProps, mapDispathToProps }
