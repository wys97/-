import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Grid, Input, Message} from '@alifd/next';
import '../OperationManage'
import productManageApi from '../../../api/OperationManage/ProductManage'

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};

const FormItem = Form.Item;


export default class ProductInfoDetail extends Component {
  static displayName = 'ProductInfoTabManage';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      formInput: {
        productNo: '',
        productStatusText: '',
        partnerNo: '',
        partnerName: '',
        productName: '',
        productType: '',
        productTypeText: '',
        productDescription: '',
        loanMinAmount: '',
        loanMaxAmount: '',
        loanMinTerm: '',
        loanMaxTerm: '',
        maxInterestRate: '',
        areaNo: '',
        areaNoText: '',
        manualApprovalRatem: '',
        manualApprovalAmount: '',
        accountingTypeText: '',
        isFirstInterestFree: '',
        backoutDay: '',
        repaySequenceText: '',
        debitFailDay: '',
        creatorName: '',
        createTime: '',
        modifierName: '',
        modifyTime: ''
      }
    }
  }

  componentDidMount = () => {
    this.getproductDetail()
  };

  getproductDetail = () => {       //产品管理-详情
    productManageApi.productDetail(this.state.id).then((res) => {
      if (res.data.code === '200') {
        let data = res.data.data
        if(res.data.data.isFirstInterestFree === true) {
          data.isFirstInterestFree = "是"
        } else {
          data.isFirstInterestFree = "否"
        }
        this.setState({
          formInput: data
        })
      } else {
        Message.error(res.data.message)
      }
    })
  };

  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>基本信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="产品编号:">
                    {/* <Input style={ styles.formContent } value={this.state.formInput.productNo} placeholder=""/> */}
                    <p>{this.state.formInput.productNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="产品状态:">
                    {/* <Input style={ styles.formContent } value={this.state.formInput.productNo} placeholder=""/> */}
                    <p>{this.state.formInput.productStatusText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构编号:">
                    {/* <Input style={ styles.formContent } value={this.state.formInput.productNo} placeholder=""/> */}
                    <p>{this.state.formInput.partnerNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构名称:">
                    {/* <Input style={ styles.formContent } value={this.state.formInput.productNo} placeholder=""/> */}
                    <p>{this.state.formInput.partnerName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="产品名称:">
                    {/* <Input style={ styles.formContent } value={this.state.formInput.productNo} placeholder=""/> */}
                    <p>{this.state.formInput.productName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="产品类型:">
                    {/* <Input style={ styles.formContent } value={this.state.formInput.productNo} placeholder=""/> */}
                    <p>{this.state.formInput.productTypeText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} label="产品说明:" help="">
                    <Input.TextArea style={{width: '500px'}} readOnly={true} value={this.state.formInput.productDescription}
                                    placeholder="" name="remark"/>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>

          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>筛查规则参数</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="金额上限:">
                    {/* <Input style={ styles.formContent } placeholder=""/> 元 */}
                    <p>{this.state.formInput.loanMaxAmount}<span>元</span></p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="金额下限:">
                    {/* <Input style={ styles.formContent } placeholder=""/> 元 */}
                    <p>{this.state.formInput.loanMinAmount}<span>元</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="期限上限:">
                    {/* <Input style={ styles.formContent } placeholder=""/> 月 */}
                    <p>{this.state.formInput.loanMaxTerm}<span>月</span></p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="期限下限:">
                    {/* <Input style={ styles.formContent } placeholder=""/> 月 */}
                    <p>{this.state.formInput.loanMinTerm}<span>月</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="利率上限(月):">
                    {/* <Input style={ styles.formContent } placeholder=""/> % */}
                    <p>{this.state.formInput.maxInterestRate}<span>%</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="允许展业地区:" required>
                    {/* <Input style={ styles.formContent } placeholder=""/> % */}
                    <Input.TextArea style={{width: '500px'}} name='areaNoText' value={this.state.formInput.areaNoText}
                                    readOnly={true}/>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>配置信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="核算类型:" required>
                    {/* <Input style={ styles.formContent } placeholder=""/>  */}
                    <p>{this.state.formInput.accountingTypeText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="反悔期:">
                    {/* <Input style={ styles.formContent } placeholder=""/> 天 */}
                    <p>{this.state.formInput.backoutDay}<span>天</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="扣款顺序:" required>
                    {/* <Input style={ styles.formContent } placeholder=""/>  */}
                    <p>{this.state.formInput.repaySequenceText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="扣失最大天数:">
                    {/* <Input style={ styles.formContent } placeholder=""/> 天 */}
                    <p>{this.state.formInput.debitFailDay}<span>天</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                  <Col span="12">
                  <FormItem style={styles.formItem} required label="是否首期免息:">
                    <p>{this.state.formInput.isFirstInterestFree}</p>
                  </FormItem>
                  </Col>
                </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建人员:">
                    {/* <Input style={styles.formContent}   placeholder=""/> */}
                    <p>{this.state.formInput.creatorName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建时间:">
                    {/* <Input style={styles.formContent}   placeholder=""/> */}
                    <p>{this.state.formInput.createTime}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改人员:">
                    {/* <Input style={styles.formContent}   placeholder=""/> */}
                    <p>{this.state.formInput.modifierName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改时间:">
                    {/* <Input style={styles.formContent}   placeholder=""/> */}
                    <p>{this.state.formInput.modifyTime}</p>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </IceContainer>
      </div>
    )
  }
}

const styles = {
  formItem: {
    display: 'flex'
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
    // width: '200px'
  },
  formInputBorder: {
    width: '240px'
  },
  formContent: {
    width: '0px',
    border: 'none'
  },
  formTextArea: {
    width: '500px'
  }

};
