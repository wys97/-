import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import './Logo.scss';
import img from '../../../../../public/logo.jpg';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo">
        <img src={img} alt=""/>
        <Link to="/" className="logo-text">
          互联网消费信贷系统
        </Link>
      </div>
    );
  }
}
