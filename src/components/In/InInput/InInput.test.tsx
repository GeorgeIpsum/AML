import React from 'react';
import ReactDOM from 'react-dom';
import InInput from './InInput';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<InInput />, div);
	ReactDOM.unmountComponentAtNode(div);
});
