import * as actionTypes from '../constants/webhook-list-state'
import {getWebhookList, OperateWebhookListRow} from '../../sources/webhook-list/webhook-list';


export function InitWebhookList(data) { // 初始化webhhook 项目列表
  return (dispatch) => {
    const result = getWebhookList(data);
    result.then((res) => {
      if (res.status === 'S') {
        dispatch(Object.assign({},{
          list: res.data,
          type: actionTypes.INIT
        }))
      }
    })
  }
}

export function OperateWebhookRow (data) { // 操作 webhook
  return (dispatch, getState) => {
    const webhookProject = getState().webhookProject;
    const result = OperateWebhookListRow(data);
    result.then((res) => {
      if (res.status === 'S') {
        webhookProject.operateRow = res.data || {};
        dispatch(Object.assign({},webhookProject, {
          type: actionTypes.OPERATE
        }))
      }
    })
  }
}



