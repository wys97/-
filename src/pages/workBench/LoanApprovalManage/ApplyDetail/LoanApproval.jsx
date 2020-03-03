import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Table} from '@alifd/next';

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

export default class LoanApproval extends Component {

  static displayName = 'LoanApproval';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {

  };

  componentDidMount = () => {

  };

  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>人工审批记录</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Table dataSource={this.props.approvalInfo} emptyContent="暂无数据">
                <Table.Column title='审批ID' dataIndex='approvalId' width='200'/>
                <Table.Column title='审批人员' dataIndex='approverName' width='300'/>
                <Table.Column title='审批结果' dataIndex='approvalStatusText' width='300'/>
                <Table.Column title='审批意见' dataIndex='approvalOpinion' width='300'/>
                <Table.Column title='审批时间' dataIndex='approvalTime' width='300'/>
              </Table>
            </Form>
          </div>
        </IceContainer>
      </div>
    );
  }
}

/*const styles = {
  formItem: {
    display: 'flex',
  },
  formItemLabel: {},
  formItemError: {
    marginLeft: '10px',
  },
  formCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  preview: {
    border: '1px solid #eee',
    marginTop: 20,
    padding: 10,
  },
  formItemInput: {
    width: '120px',
    borderRadius: '4px',
  },
  searchBtn: {
    float: 'right',
    backgroundColor: '#fff',
    color: '#3080fe',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
  formInput: {
    border: 'none',
    // width: '200px'
  },
  formInputBorder: {
    width: '240px',
  },
  formContent: {
    width: '0px',
    border: 'none',
  },
  formTextArea: {
    width: '500px',
  }
};*/
