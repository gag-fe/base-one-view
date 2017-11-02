import Cookies from 'js-cookie';
import { hashHistory } from 'react-router';
import {UPDATE_LOGIN, LOGIN_CHECK, OUTPUT_LOGIN , LOGIN} from '../../redux/constants/login'
import { Login, LoginCheck } from '../../sources/login/login'
import { USERINFO } from '../../utils/const'
import underscore from 'underscore'
//登录
export function logingIn (data,props){
  return (dispatch) => {
    const result = Login(data);
    let userInfo ;
    result.then((res) => {
      if (res.status === 'S') {
        userInfo = res.data;
        let setState  = {
          userInfo: res.data,
          singIn: true,
          type: LOGIN
        };
        if (data.remember) {
          Cookies.set(USERINFO, res.data, {expires: 7});
        } else {
          Cookies.set(USERINFO, {});
        }
        dispatch(setState);
        console.log(props);
        props.InitServiceList({
          user_id: userInfo.id
        });
        props.InitWebhookLogList({
          user_id:userInfo.id
        });
        props.InitWebhookList({
          user_id: userInfo.id
        });
        hashHistory.push('/');
      }
    });
  }
};



// 检查taken是否有效
export function loginCheck (props) {
  return (dispatch, getState) => {
    let userInfo = Cookies.get(USERINFO);
    if (!userInfo) {
      hashHistory.push('login');
      return;
    }
    userInfo = JSON.parse(userInfo);
    if (underscore.isEmpty(userInfo)) {
      hashHistory.push('login');
      return;
    }
    dispatch({
      type: LOGIN_CHECK,
      userInfo:userInfo,
      singIn: true
    });
    props.InitServiceList({
      user_id: userInfo.id || userInfo.user_id
    });
    props.InitWebhookLogList({
      user_id: userInfo.id || userInfo.user_id
    });
    props.InitWebhookList({
      user_id: userInfo.id || userInfo.user_id
    });
  }
};

export function loginOut(props) { // 退出登录
  return (dispatch) => {
    dispatch({
      type: OUTPUT_LOGIN
    });
    props.initServiceData();
    props.initalWebhookLog();
    props.initalWebhookList()
  }
}


