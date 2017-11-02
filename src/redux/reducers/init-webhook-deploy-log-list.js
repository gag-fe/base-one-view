import * as actionTypes from '../constants/webhook-log-state'
let initialState = {
  list:[]
}
export default function INIT_WEBHOOK_DEPLOY_LOG_LIST(state = initialState, action) {
  switch (action.type){
    case actionTypes.LIST: // 初始化list
      return {
        list:action.list
      };
    case actionTypes.QUERY:
      return action.list;
    default:
      return state;
  }
}
