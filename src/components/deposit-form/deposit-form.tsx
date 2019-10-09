import React from 'react';
import { observer } from 'mobx-react';
import './deposit-form.scss';
import { X } from 'react-feather';
import ContextSelect from '../context-select';

interface DepositFormProps {
  onSubmit: any,
  store: any
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

  clearForm = (event) => {
    this.setState({
      formInput: ''
    });
  }

  addContext = (name?: string) => {
    if(!this.props.store.contextStore.findByName(name)) {
      this.props.store.contextStore.addContext(name);
    }
  }

  render() {
    const contexts = this.props && this.props.store && this.props.store.contextStore && this.props.store.contextStore.contexts;
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
          <ContextSelect contexts={contexts} addContext={this.addContext} />
        </div>
      </div>
    );
  }
}