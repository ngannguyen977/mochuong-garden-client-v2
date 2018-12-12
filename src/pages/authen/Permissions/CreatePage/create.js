import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import ButtonStep from '../../../components/buttonStep'
import StepProgress from '../../../components/stepProgress'
import DetailPage from '../DetailPage/detail'
import ServicePage from './services'
import ActionPage from './actions'
import ResourcePage from './resources'
import Review from './review';

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
        current: 0
      },
      permission: {
        name: '',
        type: '',
        confirm: '',
        groups: {},
      }
    }
  }
  changeStepState(current) {
    this.setState({
      step: {
        current: current
      }
    })
  }

  render() {
    const { current } = this.state.step
    const { steps } = this.props
    return (
      <div className='permission-create'>
        <StepProgress
          steps={steps}
          current={current}
          type='PERMISSION' />
        <div className='card'>
          <div className='card-header'>
            <h4 className='text-black mb-3'>
              <strong>{steps[current].subTitle}</strong>
            </h4>
          </div>
          <div className='card-body'>
            {this.state.step.current === 0 && (<DetailPage />)}
            {this.state.step.current === 1 && (<ServicePage />)}
            {this.state.step.current === 2 && (<ActionPage />)}
            {this.state.step.current === 3 && (<ResourcePage />)}
            {(this.state.step.current === 4
              || this.state.step.current === 5
            ) && (<Review />)}
            <ButtonStep
              steps={steps}
              current={current}
              link='/permissions'
              changeStepState={this.changeStepState}
            />
          </div>
        </div>

      </div>
    )
  }
}

export default CreatePage
