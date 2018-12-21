import React from 'react'
import { Carousel } from 'antd'
import './style.scss'

class SliderCard extends React.Component {
  static defaultProps = {
    inverse: false,
  }

  render() {
    const { inverse, data } = this.props
    return (
      <div className={`sliderCard ${inverse ? 'sliderCard--inverse' : ''}`}>
        <Carousel autoplay>
          {(data || []).map(x => (
            <div className={'sliderCard__item ' + x.level} key={x.name}>
              <a href='javascript: void(0);' className='sliderCard__body'>
                <div className='sliderCard__icon'>
                  <i className={x.icon} />
                </div>
                <h2>{x.name}</h2>
                {(x.status || []).map(a => (
                  <h6 className='text-child' key={a}>{a}</h6>
                ))}
              </a>
            </div>
          ))}
        </Carousel>
      </div>
    )
  }
}

export default SliderCard
