import React from 'react';
import { RootStore } from '../../models/root-store';
import { DepositStore } from '../../models/deposit-list-store';
import { DepositStatus } from '../../models/deposit';
import { observer } from 'mobx-react';
import './root-component.scss';
import DepositForm from '../deposit-form';

interface RootComponentProps {
  rootStore: RootStore;
  depositStore: DepositStore;
}

@observer
export default class RootComponent extends React.Component<RootComponentProps, {value: string, test: any}> {
  constructor(props) {
    super(props);

    this.state = {value: "", test: ""};
  }

  onDepositFormSubmit = (value: string) => {
    const deposit = {
      value,
      status: DepositStatus.unprocessed
    }
    this.props.depositStore.addDeposit(deposit);
  }

  onClear = () => {
    this.props.depositStore.setDeposits(null);
  }

  render() {
    const deposits = this.props.depositStore.chronoView;
    return (
      <div className="Root">
        <DepositForm onSubmit={this.onDepositFormSubmit} onClear={this.onClear} />
        { deposits && deposits.map((d) => (<div key={d.hash}>{d.dateAdded.toString()} || {d.value}</div>)) }
      </div>
    );
  }
}