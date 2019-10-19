import React from 'react';
import ReactDOM from 'react-dom';
import Projects from './projects';
import { setupRootStore } from '../../utilities/setup-root-store';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const rootStore = await setupRootStore(false);
  ReactDOM.render(<Projects stores={rootStore} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
