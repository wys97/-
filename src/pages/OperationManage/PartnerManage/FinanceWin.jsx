import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {DatePicker, Dialog, Field, Form, Grid, Input} from '@alifd/next';

const {Row, Col} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10
  },
  wrapperCol: {
    span: 14
  }
};

export default class FinanceWin extends Component {
  field = new Field(this);

  static displayName = 'FinanceWin';

  static propTypes = {};

  static defaultProps = {};

  flag = true;

  constructor(props) {
    super(props);
    this.state = {
      financeInfo: this.props.data
    }
    // this.goBack = this.goBack.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.show !== this.props.show) {
      this.field.setValues(nextProps.data);
      this.setState({
        financeInfo: nextProps.data
      });
    }
    return true;
  }

  componentWillMount() {
  }

  onSave = (formInfo, errorInfo) => {
    if (JSON.stringify(errorInfo).indexOf('是') !== -1 || JSON.stringify(errorInfo).indexOf('正确') !== -1) {
      return;
    }
    const params = this.field.getValues();
    this.props.save(params);
  };

  onClose = () => {   //关闭弹窗
    this.props.close();
    this.flag = true;
  };

  render() {
    return <Dialog title={this.props.title}
                   style={{width: '1000px', borderRadius: '8px'}}
                   isFullScreen={false}
                   footer={false}
                   onClose={this.onClose}
                   visible={this.props.show}>
      <IceContainer>
        <div className='contain-con'>
          <Form labelTextAlign={'right'}  {...formItemLayout} field={this.field}>
            <Row>
              <Col span="24">
                <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage="" label="财务信息ID：">
                  {this.state.financeInfo ? this.state.financeInfo.financeId : ''}[自动生成]
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage=""
                          label="合作机构编号:">
                  {this.state.financeInfo ? this.state.financeInfo.partnerNo : ''}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage=""
                          label="合作机构名称:">
                  {this.state.financeInfo ? this.state.financeInfo.partnerName : ''}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage="总资产是必填字段"
                          label="总资产:">
                  <Input name="totalAsset" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} required requiredMessage="财务报表截止日期是必选字段" label="财务报表截止日期:">
                  <DatePicker followTrigger name="reportEndDate" style={styles.formInputBorder}/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="总负债:" required
                          requiredMessage="总负债是必填字段">
                  <Input name="totalLiability" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} required requiredMessage="流动资产是必填字段" label="流动资产:">
                  <Input name="currentAsset" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} required requiredMessage="流动负债是必填字段" label="流动负债:">
                  <Input name="currentLiability" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="所有者权益:" required requiredMessage="所有者权益是必填字段">
                  <Input name="ownerEquity" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="销售成本:">
                  <Input name="saleCost" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="销售收入:">
                  <Input name="saleRevenue" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="所得税:">
                  <Input name="incomeTax" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="净利润:">
                  <Input name="netProfit" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="经营产生现金流:">
                  <Input name="netCash" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="借款:">
                  <Input name="borrowAmount" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="利息支出:">
                  <Input name="interestExpense" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="现金和银行存款:">
                  <Input name="cashAmount" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="净资产规模:">
                  <Input name="netAsset" style={styles.formInputBorder} /> 元
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="销售收入复合增长率:">
                  <Input name="saleIncomeGrowth" style={styles.formInputBorder} /> %
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="销售利润复合增长率:">
                  <Input name="saleProfitGrowth" style={styles.formInputBorder} /> %
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="资产负债率:">
                  <Input name="assetLiabilityRatio" style={styles.formInputBorder} /> %
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} label="备注:">
                  <Input.TextArea style={{width: '500px'}} name="remark"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="创建人员:">
                  {this.state.financeInfo ? this.state.financeInfo.creatorName : ''}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="创建时间:">
                  {this.state.financeInfo ? this.state.financeInfo.createTime : ''}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="修改人员:">
                  {this.state.financeInfo ? this.state.financeInfo.modifierName : ''}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="修改时间:">
                  {this.state.financeInfo ? this.state.financeInfo.modifyTime : ''}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="" style={{textAlign: "center"}}>
                  <Form.Submit style={styles.saveButton} validate onClick={this.onSave}>保存</Form.Submit>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </IceContainer>
    </Dialog>
  }
}

const styles = {
  formItem: {
    display: 'flex',
    lineHeight: '28px'
  },
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
    padding: 10
  },
  formItemInput: {
    width: '120px',
    borderRadius: '4px'
  },
  searchBtn: {
    float: 'right',
    backgroundColor: '#fff',
    color: '#3080fe'
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
  formInput: {
    border: 'none',
  },
  formInputBorder: {
    width: '240px'
  },
  saveButton: {
    borderRadius: '4px',
    width: '80px',
    backgroundColor: '#3080fe',
    color: '#fff',
    borderColor: 'transparent'
  },
};
