import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// component
import Login from '../containers/login/login'
import Layout from './Layout/Layout'
import NotFound from './NotFound/404'
import Meuns from './config/menus'
import WhookList from '../containers/deploy-project-list/deploy-project-list'

class RouterMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {

    return (
      <Router history={ hashHistory }>
        <Route path='/login' component={Login} />
        <Route path='/' component={ Layout }>
          <IndexRoute component={WhookList}/>
          {
            Meuns.map(function(value, index) {
              return (
                <Route title={value.title}
                       path={value.key}
                       key={index}
                       component={value.component} />
              );
            })
          }
        </Route>
        <Route path='*' component={NotFound}/>
      </Router>
    );
  }
}

export default RouterMapComponent;
