import React from 'react';
import './project-list-item.scss';
import { DepositStatus } from '../../models/deposit';
import { Project } from '../../models/project';
import DepositListItem from '../../components/deposit-list-item';
import { observer } from 'mobx-react';

interface ProjectListItemProps {
  project: Project;
  onGenericCallback: Function;
}

function ProjectListItem(props: ProjectListItemProps) {
  const changeStatus = (event: any, depositId: string) => {
    const e = {
      type: 'deposit_change',
      event: event,
      id: depositId,
    };
    props.onGenericCallback(e);
  }

  const deposits = props.project.deposits.slice().map((d) => {
    const depositProps = {
      depositId: d.id,
      value: d.value,
      status: d.status !== DepositStatus.unprocessed,
      date: d.dateAdded,
      changeStatus: changeStatus,
      context: props.project.rootStore.contextStore.findById(d.contextId),
      project: props.project
    };
    return (<DepositListItem key={d.id} {...depositProps} />)
  });

  return(
    <div className="Project-List-Item">
      <div className="title">{ props.project.name }</div>
      <div className="deposit-list">
        { deposits }
      </div>
    </div>
  );
}

export default observer(ProjectListItem);
