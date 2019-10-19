import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectListItem from './project-list-item';
import { ProjectModel } from '../../models/project';
import { DepositStatus } from '../../models/deposit';
import { setupRootStore } from '../../utilities/setup-root-store';

const handleCallback = (event) => {
  const project = projectStore.findByName('New Project');
  const deposit = project.deposits[0];
  deposit.setStatus(DepositStatus.actedUpon);
}

let rootStore;
let projectStore;
let depositStore;

beforeAll(async () => {
  rootStore = await setupRootStore(false);
  projectStore = rootStore.projectStore;
  depositStore = rootStore.depositStore;
});

describe("ProjectListItem", () => {
  it('renders and unmounts without crashing', () => {
    const project = ProjectModel.create();
    const { unmount } = render(<ProjectListItem project={project} onGenericCallback={handleCallback} />);
    unmount();
  });

  it('properly parses project deposits', () => {
    projectStore.addProject('New Project');
    const project = projectStore.findByName('New Project');
    depositStore.addDeposit({value: 'test', status: DepositStatus.unprocessed, context: '', project: project.id});

    const toUse = project;
    const { unmount, getByTestId } = render(<ProjectListItem project={toUse} onGenericCallback={handleCallback} />);

    expect(getByTestId('check-test')).toBeDefined();

    depositStore.setDeposits();
    projectStore.setProjects();

    unmount();
  });

  
  it('handles the callback', async () => {
    projectStore.addProject('New Project');
    const project = projectStore.findByName('New Project');
    depositStore.addDeposit({value: 'test', status: DepositStatus.unprocessed, context: '', project: project.id});

    const toUse = projectStore.findById(project.id);
    const { unmount, getByTestId } = render(<ProjectListItem project={toUse} onGenericCallback={handleCallback} />);
    const check = getByTestId('check-test');

    fireEvent.change(check, {target: {value: true}});

    await wait(() => expect(check).toBeEnabled())

    depositStore.setDeposits();
    projectStore.setProjects();

    unmount();
  });
});
