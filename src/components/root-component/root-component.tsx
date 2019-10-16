import React from 'react';
import { RootStore } from '../../models/root-store';
import { DepositStore } from '../../models/deposit-list-store';
import { ContextStore } from '../../models/context';
import { observer } from 'mobx-react';
import './root-component.scss';
import Dashboard from '../../segments/dashboard';
import Deposits from '../../segments/deposits';
import Projects from '../../segments/projects';
import Stats from '../../segments/stats';
import Options from '../../segments/options';

interface RootComponentProps {
  rootStore: RootStore;
  depositStore: DepositStore;
  contextStore: ContextStore;
  currentRoute: string;
}

interface RootComponentState {
}

@observer
export default class RootComponent extends React.Component<RootComponentProps, RootComponentState> {

  render() {
    const { depositStore, contextStore, currentRoute } = this.props;
    let navItem;
    switch(currentRoute) {
      case "dashboard":
        navItem = (<Dashboard />);
        break;
      case "deposits":
        navItem = (<Deposits depositStore={depositStore} contextStore={contextStore} />);
        break;
      case "projects":
        navItem = (<Projects />);
        break;
      case "stats":
        navItem = (<Stats />);
        break;
      case "options":
        navItem = (<Options />);
        break;
      default:
        navItem = (<Deposits depositStore={depositStore} contextStore={contextStore} />);
        break;
    }

    return (
      <div className="Root">
        <div className="displayed-segment">
          { navItem }
        </div>
      </div>
    );
  }
}
