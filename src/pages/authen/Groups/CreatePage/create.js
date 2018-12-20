import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import { Input, Select, Button, Steps } from 'antd'
import DetailPage from '../DetailPage/detail'
import Review from './review'
import UserSummaryList from './user'
import PermissionSummaryList from './permission'
import ButtonStep from '../../../components/buttonStep'
import StepProgress from '../../../components/stepProgress'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class GroupCreatePage extends React.Component {
  constructor(props) {
    super(props)
    this.changeStepState = this.changeStepState.bind(this)
    this.state = {
      step: {
        current: 0,
      },
      group: {
        name: '',
        groups: {},
        permission: {},
      },
    }
  }

  changeStepState(current) {
    const { create, groupCreate } = this.props
    if (current === 4) {
      console.log('creating.....')
      create(groupCreate, true)
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
      <div className='group-create'>
        <StepProgress steps={steps} current={current} type='GROUP' />
        <div className='card'>
          <div className='card-header'>
            <h4 className='text-black mb-3'>
              <strong>{steps[current].subTitle}</strong>
            </h4>
          </div>
          <div className='card-body'>
            {current === 0 && <DetailPage />}
            {current === 1 && <UserSummaryList />}
            {current === 2 && <PermissionSummaryList />}
            {(current === 3 || current === 4) && <Review changeStepState={this.changeStepState} />}
            <ButtonStep
              steps={steps}
              current={current}
              link='/groups'
              changeStepState={this.changeStepState}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default GroupCreatePage
