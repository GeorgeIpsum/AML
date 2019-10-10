import React from 'react';
import ReactDOM from 'react-dom';
import RootComponent from './root-component';
import { setupRootStore } from '../../utilities/setup-root-store';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const rootStore = await setupRootStore(false);
  ReactDOM.render(<RootComponent rootStore={rootStore} depositStore={rootStore.depositStore} contextStore={rootStore.contextStore} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
