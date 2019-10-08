import React from 'react';
import { observer } from 'mobx-react';
import './deposit-form.scss';
import { X } from 'react-feather';

interface DepositFormProps {
  onSubmit: any,
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

  parseInput = (input: string) => {
    const parsedInput = {
      input,
      place: '',
      time: ''
    };
    if(input.search('@')) {
      let split = input.split('@');
      if(split[1]) {
        parsedInput.place = split[1];
        if(split[2]) {
          parsedInput.input = split[0] + '' + split[2];
        } else {
          parsedInput.input = split[0];
        }
      }
    }

    return parsedInput;
  }

  render() {
    const parsedInput = this.parseInput(this.state.formInput); 
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
        <div className="Parsed-Input">
          <div className="Base-Input">{parsedInput.input}</div>
          {parsedInput.place !== '' && (<div className="Place-Input"><span>Place: </span> {parsedInput.place}</div>)}
        </div>
      </div>
    );
  }
}