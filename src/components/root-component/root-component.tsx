import React from 'react';
import { RootStore } from '../../models/root-store';
import { DepositStore } from '../../models/deposit-list-store';
import { ContextStore } from '../../models/context';
import { observer } from 'mobx-react';
import './root-component.scss';
import Deposits from '../../segments/deposits';
import Nav from '../../segments/nav';
import Options from '../../segments/options';
import { Edit, Settings } from 'react-feather';

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
  navItems: any;
  constructor(props) {
    super(props);

    this.state = { currentNav: 'Deposits' };
    this.navItems = [
      {
        name: "Deposits",
        icon: (<Edit size={20} />)
      }, {
        name: "Options",
        icon: (<Settings size={20} />)
      }
    ];
  }

  onSegmentChange = (segment: string) => {
    this.setState({ currentNav: segment });
  }

  render() {
    const { depositStore, contextStore } = this.props;
    const { currentNav } = this.state;
    let navItem;
    switch(currentNav) {
      case "Deposits":
        navItem = (<Deposits depositStore={depositStore} contextStore={contextStore} />);
        break;
      case "Options":
        navItem = (<Options />);
        break;
      default:
        navItem = (<Deposits depositStore={depositStore} contextStore={contextStore} />);
        break;
    }

    return (
      <div className="Root">
        <Nav onSegmentChange={this.onSegmentChange} initialNavState={'Deposits'} navItems={this.navItems} />
        <div className="displayed-segment">
          { navItem }
        </div>
      </div>
    );
  }
}