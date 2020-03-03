import React, {Component} from 'react';
import PartnerManage from './PartnerManage/PartnerManage'
import CustomerManage from "./CustomerManage/CustomerManage";
import './OperationManage.scss'

export default class OperationManage extends Component {
  static displayName = 'OperationManage';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="operationmanage-page">
      <CustomerManage/>
      <PartnerManage/>
    </div>;
  }
}
