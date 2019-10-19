import React from 'react';
import { RootStore } from '../../models/root-store';

import { observer } from 'mobx-react';
import './root-component.scss';
import Dashboard from '../../segments/dashboard';
import Deposits from '../../segments/deposits';
import Projects from '../../segments/projects';
import Stats from '../../segments/stats';
import Options from '../../segments/options';

interface RootComponentProps {
  rootStore: RootStore;
  currentRoute: string;
}

interface RootComponentState {
}

@observer
export default class RootComponent extends React.Component<RootComponentProps, RootComponentState> {

  render() {
    const { rootStore, currentRoute } = this.props;
    const depositStore = rootStore.depositStore;
    const contextStore = rootStore.contextStore;
    const projectStore = rootStore.projectStore;
    let navItem;
    switch(currentRoute) {
      case "dashboard":
        navItem = (<Dashboard />);
        break;
      case "deposits":
        navItem = (<Deposits depositStore={depositStore} contextStore={contextStore} projectStore={projectStore} />);
        break;
      case "projects":
        navItem = (<Projects stores={rootStore} />);
        break;
      case "stats":
        navItem = (<Stats />);
        break;
      case "options":
        navItem = (<Options />);
        break;
      default:
        navItem = (<Deposits depositStore={depositStore} contextStore={contextStore} projectStore={projectStore} />);
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
