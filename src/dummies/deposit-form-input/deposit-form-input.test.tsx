import React from 'react';
import ReactDOM from 'react-dom';
import DepositFormInput from './deposit-form-input';

const genericEventHandler = (event: any) => {
  console.log(event);
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DepositFormInput className="deposit-form-form" formInput="test" placeholder="What's cookin" onSubmit={genericEventHandler} onInputChange={genericEventHandler} onInputClear={genericEventHandler} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
