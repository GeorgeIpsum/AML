import React from 'react';
import './projects.scss';
import { observer } from 'mobx-react';
import { RootStore } from '../../models/root-store';
import ProjectListItem from '../../dummies/project-list-item';
import { DepositStatus } from '../../models/deposit';

interface ProjectsProps {
  stores: RootStore;
}

interface ProjectsState {
  filters?: any;
}

@observer
export default class Projects extends React.Component<ProjectsProps, ProjectsState> {

  handleCallback = (event: any) => {
    if(event.type === 'deposit_change' && event.id) {
      const depositIndex = this.props.stores.depositStore.deposits.findIndex((d) => d.id === event.id);
      this.props.stores.depositStore.changeDeposit(depositIndex, {value: '', status: this.props.stores.depositStore.deposits[depositIndex].status === DepositStatus.unprocessed ? DepositStatus.actedUpon : DepositStatus.unprocessed});
    }
  }

  render() {
    const { stores } = this.props;
    const projects = stores.projectStore.projects.slice().map((p) => {
      const props = {
        project: p,
        onGenericCallback: this.handleCallback
      };
      return <ProjectListItem key={p.id} {...props} />
    });

    return(
      <div className="Projects">
        { projects }
      </div>
    );
  }
}
