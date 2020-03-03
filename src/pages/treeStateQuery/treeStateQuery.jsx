import React, {Component} from 'react';
import {Message} from '@alifd/next';
import queryData from '../../api/treeStateQuery/treeStateQuery'

export default class TreeStateQuery extends Component {
    static displayName = 'TreeStateQuery';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }

  componentDidMount = () => {
    this.getPage()
  };

  getPage = () => {
    queryData.getPage().then((res) => {
      // debugger;
      console.log(res);
      if (res.data.code === '200') {
        const url = JSON.parse(res.data.data).url;
        this.setState({
          url
        });
      } else {
        Message.error(res.data.message);
      }
    })
  };

  render() {
    return (
      <iframe src={this.state.url} style={{width: '100%', height: 'calc(100% - 10px)', border: 'none'}}/>
    )
  }
}