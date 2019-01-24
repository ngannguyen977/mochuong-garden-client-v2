import React from 'react'
import './style.scss'
import { stats, commerceStats } from './data.json'
import helper from '../../../helper'
import { Popover, Icon, Popconfirm, message, Table, Button } from 'antd'

class InfoCard extends React.Component {
  static defaultProps = {
    form: 'bordered',
    icon: 'key',
    type: 'secondary', // &--default, &--primary, &--secondary,&--success, &--info, &--warning, &--danger empty
    btnType: 'default',
  }

  render() {
    const { form, icon, type, data, handleActions } = this.props
    const className = `infoCard ${type.length > 0 ? 'infoCard--' + type : ''}`

    return (
      <div className="certificate-card pointer">
        {form === 'bordered' && data && (
          <div key={data.id} className={className + ' infoCard--bordered '}>
            {icon !== false && (
              <span className="infoCard__digit pointer">
                <i className={'icmn-' + icon} />
              </span>
            )}
            <div className="infoCard__desc">
              <span className="infoCard__title">
                {helper.formatDate(new Date(data.created_at))}
              </span>
              <p>{stats.descr}</p>
            </div>
            <div className="certificate-card__btn-control text-right">
              <Icon type="info-circle" onClick={() => handleActions('info', data.id)} />
              <Icon type="download" onClick={() => handleActions('download', data.id)} />
              <Popconfirm
                title="Are you sure delete this certificate? It cannot be undone."
                onConfirm={() => handleActions('del', data.id)}
                onCancel={() => handleActions('cancel')}
                okText="Yes, I confirm"
                cancelText="No, I don't"
              >
                <Icon type="delete" />
              </Popconfirm>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default InfoCard
