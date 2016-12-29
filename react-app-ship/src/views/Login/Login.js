/* @flow */
import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { deepOrange500 } from 'material-ui/styles/colors';
import { Snackbar } from 'material-ui';
import Crab from './crab.png';
import FishLogo from './fish logo.png';
import FormsyInput from '../../components/FormsyInput';
// import axios from 'axios';
import './_style.scss';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      canSubmit: false,
      open: false,
    };
  }

  enableButton = () => {
    this.setState({
      canSubmit: true,
      open: false,
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false,
      open: true,
    });
  }

  submit = () => {
    // FIXME: 需要登入 api ，目前暫時用 form 表單
    document.querySelector('.login-form form').submit();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className='login-container'>
          <div className='login-form'>
            <div className='login-form-body'>
              <h1>出貨管理</h1>
              <img className='crab' src={Crab} alt='crab' />
              <Formsy.Form
                ref={(c) => { this.form = c; }}
                method='post'
                action='/auth/local?url=/ship/'
                onValidSubmit={this.submit}
                onValid={this.enableButton}
                onInvalid={this.disableButton}
              >
                <label>帳號</label>
                <FormsyInput
                  name='identifier'
                  placeholder='Username'
                  className='form-control margin-bottom-20'
                  required={true}
                />
                <label>密碼</label>
                <FormsyInput
                  type='password'
                  name='password'
                  placeholder='Password'
                  className='form-control'
                  required={true}
                />
                <a className='forget-password' href='#!'>忘記密碼？</a>
                <button type='submit' disabled={!this.state.canSubmit} className='btn login-btn'>登入系統</button>
              </Formsy.Form>
            </div>
            <div className='login-form-footer'>
              <div className='login-contact'>
                <img src={FishLogo} alt='fish logo' />
                <div className='login-contact-info'>
                  <h1>雲端漁場服務專線</h1>
                  <p>
                    <a href='#!'>(05)0000-0000</a>
                  </p>
                </div>
              </div>
              <a href='#!' className='facebook-btn' >
                <i className='fa fa-facebook' aria-hidden='true' />
              </a>
            </div>
          </div>
          <Snackbar
            open={this.state.open}
            message='尚有欄位未填寫'
            autoHideDuration={4000}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
