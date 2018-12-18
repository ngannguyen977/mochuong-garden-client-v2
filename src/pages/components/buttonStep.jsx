import React from 'react'
import { Button, Icon } from 'antd'
import { Redirect } from 'react-router'

const ButtonGroup = Button.Group

export const changeStepProgressBar = (current, steps) => {
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

export class ButtonStep extends React.Component {
    constructor() {
        super()
        this.state = {
            redirect: false
        }
    }
    render() {
        const { current, steps, link, changeStepState } = this.props
        const _changeStep = (index) => {
            let _current = index === 0 ? index : current + index
            if (_current >= steps.length) {
                this.setState({ redirect: true })
                _current = 0
            }
            changeStepState(_current)
            changeStepProgressBar(_current, steps)
        }
        if (this.state.redirect) {
            return <Redirect push to={link} />;
        }
        return (<div className='col-md-12 text-right'>
            <ButtonGroup className=''>
                <Button
                    href={`#${link}`}
                    onClick={() => _changeStep(0)}>Cancel
                </Button>
                {current > 0 && current < steps.length - 1 &&
                    (<Button
                        type='default'
                        onClick={() => _changeStep(-1)}>
                        <Icon type='left' /> Previous
                    </Button>)}
                {(current < steps.length) &&
                    (<Button
                        className='text-white'
                        type='primary'
                        onClick={() => _changeStep(1)}
                    // href={current === steps.length ? link : null}
                    >
                        {steps[current].nextTitle}
                        <Icon type='right' />
                    </Button>)}
            </ButtonGroup>
        </div>)
    }
}
export default ButtonStep