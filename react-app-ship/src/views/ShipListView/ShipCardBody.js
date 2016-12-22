import React, { PropTypes } from 'react';
import {
  Snackbar,
} from 'material-ui';
import CardBodyNormal from './CardBodyNormal';
import CardBodyExpend from './CardBodyExpend';
import DialogPrint from './DialogPrint';
import DialogShip from './DialogShip';

export default class ShipCardBody extends React.Component {
  static defaultProps = {
    toast: null,
    isExpend: false,
  };

  static propTypes = {
    toast: PropTypes.func,
    isExpend: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      dialogShipOpen: false,
      dialogPrintOpen: false,
    };
  }

  stopPropagation = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
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
    this.props.toast('操作成功！');
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
    this.props.toast('操作成功！');
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
          toast={this.props.toast}
        />
        <DialogPrint
          title='提示'
          modal={false}
          close={this.handleDialogPrintClose}
          open={this.state.dialogPrintOpen}
          toast={this.props.toast}
        />
      </div>
    );
  }
}
