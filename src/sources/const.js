const BaseUrl =   'http://192.168.150.222:7701';// 'http://192.168.150.52:7701' ;//

export const LOGIN = `${BaseUrl}/api/session/login`; // 登录服务器
export const LOGIN_CHECK = `${BaseUrl}/api/check_user_token`; // 检查是否token
export const SERVICE_LIST = `${BaseUrl}/api/service/list`; //服务器列表
export const SERVICE_OPERATE = `${BaseUrl}/api/service/operate`; // 服务器操作
export const WEBHOOK_LIST = `${BaseUrl}/api/webhook/list`; // webhook 项目列表
export const WEBHOOK_LIST_OPERATE = `${BaseUrl}/api/webhook/operate`; // webhook 列表操作
export const WEBHOOK_DEPLOY_LOG = `${BaseUrl}/api/webhookhistroy/list`; // 项目部署 日志列表
export const WEBHOOK_DEPLOY = `${BaseUrl}/api/webhook/deploy`; // 项目部署 日志列表
export const WEBHOOK_DEPLOY_SERVICE_LOG = `${BaseUrl}/api/webhook/deploy_log`; // 项目部署 日志列表
