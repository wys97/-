import React, {Component} from "react";
import {getAuthority} from "../../utils/authority";

export default class PermissionA extends Component {
  static displayName = 'PermissionA';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.permission && getAuthority().indexOf(this.props.permission) !== -1 ?
      <a {...this.props}>{this.props.name}</a> :
      null;
  }
}
