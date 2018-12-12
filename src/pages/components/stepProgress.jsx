import React from 'react'
import { Icon, Divider, Steps } from 'antd'
const Step = Steps.Step


export class StepProgress extends React.Component {
  render() {
    const { current, steps, type } = this.props
    return (
      <div className='card'>
        <div className='card-header'>
          <div className='card-header'>
            <div className='utils__title'>
              <h3 className='font-weight-bold'>CREATE A NEW {type}</h3>
            </div>
            <Divider orientation='left'>
              <h4>
                Step {steps[current].index + 1}: {steps[current].title}
              </h4>
            </Divider>
          </div>
        </div>
        <div className='card-body'>
          <Steps current={current}>
            {steps.map(item => (
              <Step
                key={item.index}
                title={item.title}
                status={item.status}
                icon={<Icon type={item.icon} />}
              />
            ))}
          </Steps>
        </div>
      </div>
    )
  }
}
export default StepProgress