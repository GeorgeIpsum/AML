import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DepositFormInput from './deposit-form-input';

const genericEventHandler = (event: any) => {
  console.log(event);
}

describe("DepositFormInput", () => {
  it('renders and unmounts without crashing', () => {
    const { unmount } = render(<DepositFormInput className="test" formInput="value" placeholder="what's up doc" onSubmit={() => genericEventHandler} onInputChange={() => genericEventHandler} onInputClear={genericEventHandler} />);


    unmount();
  });

  it('fires generic callback', async () => {
    const { unmount, getByTestId } = render(<DepositFormInput className="test" formInput="value" placeholder="what's up doc" onSubmit={() => genericEventHandler} onInputChange={() => genericEventHandler} onInputClear={genericEventHandler} />);
    const input = getByTestId('test-test');

    fireEvent.focus(input);
    fireEvent.change(input, {target: {value: 't'}});

    unmount();
  });
});
