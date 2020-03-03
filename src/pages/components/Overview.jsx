/* eslint react/jsx-no-target-blank: 0 */
import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Balloon, Grid, Icon} from '@alifd/next';
// import imgDown from './images/TB1ReMsh3vD8KJjy0FlXXagBFXa-12-18.png';
// import imgUp from './images/TB1Q1Msh3vD8KJjy0FlXXagBFXa-12-18.png';

const {Row, Col} = Grid;

export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    /* const down = (
      <img
        src={imgDown}
        style={styles.down}
        alt=""
      />
    );

    const up = (
      <img
        src={imgUp}
        style={styles.up}
        alt=""
      />
    );*/

    const extraIcon = this.props.extra ?
      <span style={styles.extraIcon}>
        <Balloon
          trigger={
            <Icon
              type="help"
              size="xs"
              style={{
                position: 'relative',
                top: '-2px',
                color: '#666',
              }}
            />
          }
          triggerType="hover"
          closable={false}
        >
          这里是数据说明
        </Balloon>
      </span> :
      null;

    return (
      <IceContainer style={styles.container}>
        {
          this.props.title ?
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3 style={{paddingBottom: '10px', color: '#333'}}>{this.props.title}</h3>
            </div> :
            null
        }
        <Row wrap>
          {this.props.data.map((item, index) => {
            return <Col key={index} xxs="24" s={this.props.col && this.props.col <= 2 ? "24" : "12"}
                        l={this.props.col ? 24 / this.props.col + "" : "6"}
                        offset={this.props.offset ? this.props.offset : 0} style={styles.item}>
              <div style={styles.title}>
                <span>{item.label}</span>
                {extraIcon}
              </div>
              <div style={styles.count}>{item.value}</div>
            </Col>
          })}
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    marginBottom: '15px'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 0',
  },
  title: {
    fontSize: '12px',
    marginBottom: '5px',
    color: '#666'
  },
  count: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#5480FE'
  },
  desc: {
    fontSize: '12px',
  },
  down: {
    width: '6px',
    height: '9px',
  },
  up: {
    width: '6px',
    height: '9px',
  },
  extraIcon: {
    marginLeft: '5px',
    position: 'relative',
    top: '1px',
  },
};
