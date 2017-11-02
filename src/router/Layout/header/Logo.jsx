import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames'
import './logo.styl'
class Logo extends React.Component {
  render() {
    return (
      <div className={classnames('logo',{collapsed:this.props.collapsed?true:false})}>
        <h1 className={this.props.collapsed?'collapsed':''}>
          <Link to={this.props.href || '/'}>
            {!this.props.collapsed ? this.props.name: ''}
          </Link>
        </h1>
      </div>
    );
  }
}

module.exports = Logo;
