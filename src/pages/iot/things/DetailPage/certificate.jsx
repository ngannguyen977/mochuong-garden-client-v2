import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import '../../../../resources/style.scss'
import CertificateCard from '../../../components/CertificateCard'
import { Button, message } from 'antd'
import helper from '../../../../helper'

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
        case 'download':
          let cert = certificates.find(x => x.id === id)
          if (cert) {
            let fileNames = [{ name: 'public.key', key: cert.publicKey },
            { name: 'private.key', key: cert.privateKey },
            { name: 'ca.crt', key: cert.ca },
            { name: 'certificate.crt', key: cert.certificate }]
            fileNames.forEach(x => {
              let element = document.createElement("a")
              let file = new Blob([x.key], { type: 'text/plain' })
              element.href = URL.createObjectURL(file)
              element.download = x.name
              element.click()
            })
          }
          break
        default:
          break
      }
    }
    return (
      <div className='certificate'>
        <div className='text-right thing__btn-create'>
          <Button type='primary' onClick={() => generateCertificate(match.params.id)}>
            Generate New Certificate
                </Button>
        </div>
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
            <div className='col-lg-4 text-justify'>
              <p>Thing information include name and password, these field are provide for accession. After this thing is created success, you can give these information for a person, so they can loged in.</p>
              <p>Thing information include name and password, these field are provide for accession. After this thing is created success, you can give these information for a person, so they can loged in.</p>
              <p>Thing information include name and password, these field are provide for accession. After this thing is created success, you can give these information for a person, so they can loged in.</p>
            </div>
          )}
          {(!certificates || certificates.length <= 0) && (
            <div className='col-md-8 empty-certificate'>
              <LockScreenPage name='Certificate' action={() => generateCertificate(match.params.id)} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default CertificatePage
