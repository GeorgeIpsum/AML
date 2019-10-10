import React from 'react';
import ReactDOM from 'react-dom';
import Deposits from './deposits';
import { setupRootStore } from '../../utilities/setup-root-store';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const rootStore = await setupRootStore(false);
  ReactDOM.render(<Deposits depositStore={rootStore.depositStore} contextStore={rootStore.contextStore} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
