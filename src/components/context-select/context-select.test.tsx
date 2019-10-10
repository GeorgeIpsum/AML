import React from 'react';
import ReactDOM from 'react-dom';
import ContextSelect from './context-select';
import { setupRootStore } from '../../utilities/setup-root-store';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const rootStore = await setupRootStore(false);
  ReactDOM.render(<ContextSelect store={rootStore.contextStore} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
