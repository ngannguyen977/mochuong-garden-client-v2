import React from 'react'
import { mapStateToProps, mapDispathToProps } from './container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Input, TreeSelect, Select, Button, Upload, Icon, message, Steps, Divider } from 'antd'
import Step1 from './step1'
import Step2 from './step2'
import Review from './review';
import { push } from 'react-router-redux'
const { TextArea } = Input
const Option = Select.Option
const Step = Steps.Step;
const ButtonGroup = Button.Group;



@connect(
  mapStateToProps,
  mapDispathToProps,
)
class UserCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: {
        current: 0
      },
      user: {
        username: '',
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
      this.props.changeStepStatus(current)
      this.setState({
        step: {
          current: current
        }
      })
    } else {
      // TODO: create user

      this.setState({ link: '#/users' })
    }
  }


  render() {
    const { current } = this.state.step

    return (
      <div className='user-create'>
        <div className='card'>
          <div className='card-header'>
            <div className='card-header'>
              <div className='utils__title'>
                <h3 className='font-weight-bold'>CREATE A NEW USER</h3>
              </div>
              <Divider orientation='left'><h4>Step {this.props.steps[current].index + 1}: {this.props.steps[current].title}</h4></Divider>
            </div>

          </div>
          <div className='card-body'>
            <Steps current={current}>
              {this.props.steps.map(item => <Step key={item.title} title={item.title} status={item.status} icon={<Icon type={item.icon} />} />)}
            </Steps>
          </div>
        </div>
        <div className='card'>
          <div className='card-header'>
            <h4 className='text-black mb-3'>
              <strong>{this.props.steps[current].subTitle}</strong>
            </h4>
          </div>
          <div className='card-body'>
            {this.state.step.current === 0 && (<Step1/>)}
            {this.state.step.current === 1 && (<Step2 />)}
            {(this.state.step.current === 2 || this.state.step.current === 3) && (<Review />)}
            <div className='col-md-12 text-right'>
              <ButtonGroup className=''>
                <Button href='#/users'>Cancel</Button>
                {(current > 0 && current < this.props.steps.length - 1) && (<Button
                  type='default'
                  onClick={() => this.changeStep(-1)}
                >
                  <Icon type='left' /> Previous
                </Button>)}
                {(current < this.props.steps.length) && (<Button className='text-white'
                  type='primary'
                  onClick={() => this.changeStep(1)}
                  href={this.state.link}
                >
                  {this.props.steps[current].nextTitle}<Icon type='right' />
                </Button>)}
              </ButtonGroup>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default UserCreatePage
