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
export default class RootComponent extends React.Component<RootComponentProps, {value: string, test: any, hide?: boolean}> {
  constructor(props) {
    super(props);

    this.state = {value: "", test: "", hide: true};
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

  changeShown = () => {
    this.setState({hide: !this.state.hide});
  }

  render() {
    const deposits = this.props.depositStore.chronoView.map((d) => {
      if(!this.state.hide) {
        if(d.status===DepositStatus.unprocessed) {
          return (<DepositListItem key={d.hash} hash={d.hash} value={d.value} status={d.status !== DepositStatus.unprocessed} date={d.dateAdded} changeStatus={this.onChangeStatus} />)
        } else {
          return null;
        }
      } else {
        return (<DepositListItem key={d.hash} hash={d.hash} value={d.value} status={d.status !== DepositStatus.unprocessed} date={d.dateAdded} changeStatus={this.onChangeStatus} />)
      }
    }) as any;

    return (
      <div className="Root">
        <DepositForm onSubmit={this.onDepositFormSubmit} />
        { deposits }
        <button type="button" onClick={this.onClear}>Clear Deposits</button>
        <button type="button" onClick={this.changeShown}>{ this.state.hide ? 'Hide Finished' : 'Show Finished' }</button>
      </div>
    );
  }
}