import React from 'react';
import ReactDOM from 'react-dom';
import DepositListItem from './deposit-list-item';
import { setupRootStore } from '../../utilities/setup-root-store';

const value = 'deposit list item value';
const date = new Date();
const status = false;
const changeStatus = () => console.log('it works');

it('renders without crashing', async () => {
	const div = document.createElement('div');
	const rootStore = await setupRootStore(false);
	ReactDOM.render(<DepositListItem value={value} date={date} status={status} changeStatus={changeStatus} context={rootStore.contextStore} depositId={rootStore.depositStore.deposits[0].id} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
