import React, { PropTypes } from 'react';
import CardBodyNormal from './CardBodyNormal';
import CardBodyExpend from './CardBodyExpend';
import DialogPrint from './DialogPrint';
import DialogShip from './DialogShip';
import {
  Snackbar,
} from 'material-ui';

export default class ShipCardBody extends React.Component {
  static defaultProps = {
    isExpend: false,
  };

  static propTypes = {
    isExpend: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      dialogShipOpen: false,
      dialogPrintOpen: false,
      snackbarOpen: false,
      snackbarMsg: '',
    };
  }

  stopPropagation = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  handleSnackbarMessage = (msg) => {
    this.setState({
      snackbarOpen: true,
      snackbarMsg: msg,
    });
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  }

  handleDialogShipOpen = (event) => {
    this.stopPropagation(event);
    const state = this.state.dialogShipOpen;
    this.setState({
      dialogShipOpen: !state,
    });
  }

  handleDialogShipClose = () => {
    this.setState({ dialogShipOpen: false });
    this.handleSnackbarMessage('操作成功！');
  }

  handleDialogPrintOpen = (event) => {
    this.stopPropagation(event);
    const state = this.state.dialogPrintOpen;
    this.setState({
      dialogPrintOpen: !state,
    });
  }

  handleDialogPrintClose = () => {
    this.setState({ dialogPrintOpen: false });
    this.handleSnackbarMessage('操作成功！');
  }

  render() {
    const cardBody = this.props.isExpend ?
        (<CardBodyExpend
          {...this.props}
          handleBtnShip={this.handleDialogShipOpen}
          handleBtnPrint={this.handleDialogPrintOpen}
        />) :
        (<CardBodyNormal {...this.props} />);
    return (
      <div className='cardbody-wrapper'>
        {cardBody}
        <DialogShip
          title='提示'
          modal={false}
          close={this.handleDialogShipClose}
          open={this.state.dialogShipOpen}
        />
        <DialogPrint
          title='提示'
          modal={false}
          close={this.handleDialogPrintClose}
          open={this.state.dialogPrintOpen}
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMsg}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}
