export const convertHexToDec =(macAddress='')=>{
    // 00:5a:ef:b4:08:00
    let hex = macAddress.substring(12,macAddress.length).replace(':','')
    return parseInt(hex,16)
}
export default {convertHexToDec}