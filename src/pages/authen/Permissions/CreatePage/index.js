import React from 'react'
import { mapStateToProps, mapDispathToProps } from './container'
import { connect } from 'react-redux'
import { Input,  Select, Button, Icon, Steps, Divider } from 'antd'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Review from './review';

const Step = Steps.Step;
const ButtonGroup = Button.Group;


const steps = [{
  title: 'Select Service',
  subTitle: 'Choose a Service',
  icon: 'loading',
  iconDefault: 'customer-service',
  status: 'process',
  index: 0,
  nextTitle: 'Next: Actions',
}, {
  title: 'Select Actions',
  subTitle: 'Select Actions',
  icon: 'coffee',
  iconDefault: 'coffee',
  status: 'wait',
  index: 1,
  nextTitle: 'Next: Resources',
}, {
  title: 'Add Resources',
  subTitle: 'Adding resources',
  icon: 'menu-unfold',
  iconDefault: 'menu-unfold',
  status: 'wait',
  index: 2,
  nextTitle: 'Review',
}, {
  title: 'Review',
  subTitle: 'Review',
  icon: 'sync',
  iconDefault: 'sync',
  status: 'wait',
  index: 3,
  nextTitle: 'Create Permission',
}, {
  title: 'Done',
  subTitle: 'Create Permission Complete',
  icon: 'check-circle',
  iconDefault: 'check-circle',
  status: 'wait',
  index: 4,
  nextTitle: 'Go to Permissions List',
},];

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class PermissionCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: {
        current: 0
      },
      permission: {
        permissionname: '',
        password: '',
        confirm: '',
        groups: {},
        permission: {}
      },
      link: null
    };
  }

  changeStep(index) {
    const current = this.state.step.current + index;
    console.log('current', current)
    if (current < steps.length) {
      this.changeStatus(current)
      this.setState({
        step: {
          current: current
        }
      })
    } else {
      // TODO: create permission

      this.setState({ link: '#/permissions' })
    }
  }
  changeStatus = (current) => {
    for (let step of steps) {
      if (step.index < current) {
        step.icon = step.iconDefault
        step.status = 'finish'
      } else if (step.index === current) {
        if (step.index !== steps.length - 1) {
          step.icon = 'loading'
        }
        step.status = 'process'
      } else {
        step.icon = step.iconDefault
        step.status = 'wait'
      }
    }
  }

  render() {
    const { current } = this.state.step;
    console.log(current)
    return (
      <div className='permission-create'>
        <div className='card'>
          <div className='card-header'>
            <div className='card-header'>
              <div className='utils__title'>
                <h3 className='font-weight-bold'>CREATE A NEW PERMISSION</h3>
              </div>
              <Divider orientation='left'><h4>Step {steps[current].index + 1}: {steps[current].title}</h4></Divider>
            </div>

          </div>
          <div className='card-body'>
            <Steps current={current}>
              {steps.map(item => <Step key={item.title} title={item.title} status={item.status} icon={<Icon type={item.icon} />} />)}
            </Steps>
          </div>
        </div>
        <div className='card'>
          <div className='card-header'>
            <h4 className='text-black mb-3'>
              <strong>{steps[current].subTitle}</strong>
            </h4>
          </div>
          <div className='card-body'>
            {this.state.step.current === 0 && (<Step1 />)}
            {this.state.step.current === 1 && (<Step2 />)}
            {this.state.step.current === 2 && (<Step3 />)}
            {(this.state.step.current === 3
              || this.state.step.current === 4
            ) && (<Review />)}
            <div className='col-md-12 text-right'>
              <ButtonGroup className=''>
                <Button href='#/permissions'>Cancel</Button>
                {(current > 0 && current < steps.length - 1) && (<Button
                  type='default'
                  onClick={() => this.changeStep(-1)}
                >
                  <Icon type='left' /> Previous
                </Button>)}
                {(current < steps.length) && (<Button className='text-white'
                  type='primary'
                  onClick={() => this.changeStep(1)}
                  href={this.state.link}
                >
                  {steps[current].nextTitle}<Icon type='right' />
                </Button>)}
              </ButtonGroup>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default PermissionCreatePage
