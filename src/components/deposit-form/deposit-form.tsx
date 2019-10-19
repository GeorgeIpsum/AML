import React from 'react';
import { observer } from 'mobx-react';
import './deposit-form.scss';
import ItemSelect from '../item-select';
import { DepositStatus, DepositStore } from '../../models/deposit';
import { ContextStore } from '../../models/context';
import { ProjectStore } from '../../models/project';
import DepositFormInput from '../../dummies/deposit-form-input';

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

  clearForm = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.setState({ formInput: '' });
    this.props.store.setCurrentlyTyping('');
  }

  render() {
    const { context, project } = this.props;

    return (
      <div className="Deposit-Form">
        <DepositFormInput className="deposit-form-form" formInput={this.state.formInput} placeholder="What's on your mind?" onSubmit={this.onFormSubmit} onInputChange={this.onInputChange} onInputClear={this.clearForm} />

        <div className="input-border"></div>

        <div className="selections">
          <ItemSelect id="Context" store={context} canBeNull={false} />
          <ItemSelect id="Project" store={project} canBeNull={true} />
        </div>
      </div>
    );
  }
}
