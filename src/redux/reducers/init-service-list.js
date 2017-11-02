import * as actionTypes from '../constants/service-list-state'

const initialSate = {
  list: [],
  operateRow: {}
};


export default function INIT_SERVICE_LIST(state = initialSate, action) {
  switch (action.type){
    case actionTypes.LIST:
      return Object.assign({}, state, {
        list: action.list,
        operateRow: {}
      });
    case actionTypes.OPERAT: // 操作一行数据
      return Object.assign({}, state, action);
    default:
      return state;
  }
}
