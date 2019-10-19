import React from 'react';
import ReactDOM from 'react-dom';
import { setupRootStore } from '../../utilities/setup-root-store';
import ItemSelect from './item-select';

const addItem = () => {
  return true;
}

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const rootStore = await setupRootStore(false);
  ReactDOM.render(<ItemSelect id="DEFAULT" store={rootStore.contextStore} canBeNull={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
