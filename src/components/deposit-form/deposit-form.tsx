import React from 'react';
import { observer } from 'mobx-react';
import './deposit-form.scss';

interface DepositFormProps {
  onSubmit: any,
  onClear: any
};

interface DepositFormState {
  formInput: string
};

@observer
export default class DepositForm extends React.Component<DepositFormProps, DepositFormState> {
  constructor(props) {
    super(props);

    this.state = {
      formInput: ''
    };
  }
  
  onFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(this.state.formInput !== '') {
      this.props.onSubmit(this.state.formInput);
    }
    this.setState({
      formInput: ''
    });
  }

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      formInput: event.target.value
    });
  }

  onDepositsClear = (event) => {
    this.props.onClear();
  }

  render() {
    return (
      <div className="Deposit-Form">
        <form onSubmit={this.onFormSubmit} className="Deposit-Form">
          <input type="text" value={this.state.formInput} onChange={this.onInputChange}  className="Deposit-Form Deposit-Form-Input" />
          <input type="submit" />
          <button type="button" onClick={this.onDepositsClear}>Clear</button>
        </form>
      </div>
    );
  }
}