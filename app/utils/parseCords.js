/**
 * @param string idStr
 * @return object
 */
const parseCords = str => {
  let tempCords
  if(typeof str === 'string') {
    tempCords = str.split('-')
  }

  return {
    y: parseInt(tempCords[0]),
    x: parseInt(tempCords[1]),
  }
}

export default parseCords
