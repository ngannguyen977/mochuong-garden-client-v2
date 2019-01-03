import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from '../DetailPage/detail'
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
      template: {
        templatename: '',
        password: '',
        confirm: '',
        groups: [],
        permission: {},
      },
    }
  }
  changeStepState(current) {
    const { create, templateCreate } = this.props
    if (current === 3) {
      console.log('creating.....')
      create(templateCreate, true)
    }
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
      <div className='template-create'>
        <StepProgress steps={steps} current={current} type='USER' />
        <div className='card'>
          <div className='card-header'>
            <h4 className='text-black mb-3'>
              <strong>{steps[current].subTitle}</strong>
            </h4>
          </div>
          <div className='card-body'>
            <ButtonStep
              steps={steps}
              current={current}
              link='/templates'
              changeStepState={this.changeStepState}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CreatePage
