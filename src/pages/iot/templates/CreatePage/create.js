import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from '../DetailPage/detail'
import ButtonStep from '../../../components/buttonStep'
import StepProgress from '../../../components/stepProgress'
import Property from '../DetailPage/property'
import Review from './review'
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
  componentWillMount() {
    const { getProjects, getList } = this.props
    getProjects(100)
    getList(20)
  }
  changeStepState(current) {
    const { create, createModel } = this.props
    if (current === 3) {
      console.log('creating.....')
      create(createModel, true)
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
        <StepProgress steps={steps} current={current} type='TEMPLATE' />
        <div className='card'>
          <div className='card-header'>
            <h4 className='text-black mb-3'>
              <strong>{steps[current].subTitle}</strong>
            </h4>
          </div>
          <div className='card-body'>
            {current === 0 && <Property history={this.props.history} match={this.props.match} />}
            {current === 1 && <DetailPage />}
            {(current === 2 || current === 3) && <Review />}
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
