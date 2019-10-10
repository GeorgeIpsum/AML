import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  await ReactDOM.render(<App />, div);
  //we do this as a cheap hack to ensure the async setupRootStore in the mount lifecycle finishes executing
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(div);
  }, 5000);
});
