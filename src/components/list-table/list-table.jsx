import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Table }  from 'antd'
class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {

    return (
      <Table dataSource={this.props.data}
             bordered
             rowKey={record => record.id}
             columns={this.props.columns}>
      </Table>
    );
  }
}

export default TableComponent;
