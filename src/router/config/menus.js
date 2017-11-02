import React from 'react';
import {Icon} from 'antd';
import DeployProject from '../../containers/deploy-project-list/deploy-project-list';
import Service from '../../containers/service-list/service-list';
import WebhookHistoryLog from '../../containers/deploy-project-webhook-log/deploy-project-webhook-log';


const menus = [{
  key: 'deployproject',
  title: '项目发布',
  component: DeployProject,
  icon: <Icon type="desktop" />
},{
  key: 'service',
  title: '服务列表',
  component: Service,
  icon: <Icon type="bar-chart" />
}, {
  key: 'webhookhistorylog',
  title: '日志',
  component: WebhookHistoryLog,
  icon: <Icon type="shopping-cart" />
}];
export default menus;
