import Ajax from '../../utils/fetch'
const { LOGIN, LOGIN_CHECK } = require('../const');

export function Login (data) {

  return Ajax({
    url: LOGIN,
    data: data,
    method: 'post',
    type: 'json'
  });
}

export function LoginCheck (toke) {
  return Ajax({
    url: LOGIN_CHECK + `?token=${toke}`,
    method: 'get',
    type: 'json'
  });
}

