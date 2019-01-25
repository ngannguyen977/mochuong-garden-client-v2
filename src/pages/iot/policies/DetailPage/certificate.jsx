import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import '../../../../resources/style.scss'
import CertificateCard from '../../../components/CertificateCard'
import { Button, message } from 'antd'
import helper from '../../../../helper'
import ProfileHeadCard from '../../../components/ProfileHeadCard'

@connect(
  mapStateToProps,
  mapDispathToProps,
)
class CertificatePage extends React.Component {
  state = {
    current: 0,
  }
  render() {
    const { certificates, totalItems, removeCertificate, history, generateCertificate, match } = this.props
    const handleActions = (actionType, id) => {
      switch (actionType) {
        case 'del':
          removeCertificate(id)
          break
        case 'info':
          history.push(`/certificates/${id}`)
          break
        case 'cancel':
          message.info('cancel deleted')
          break
        default:
          break
      }
    }
    return (
      <div className='certificate'>
        <div className='row'>
          {certificates &&
            certificates.map(x => (
              <div className='col-md-3 col-sm-6 col-xs-12' key={x.id}>
                <CertificateCard
                  data={x || {}}
                  handleActions={handleActions}
                />
              </div>
            ))}
          {(!certificates || certificates.length <= 0) && (
           <div className='card'>
           <div className='card-header'>
             <div className='utils__title'>
               <strong>Account Information</strong>
             </div>
             <div className='utils__titleDescription'>
               Block with important Account information
             </div>
           </div>
           <div className='card-body'>
             <div className='row'>
               <div className='col-xl-12'>
                 <ProfileHeadCard />
               </div>
             </div>
           </div>
         </div>
          )}
        </div>
      </div>
    )
  }
}

export default CertificatePage
