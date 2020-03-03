/* eslint-disable react/no-unused-state */
import React, {Component} from 'react';
import {Button, DatePicker, Grid, Input, Select, TimePicker, NumberPicker} from '@alifd/next';
import {FormBinder, FormBinderWrapper} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';

const {Row, Col} = Grid;
const {RangePicker} = DatePicker;

export default class SearchForm extends Component {
  static displayName = 'SearchForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      form: props.form,
      formValue: this.props.formValue ? this.props.formValue : {},
      formTitle: props.title
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.formValue && (!this.props.formValue || JSON.stringify(nextProps.formValue) === JSON.stringify(this.props.formValue))) {
      this.setState({
        formValue: this.props.formValue
      })
    }
  }

  formChange = (value) => {
    this.setState({
      formValue: value,
    });
  };

  formSubmit = () => {
    this.props.onSubmit(this.state.formValue);
  };

  onReset = () => {
    this.setState({
      formValue: {},
    });
  };

  getContainer = () => {
    return window.document.getElementsByClassName('main-content')[0];
  };

  render() {
    const {form, formValue} = this.state;

    return (
      <IceContainer title={this.props.title}>
        <FormBinderWrapper value={formValue} onChange={this.formChange}>
          <Row wrap>
            {form.map((col, index) => {
              let dom;
              if (col.type === 'date') {
                dom = <DatePicker popupContainer={this.getContainer} readOnly/>
              } else if (col.type === 'range') {
                dom = <RangePicker popupContainer={this.getContainer} readOnly/>
              } else if (col.type === 'time') {
                dom = <TimePicker/>
              } else if (col.type === 'select') {
                dom = <Select popupContainer={this.getContainer} placeholder="请选择" style={{width: '200px'}}>
                  {col.list.map((opt, idx) => {
                    return (<Select.Option key={idx} value={opt.value}>{opt.key}</Select.Option>)
                  })}
                </Select>
              } else if (col.type === 'section') {
                dom = <Input/>;
              } else if (col.type === 'id') {
                dom = <Input maxLength={11}/>;
              }
              //Integer 最大值 2147483647
              else if (col.type === 'IntegerSection') {
                dom = <NumberPicker min={0} max={2147483647}/>;
              } else if (col.type === 'LongSection') {
                dom = <NumberPicker min={0} max={92233720368547700}/>;
              } else {
                dom = <Input/>;
              }
              return (
                <Col key={index} xxs='24' l='8' style={styles.formCol}>
                  <Col xxs='24' l='9' style={styles.formColLabel}>
                    <span style={styles.label}>{col.label + '：'}</span>
                  </Col>
                  {
                    col.type === 'section' || col.type === 'IntegerSection' || col.type === 'LongSection' ?
                      <Col xxs='24' l="15">
                        <div style={{display: 'inline-block', width: '200px'}}>
                          <Row>
                            <Col xxs='10' l="10" style={styles.formCol}>
                              <FormBinder name={col.keys[0]}>
                                {dom}
                              </FormBinder>
                            </Col>
                            <Col xxs='4' l="4" style={styles.formCol}>
                              <span style={{
                                display: 'inline-block',
                                height: '28px',
                                width: '100%',
                                lineHeight: '38px',
                                textAlign: 'center'
                              }}>至</span>
                            </Col>
                            <Col xxs='10' l="10" style={styles.formCol}>
                              <FormBinder name={col.keys[1]}>
                                {dom}
                              </FormBinder>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      :
                      <Col xxs='24' l="15" style={styles.formCol}>
                        <FormBinder name={col.key}>
                          {dom}
                        </FormBinder>
                      </Col>
                  }


                </Col>
              );
            })}
          </Row>
          <div style={styles.searchBtn}>
            <Button onClick={(e) => this.formSubmit(e)} type="primary">
              查询
            </Button>
            <Button onClick={this.onReset} type="normal" style={{marginLeft: '10px'}}>
              重置
            </Button>
          </div>
        </FormBinderWrapper>
      </IceContainer>
    );
  }
}

const styles = {
  formRow: {
    marginBottom: '18px',
  },
  formLabel: {
    alignItems: 'center',
    textAlign: 'right',
    marginBottom: '20px',
  },
  formCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  formColLabel: {
    alignItems: 'center',
    marginBottom: '10px',
    textAlign: 'right'
  },
  label: {
    lineHeight: '28px',
    paddingRight: '10px',
  },
  searchBtn: {
    textAlign: 'left'
  }
};
