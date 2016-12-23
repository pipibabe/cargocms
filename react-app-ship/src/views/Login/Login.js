/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment, doubleAsync } from '../../redux/modules/counter';
import Crab from './crab.png';
import FishLogo from './fish logo.png';
import classes from './_style.scss';

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class Login extends React.Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };
  props: Props;

  render() {
    return (
      <div className='login-container' >
        <div className='login-form'>
          <div className='login-form-body'>
            <h1>出貨管理</h1>
            <img className='crab' src={Crab} alt='crab' />
            <form>
              <label>帳號</label>
              <input type='text' placeholder='Username' className='form-control margin-bottom-20' />
              <label>密碼</label>
              <input type='text' placeholder='Password' className='form-control' />
              <a className='forget-password' href='#'>忘記密碼？</a>
              <button type='button' className='btn login-btn'>登入系統</button>
            </form>
          </div>
          <div className='login-form-footer'>
            <div className='login-contact'>
              <img src={FishLogo} alt='fish logo' />
              <div className='login-contact-info'>
                <h1>雲端漁場服務專線</h1>
                <p>
                  <a href='#'>(05)0000-0000</a>
                </p>
              </div>
            </div>
            <a href='#' className='facebook-btn' >
              <i className='fa fa-facebook' aria-hidden='true' />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.counter,
});
export default connect(mapStateToProps, {
  increment: () => increment(1),
  doubleAsync,
})(Login);
