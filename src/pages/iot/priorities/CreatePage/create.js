import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from '../DetailPage/detail'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class CreatePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="priority-create">
        <div className="card">
          <div className="card-header">
            <h4 className="text-black mb-3">
              <strong>Create a new Priority</strong>
            </h4>
          </div>
          <div className="card-body">
            <DetailPage />
          </div>
        </div>
      </div>
    )
  }
}

export default CreatePage
