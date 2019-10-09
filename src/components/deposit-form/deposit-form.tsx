import React from 'react';
import { observer } from 'mobx-react';
import './deposit-form.scss';
import { X } from 'react-feather';
import ContextSelect from '../context-select';
import { DepositStatus } from '../../models/deposit';

interface DepositFormProps {
  store: any,
  context: any
};

interface DepositFormState {
  formInput: string
};

@observer
export default class DepositForm extends React.Component<DepositFormProps, DepositFormState> {
  constructor(props) {
    super(props);

    this.state = { formInput: this.props.store.currentlyTyping };
  }
  
  onFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(this.state.formInput !== '') {
      const deposit = {
        value: this.state.formInput,
        status: DepositStatus.unprocessed,
        context: this.props.context.defaultContext
      };
      this.props.store.addDeposit(deposit);
    }
    this.setState({ formInput: '' });
  }

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ formInput: event.target.value });
    this.props.store.setCurrentlyTyping(event.target.value);
  }

  clearForm = (event?: any) => {
    this.setState({ formInput: '' });
    this.props.store.setCurrentlyTyping('');
  }

  render() {
    const contexts = this.props.context;

    return (
      <div className="Deposit-Form">
        <form onSubmit={this.onFormSubmit} className="Deposit-Form-Form">
          <input type="text" value={this.state.formInput} onChange={this.onInputChange}  className="Deposit-Form-Input" />
          <div className="Input-Border"></div>
          <input type="submit" className="Button Deposit-Submit" value="Add" />
          {this.state.formInput !== ''
            ? (<button type="button" className="Button Deposit-Clear" onClick={this.clearForm}><X size={20} /></button>)
            : null 
          }
        </form>

        <div className="Selections">
          <ContextSelect store={contexts} />
        </div>
      </div>
    );
  }
}