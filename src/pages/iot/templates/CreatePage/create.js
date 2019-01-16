import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from '../DetailPage/detail'
import ButtonStep from '../../../components/buttonStep'
import StepProgress from '../../../components/stepProgress'
import Property from './property'
import Review from './review'
import queryString from 'query-string'

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
    }
  }
  componentWillMount() {
    const { getProjects, getList } = this.props
    getProjects(100)
    getList(20)
    const { step } = queryString.parse(this.props.location.search)
    if (step) {
      this.setState({
        step: {
          current: +step,
        },
      })
    }
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
    const { steps, createModel, history, match } = this.props
    console.log('current', current)
    return (
      <div className="template-create">
        <StepProgress steps={steps} current={current} type="TEMPLATE" />
        <div className="card">
          <div className="card-header">
            <h4 className="text-black mb-3">
              <strong>{steps[current].subTitle}</strong>
            </h4>
          </div>
          <div className="card-body">
            {current === 0 && <DetailPage />}
            {current === 1 && <Property history={history} match={match} />}
            {(current === 2 || current === 3) && <Review />}
            <ButtonStep
              steps={steps}
              current={current}
              link="/templates"
              changeStepState={this.changeStepState}
              page="template"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CreatePage
