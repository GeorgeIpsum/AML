import React from 'react';
import ReactDOM from 'react-dom';
import Projects from './projects';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Projects />, div);
  ReactDOM.unmountComponentAtNode(div);
});

