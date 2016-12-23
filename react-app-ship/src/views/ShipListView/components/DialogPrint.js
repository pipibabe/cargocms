import React, { PropTypes } from 'react';
import {
  Dialog,
  FlatButton,
} from 'material-ui';

const defaultProps = {
  open: false,
  close: null,
};

const propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
};

function handleClose(props) {
  props.close();
  // console.log('dialog closeed');
}

function DialogPrint(props) {
  const dialogActions = [
    <FlatButton
      label='取消'
      primary={true}
      onTouchTap={props.close}
    />,
    <FlatButton
      label='確定'
      primary={true}
      keyboardFocused={true}
      onTouchTap={props.close}
    />,
  ];
  return (
    <div className='dialog-wrapper'>
      <Dialog
        title='提示'
        actions={dialogActions}
        modal={false}
        open={props.open}
        onRequestClose={props.close}
      >
       確定要列印出貨單嗎？
      </Dialog>
    </div>
  );
}

DialogPrint.defaultProps = defaultProps;
DialogPrint.propTypes = propTypes;

export default DialogPrint;
