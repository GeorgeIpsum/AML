import React from 'react';
import { RootStore } from '../../models/root-store';
import { DepositStore } from '../../models/deposit-list-store';
import { DepositStatus } from '../../models/deposit';
import { observer } from 'mobx-react';
import './root-component.scss';
import DepositForm from '../deposit-form';
import DepositListItem from '../deposit-list-item';

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

  onClear = (event) => {
    this.props.depositStore.setDeposits(null);
  }

  onChangeStatus = (event, hash) => {
    const depositIndex = this.props.depositStore.deposits.findIndex((d) => d.hash === hash);
    this.props.depositStore.changeDeposit(depositIndex, {status: this.props.depositStore.deposits[depositIndex].status === DepositStatus.unprocessed ? DepositStatus.actedUpon : DepositStatus.unprocessed});
  }

  render() {
    const deposits = this.props.depositStore.chronoView.map((d) => {
      return (<DepositListItem key={d.hash} hash={d.hash} value={d.value} status={d.status !== DepositStatus.unprocessed} date={d.dateAdded} changeStatus={this.onChangeStatus} />)
    }) as any;

    return (
      <div className="Root">
        <DepositForm onSubmit={this.onDepositFormSubmit} />
        { deposits }
        <button type="button" onClick={this.onClear}>Clear Deposits</button>
      </div>
    );
  }
}