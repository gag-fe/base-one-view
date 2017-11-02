import * as actionTypes from '../constants/webhook-list-state'
const initialstate = {
  list: [],
  operateRow: {}
};

export default function INIT_WEBHOOK_PROJECT_LIST(state = initialstate, action) {
  switch (action.type){
    case actionTypes.INIT: // 初始化列表
      return Object.assign({}, state, {
        list: action.list,
        operateRow: {}
      });
    case actionTypes.OPERATE: // 操作一条数据
      return Object.assign({}, state, action);
    default:
      return state;
  }
}
