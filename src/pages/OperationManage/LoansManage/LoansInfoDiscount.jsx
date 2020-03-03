import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import '../OperationManage'

export default class LoansInfoDiscount extends Component {
  static displayName = 'LoansInfoDiscount';

  static propTypes = {};

  static defaultProps = {};


  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <h3>代偿回购记录</h3>
          </div>
        </IceContainer>
      </div>
    )
  }
}
