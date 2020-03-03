import React, { Component } from "react";
import { Input, Message } from "@alifd/next";

export default class EditablePane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      decreasePrincipal: props.decreasePrincipal,
      decreaseInterest: props.decreaseInterest,
      decreaseFine: props.decreaseFine,
      dataSource: props.dataSource
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.decreasePrincipal !== this.state.decreasePrincipal) {
      this.setState({
        decreasePrincipal: nextProps.decreasePrincipal
      });
    }
    if (nextProps.decreaseInterest !== this.state.decreaseInterest) {
      this.setState({
        decreaseInterest: nextProps.decreaseInterest
      });
    }
    if (nextProps.decreaseFine !== this.state.decreaseFine) {
      this.setState({
        decreaseFine: nextProps.decreaseFine
      });
    }
  }

  onKeyDown = e => {
    const { keyCode } = e;
    // Stop bubble up the events of keyUp, keyDown, keyLeft, and keyRight
    if (keyCode > 36 && keyCode < 41) {
      e.stopPropagation();
    }
  };

  onBlur = e => {
    let id = this.state.id;
    let data = this.state.dataSource;
    if (this.props.rectifyType == "DECREASE") {
      if (Number(e.target.value) > data[id].unpaidPrincipal) {
        Message.error("调整本金不能超过未还本金！");
      } else {
        data[id].decreasePrincipal = -Number(e.target.value);
        this.setState({
          dataSource: data
        });
        this.props.dataSourceChange(this.state.dataSource);
      }
    } else {
      data[id].decreasePrincipal = Number(e.target.value);
      this.setState({
        dataSource: data
      });
      this.props.dataSourceChange(this.state.dataSource);
    }
  };
  onDecreaseInterest = e => {
    let id = this.state.id;
    let data = this.state.dataSource;
    if (this.props.rectifyType == "DECREASE") {
      if (Number(e.target.value) > data[id].unpaidInterest) {
        Message.error("调整利息不能超过未还利息！");
      } else {
        data[id].decreaseInterest = -Number(e.target.value);
        this.setState({
          dataSource: data
        });
        this.props.dataSourceChange(this.state.dataSource);
      }
    } else {
      data[id].decreaseInterest = Number(e.target.value);
      this.setState({
        dataSource: data
      });
      this.props.dataSourceChange(this.state.dataSource);
    }
  };
  onDecreaseFine = e => {
    let id = this.state.id;
    let data = this.state.dataSource;
    if (this.props.rectifyType == "DECREASE") {
      if (Number(e.target.value) > data[id].unpaidFine) {
        Message.error("调整罚息不能超过未还罚息！");
      } else {
        data[id].decreaseFine = -Number(e.target.value);
        this.setState({
          dataSource: data
        });
        this.props.dataSourceChange(this.state.dataSource);
      }
    } else {
      data[id].decreaseFine = Number(e.target.value);
      this.setState({
        dataSource: data
      });
      this.props.dataSourceChange(this.state.dataSource);
    }
  };

  render() {
    if (this.props.decreasePrincipal != null) {
      return (
        <Input
          style={{ width: "80px" }}
          autoFocus
          trim
          // placeholder={String(this.props.decreasePrincipalPlaceholder)}
          defaultValue={this.props.decreasePrincipalPlaceholder}
          onKeyDown={this.onKeyDown}
          onBlur={this.onBlur}
        />
      );
    } else if (this.props.decreaseInterest != null) {
      return (
        <Input
          autoFocus
          trim
          // placeholder={String(this.props.decreaseInterestPlaceholder)}
          style={{ width: "80px" }}
          defaultValue={this.props.decreaseInterestPlaceholder}
          onKeyDown={this.onKeyDown}
          onBlur={this.onDecreaseInterest}
        />
      );
    } else {
      return (
        <Input
          autoFocus
          trim
          // placeholder={String(this.props.decreaseFinePlaceholder)}
          style={{ width: "80px" }}
          defaultValue={this.props.decreaseFinePlaceholder}
          onKeyDown={this.onKeyDown}
          onBlur={this.onDecreaseFine}
        />
      );
    }
  }
}
