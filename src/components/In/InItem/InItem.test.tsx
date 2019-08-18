import React from 'react';
import ReactDOM from 'react-dom';
import InItem from './InItem';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<InItem />, div);
	ReactDOM.unmountComponentAtNode(div);
});
