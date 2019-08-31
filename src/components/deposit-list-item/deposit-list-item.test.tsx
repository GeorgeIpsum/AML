import React from 'react';
import ReactDOM from 'react-dom';
import DepositListItem from './deposit-list-item';
import { DepositStatus } from '../../models/deposit';

const value = 'deposit list item value';
const date = new Date();
const status = DepositStatus.unprocessed;

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<DepositListItem value={value} date={date} status={status} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
