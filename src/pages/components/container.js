
export const mapDispathToProps = {
}
export const mapStateToProps = (state, props) => {
  return {
    templateCreate: state.template.templateCreate || {},
  }
}

export default { mapStateToProps, mapDispathToProps }
