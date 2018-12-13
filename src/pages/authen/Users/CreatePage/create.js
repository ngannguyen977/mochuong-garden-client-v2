import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from '../DetailPage/detail'
import PermissionPage from './permission'
import Review from './review'
import ButtonStep from '../../../components/buttonStep'
import StepProgress from '../../../components/stepProgress'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class CreatePage extends React.Component {
  constructor(props) {
    super(props)
    this.changeStepState = this.changeStepState.bind(this)
    this.state = {
      step: {
        current: 0,
      },
      user: {
        username: '',
        password: '',
        confirm: '',
        groups: {},
        permission: {},
      },
    }
  }
  changeStepState(current) {
    this.setState({
      step: {
        current: current,
      },
    })
  }

  render() {
    const { current } = this.state.step
    const { steps } = this.props
    return (
      <div className="user-create">
        <StepProgress steps={steps} current={current} type="USER" />
        <div className="card">
          <div className="card-header">
            <h4 className="text-black mb-3">
              <strong>{steps[current].subTitle}</strong>
            </h4>
          </div>
          <div className="card-body">
            {current === 0 && <DetailPage />}
            {current === 1 && <PermissionPage />}
            {(current === 2 || current === 3) && <Review changeStepState={this.changeStepState} />}
            <ButtonStep
              steps={steps}
              current={current}
              link="/users"
              changeStepState={this.changeStepState}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CreatePage
