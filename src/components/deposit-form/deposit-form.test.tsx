import React from 'react';
import ReactDOM from 'react-dom';
import DepositForm from './deposit-form';

const onClear = () => {
  console.log('onClear()', 'Works!');
}
 
const onSubmit = () => {
  console.log('onSubmit()', 'Works!');
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DepositForm onClear={onClear} onSubmit={onSubmit} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
