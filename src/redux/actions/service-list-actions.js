import * as actionTypes from '../constants/service-list-state';
import { getServiceList , OperateServiceRow } from '../../sources/service-list/service-list';
import { message } from 'antd';
import { hashHistory } from 'react-router'
export function InitServiceList(data) { // 初始化service 列表
  return (dispatch) => {
    const result = getServiceList(data);
    result.then((res) => {
      if (res.status === 'S') {
        dispatch(Object.assign({},{
          list: res.data,
          type: actionTypes.LIST
        }))
      }
    })
  }
}

export function OperateService(data){ // 更新、删除、添加一条service
  return (dispatch, getState) => {
    let service = getState().service; // 服务
    const result = OperateServiceRow(data);
    result.then((res) => {
      if (res.status === 'S') {
        service.OperateRow = res.data;
        service.type = actionTypes.OPERAT
      };
      dispatch(service);
    })
  }
}
