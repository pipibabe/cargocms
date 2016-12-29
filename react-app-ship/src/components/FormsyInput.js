import React, { PropTypes } from 'react';
import { Decorator as FormsyElement } from 'formsy-react';

type Props = {
  name: Function,
  className: Function,
  placeholder: Function
};

@FormsyElement()
class FormsyInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  };
  props: Props;
  render() {
    return (
      <div>
        <input name={this.props.name}
          className={this.props.className}
          placeholder={this.props.placeholder}
          value={this.props.getValue()}
          onChange={e => this.props.setValue(e.target.value)}
        />
      </div>
    );
  }
}
export default FormsyInput;
