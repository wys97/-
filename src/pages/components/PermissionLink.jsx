import React, {Component} from "react";
import {Icon} from "@alifd/next";
import {getAuthority} from "../../utils/authority";
import {Link} from "react-router-dom";

export default class PermissionLink extends Component {
  static displayName = 'PermissionLink';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return getAuthority().indexOf(this.props.permission) !== -1 ?
      <Link {...this.props}>{this.props.icon ?
        <Icon type={this.props.icon} size="xs" style={{marginRight: '4px'}}/> :
        null}{this.props.name}</Link> :
      null;
  }
}
