import React from 'react';
import ReactDOM from 'react-dom';
import DepositListItem from './deposit-list-item';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<DepositListItem />, div);
	ReactDOM.unmountComponentAtNode(div);
});
