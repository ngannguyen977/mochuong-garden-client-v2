import axios from 'axios'
let config = {
    apiKey: "4d2d57863f5990e25ccaae66270e7323",
    privateKey:"3126c8699f787352"
}
const BASE_URL = 'https://up.flickr.com/services'
const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    headers: {'Content-Type': 'multipart/form-data'}
  });

const upload = (formData)=>new Promise((resolve, reject) =>{
    formData.append('api_key',config.apiKey)
    formData.append('auth_token',config.privateKey)
    formData.append('api_sig','HMAC-SHA1')

    instance.post(`upload`,formData).then(response=>{
        console.log("upload response",response)
        resolve(response)
    }).catch(err=>{
        console.error(err)
    })
})
const getAccessToken = ()=>{
    axios.get(`https://www.flickr.com/services/oauth/request_token
    ?oauth_nonce=89601180
    &oauth_timestamp=1305583298
    &oauth_consumer_key=4d2d57863f5990e25ccaae66270e7323
    &oauth_signature=3126c8699f787352
    &oauth_signature_method=HMAC-SHA1
    &oauth_version=1.0
    &oauth_callback=http%3A%2F%2Flocalhost:3000`)
}
export default {upload}