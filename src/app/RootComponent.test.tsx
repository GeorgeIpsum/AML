import React from 'react';
import ReactDOM from 'react-dom';
import RootComponent from './RootComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RootComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
