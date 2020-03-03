import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import productManageApi from '../../../api/OperationManage/ProductManage'
import '../OperationManage'
import {Message} from "@alifd/next/lib/index";
import {Form, Grid } from '@alifd/next';



const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};

const FormItem = Form.Item;

export default class OverdueInformation extends Component {
  static displayName = 'OverdueInformation';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    productNo: props.id,
      formInput:{
        overdueGraceDay: '',
        overdueFineFormula: '',
        overdueRate: '',
      }
    }
  }

  componentDidMount() {
    this.loadDetailInfo();
  }

  loadDetailInfo = () => {
    productManageApi.overdueConfigDetail(this.state.productNo).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formInput: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
  };

  render() {
    return(
        <div>
            <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>逾期还款配置</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
            <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="逾期宽限期:">
                    <p>{this.state.formInput.overdueGraceDay}<span>天</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="逾期罚息公式:" required>
                    <p>{this.state.formInput.overdueFineFormulaText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
              <Col span="24">
                  <FormItem style={styles.formItem} required label="逾期日利率:">
                    <p>{this.state.formInput.overdueRate}<span>%</span></p>
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
  };
