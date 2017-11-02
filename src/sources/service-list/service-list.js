import Ajax from '../../utils/fetch'
const { SERVICE_LIST, SERVICE_OPERATE} = require('../const');



export function getServiceList(data) {
  let query = [];
  for (let k in data) {
    query.push(`${k}=${data[k]}`)
  }
    return Ajax({
      url:`${SERVICE_LIST}?${query}`,
      type:'json',
      method: 'get'
    });
};

export function OperateServiceRow (data) {
  return Ajax({
    url: `${SERVICE_OPERATE}`,
    data: data,
    method: 'post'
  });
}
