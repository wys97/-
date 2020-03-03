/* eslint-disable react/no-unused-state, no-plusplus */
import React, {Component} from 'react';
import {Button, Form, Grid, Input} from '@alifd/next';
import IceContainer from '@icedesign/container';
import IceEllipsis from '@icedesign/ellipsis';
import './css/DetailForm.scss';

const formItemLayout = {
  labelCol: {xxs: 8, s: 6, l: 4, span: 12, fixedSpan: 10},
  wrapperCol: {s: 6, l: 6, span: 14}
};

const {Row, Col} = Grid;
const FormItem = Form.Item;

export default class DetailForm extends Component {
  static displayName = 'DetailForm';

  constructor(props) {
    super(props);
    this.state = {};
  }

  goback = () => {
    this.props.history.go(-1)
  };

  render() {
    const back = this.props.hideBack ? null :
      <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goback}>返回</Button>;

    return (
      <div className="column-form detail-form">
        <IceContainer style={styles.container}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3>{this.props.title}</h3>
            {back}
          </div>
          <div className="contain-con">
            <Form labelTextAlign={'right'}  {...formItemLayout}>
              <Row wrap>
                {this.props.col.map((item, index) => {
                  return <Col key={index} xxs="24" s={item.row ? (item.row * 12 + "") : "12"}
                              l={item.row ? (item.row * 12 + "") : "12"}>
                    <FormItem
                      label={item.label}
                      required={item.require}
                      requiredMessage=''
                      labelTextAlign='right'
                      style={styles.formItem}
                    >
                      {item.type === 'textarea' ?
                        <Input.TextArea style={{width: '500px'}} value={this.props.data[item.key]}
                                        readOnly/> : (item.line ?
                          <IceEllipsis lineLimit={1} text={this.props.data[item.key]} style={{width: '500px'}}/> :
                          <span>{(item.key && this.props.data[item.key] !== null && this.props.data[item.key] !== undefined ? this.props.data[item.key] : '') + (item.unit ? item.unit : '')}</span>)
                      }
                    </FormItem>
                  </Col>
                })}
              </Row>
            </Form>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '10px',
  },
  formLabel: {
    textAlign: 'right',
  },

  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};

