import * as actionTypes from '../constants/login'
var initState = {
  singIn: false,
  userInfo:{

  }
};

function Login(state = initState, action){
  if(action.type){
    switch(action.type){
      case actionTypes.LOGIN: // 登录
        return Object.assign({}, state, {
          singIn: true,
          userInfo: action.userInfo
        });
      case actionTypes.LOGIN_CHECK: // 检查登录
        return Object.assign({}, state, {
          singIn: true,
          userInfo: action.userInfo
        });
      case actionTypes.OUTPUT_LOGIN: // 退出登录
        return state;
      default:
        return state;
    }
  }
}

export default Login
