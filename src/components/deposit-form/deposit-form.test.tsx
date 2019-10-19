import React from 'react';
import ReactDOM from 'react-dom';
import DepositForm from './deposit-form';
import { setupRootStore } from '../../utilities/setup-root-store';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const rootStore = await setupRootStore(false);
  ReactDOM.render(<DepositForm store={rootStore.depositStore} context={rootStore.contextStore} project={rootStore.projectStore} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
