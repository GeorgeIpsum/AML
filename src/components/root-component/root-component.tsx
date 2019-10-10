import React from 'react';
import { RootStore } from '../../models/root-store';
import { DepositStore } from '../../models/deposit-list-store';
import { ContextStore } from '../../models/context';
import { observer } from 'mobx-react';
import './root-component.scss';
import Deposits from '../../segments/deposits';

interface RootComponentProps {
  rootStore: RootStore;
  depositStore: DepositStore;
  contextStore: ContextStore;
}

interface RootComponentState {
  currentNav: any
}

@observer
export default class RootComponent extends React.Component<RootComponentProps, RootComponentState> {

  render() {
    const { depositStore, contextStore } = this.props;

    return (
      <div className="Root">
        <Deposits depositStore={depositStore} contextStore={contextStore} />
      </div>
    );
  }
}