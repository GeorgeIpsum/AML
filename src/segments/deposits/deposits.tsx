import React from 'react';
import { DepositStore } from '../../models/deposit-list-store';
import { DepositStatus } from '../../models/deposit';
import { observer } from 'mobx-react';
import './deposits.scss';
import DepositForm from '../../components/deposit-form';
import DepositListItem from '../../components/deposit-list-item';
import Button from '../../dummies/button';
import { ContextStore } from '../../models/context';

interface DepositsProps {
  depositStore: DepositStore;
  contextStore: ContextStore;
}

interface DepositsState {
  filters: any
}

@observer
export default class Deposits extends React.Component<DepositsProps, DepositsState> {
  constructor(props) {
    super(props);

    this.state = { filters: { hide: false } };
  }
  onChangeStatus = (event: any, hash: string) => {
    const depositIndex = this.props.depositStore.deposits.findIndex((d) => d.hash === hash);
    this.props.depositStore.changeDeposit(depositIndex, {value: '', status: this.props.depositStore.deposits[depositIndex].status === DepositStatus.unprocessed ? DepositStatus.actedUpon : DepositStatus.unprocessed});
  }

  changeShown = () => {
    this.setState(state => ({ filters: {hide: !state.filters.hide} }));
  }

  onClear = (event?: any) => {
    this.props.depositStore.setDeposits(null);
  }

  render() {
    const deposits = this.props.depositStore.chronological.map((d) => {
      if(!this.state.filters.hide) {
        if(d.status===DepositStatus.unprocessed) {
          return (<DepositListItem key={d.hash} hash={d.hash} value={d.value} status={d.status !== DepositStatus.unprocessed} date={d.dateAdded} changeStatus={this.onChangeStatus} context={this.props.contextStore.findById(d.contextId)} />)
        } else {
          return null;
        }
      } else {
        return (<DepositListItem key={d.hash} hash={d.hash} value={d.value} status={d.status !== DepositStatus.unprocessed} date={d.dateAdded} changeStatus={this.onChangeStatus} context={this.props.contextStore.findById(d.contextId)} />)
      }
    }) as any;

    return (
      <div className="Deposits">
        <DepositForm store={this.props.depositStore} context={this.props.contextStore} />
        <div className="Deposit-List">
          { deposits }
        </div>
        <Button style={{padding: '0.5rem', marginRight: '0.4rem'}} onClick={this.onClear}>Clear Deposits</Button>
        <Button style={{padding: '0.5rem'}} onClick={this.changeShown}>{ this.state.filters.hide ? 'Hide Finished' : 'Show Finished' }</Button>
      </div>
    );
  }
}