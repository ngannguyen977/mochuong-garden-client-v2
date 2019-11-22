import React from 'react'
import { Button, Icon } from 'antd'
import { Redirect } from 'react-router'
import { mapStateToProps, mapDispathToProps } from './container'
import { connect } from 'react-redux'

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
@connect(
    mapStateToProps,
    mapDispathToProps,
)
export class ButtonStep extends React.Component {
    constructor() {
        super()
        this.state = {
            redirect: false,
            disable: false
        }
    }
    componentWillReceiveProps() {
        const { current, page, templateCreate } = this.props
        switch (page) {
            case 'template':
                switch (current) {
                    case 0:
                        break
                    case 1:
                        if (!templateCreate
                            || !templateCreate.properties
                            || templateCreate.properties.length === 0) {
                            this.setState({ disable: true })
                        } else {
                            this.setState({ disable: false })
                        }
                        break
                    case 2:
                        break
                    default:
                        this.setState({ disable: false })
                        break
                }

                break
            default:
                break
        }
    }
    render() {
        const { current, steps, link, changeStepState, rule, page, templateCreate } = this.props
        const { redirect, disable } = this.state

        const _changeStep = (index) => {
            let _current = index === 0 ? index : current + index
            if (_current >= steps.length) {
                this.setState({ redirect: true })
                _current = 0
            }
            changeStepState(_current)
            changeStepProgressBar(_current, steps)
        }
        if (redirect) {
            return <Redirect push to={link} />
        }
        return (<div className='col-md-12 text-right'>
            <ButtonGroup className=''>
                <Button
                    href={`${link}`}
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
                        disabled={disable}
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