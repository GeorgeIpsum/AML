import React from 'react';
import ReactDOM from 'react-dom';
import InList from './InList';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<InList />, div);
	ReactDOM.unmountComponentAtNode(div);
});
