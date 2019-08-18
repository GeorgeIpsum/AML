import React from 'react';
import ReactDOM from 'react-dom';
import InParent from './InParent';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<InParent />, div);
	ReactDOM.unmountComponentAtNode(div);
});
