import React, {Component} from "react";
import {Button, Icon} from "@alifd/next";
import {getAuthority} from "../../utils/authority";

export default class PermissionBtn extends Component {
  static displayName = 'PermissionBtn';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.permission && getAuthority().indexOf(this.props.permission) !== -1 ?
      <Button {...this.props}>{this.props.icon ?
        <Icon type={this.props.icon} size="xs" style={{marginRight: '4px'}}/> :
        null}{this.props.name}</Button> :
      null;
  }
}
