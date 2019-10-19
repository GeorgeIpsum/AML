import React from 'react';
import ReactDOM from 'react-dom';
import ProjectListItem from './project-list-item';
import { ProjectModel } from '../../models/project';

const handleCallback = () => {
  return true;
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  const project = ProjectModel.create();
  ReactDOM.render(<ProjectListItem project={project} onGenericCallback={handleCallback} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
