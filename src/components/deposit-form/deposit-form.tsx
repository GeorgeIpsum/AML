import React from 'react';
import { observer } from 'mobx-react';
import './deposit-form.scss';
import { X } from 'react-feather';
import ItemSelect from '../item-select';
import { DepositStatus, DepositStore } from '../../models/deposit';
import { ContextStore } from '../../models/context';
import { ProjectStore } from '../../models/project';

interface DepositFormProps {
  store: DepositStore;
  context: ContextStore;
  project: ProjectStore;
};

interface DepositFormState {
  formInput: string;
};

@observer
export default class DepositForm extends React.Component<DepositFormProps, DepositFormState> {
  constructor(props) {
    super(props);

    this.state = { formInput: props.store.currentlyTyping };
  }
  
  onFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(this.state.formInput !== '') {
      const deposit = {
        value: this.state.formInput,
        status: DepositStatus.unprocessed,
        context: this.props.context.defaultContext,
        project: this.props.project.selectedProject
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
    const { context, project } = this.props;

    return (
      <div className="Deposit-Form">
        <form onSubmit={this.onFormSubmit} className="deposit-form-form">
          <input type="text" value={this.state.formInput} onChange={this.onInputChange}  className="deposit-form-input" />
          <div className="input-border"></div>
          <input type="submit" className="deposit-submit" value="Add" disabled={this.state.formInput === ''} />
          {this.state.formInput !== ''
            ? (<button type="button" className="deposit-clear" onClick={this.clearForm}><X size={20} /></button>)
            : null 
          }
        </form>

        <div className="selections">
          <ItemSelect id="Context" store={context} canBeNull={false} />
          <ItemSelect id="Project" store={project} canBeNull={true} />
        </div>
      </div>
    );
  }
}
