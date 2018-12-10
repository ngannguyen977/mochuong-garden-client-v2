import React from 'react'
import { mapStateToProps, mapDispathToProps } from './container'
import { connect } from 'react-redux'
import {  Button,  Icon, Steps, Divider } from 'antd'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Review from './review';
const Step = Steps.Step;
const ButtonGroup = Button.Group;


const steps = [{
  title: 'Adding details',
  subTitle: 'Adding Group Information',
  icon: 'loading',
  iconDefault: 'usergroup',
  status: 'process',
  index: 0,
  nextTitle: 'Next: Add Users',
}, {
  title: 'Add users ',
  subTitle: 'Add users to Group',
  icon: 'user',
  iconDefault: 'user',
  status: 'wait',
  index: 1,
  nextTitle: 'Next: Attach Policies',
}, {
  title: 'Attach Policies',
  subTitle: 'Attach Policies for Group',
  icon: 'file-protect',
  iconDefault: 'file-protect',
  status: 'wait',
  index: 2,
  nextTitle: 'Next: Review',
}, {
  title: 'Review',
  subTitle: 'Review create a group',
  icon: 'menu-unfold',
  iconDefault: 'menu-unfold',
  status: 'wait',
  index: 3,
  nextTitle: 'Create Group',
},{
  title: 'Done',
  subTitle: 'Create Group Complete',
  icon: 'check-circle',
  iconDefault: 'check-circle',
  status: 'wait',
  index: 4,
  nextTitle: 'Go to Groups List',
},];

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class GroupCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: {
        current: 0
      },
      group: {
        groupname: '',
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
      this.setState({ link: '#/groups' })
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
    return (
      <div className='group-create'>
        <div className='card'>
          <div className='card-header'>
            <div className='card-header'>
              <div className='utils__title'>
                <h3 className='font-weight-bold'>CREATE A NEW GROUP</h3>
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
            {this.state.step.current === 0 && (<Step1
              groupCreate={this.props.groupCreate}
              createGroup={this.props.createGroup} />)}
            {this.state.step.current === 1 && (<Step2
              groupCreate={this.props.groupCreate}
              createGroup={this.props.createGroup}
              getGroupList={this.props.getGroupList} />)}
              {this.state.step.current === 2 && (<Step3 />)}
            {(this.state.step.current === 3
              || this.state.step.current === 4
            ) && (<Review />)}
            <div className='col-md-12 text-right'>
              <ButtonGroup className=''>
                <Button href='#/groups'>Cancel</Button>
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

export default GroupCreatePage
