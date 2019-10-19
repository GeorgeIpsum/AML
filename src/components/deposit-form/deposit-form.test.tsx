import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DepositForm from './deposit-form';
import { setupRootStore } from '../../utilities/setup-root-store';

let rootStore;
let depositStore, contextStore, projectStore;
let component;

beforeAll(async () => {
  rootStore = await setupRootStore(false);
  depositStore = rootStore.depositStore;
  contextStore = rootStore.contextStore;
  projectStore = rootStore.projectStore;
  component = (<DepositForm store={depositStore} context={contextStore} project={projectStore} />);
});

describe("DepositForm", () => {
  it('renders and unmounts without crashing', () => {
    const { unmount } = render(component);
    unmount();
  });

  it('properly captures input', async () => {
    const { getByTestId, getByDisplayValue, unmount } = render(component);
    const input = getByTestId('deposit-form-form-test');

    fireEvent.focus(input);
    fireEvent.change(input, {target: {value: 't'}});

    await wait(() => getByDisplayValue('t'));
    await wait(() => expect(depositStore.currentlyTyping).toEqual('t'));

    unmount();
  });

  it('properly clears input', async () => {
    const { getByTestId, getByDisplayValue, unmount } = render(component);
    const input = getByTestId('deposit-form-form-test');

    fireEvent.focus(input);
    fireEvent.change(input, {target: {value: 't'}});

    await wait(() => getByDisplayValue('t'));

    const clear = getByTestId('deposit-form-form-clear-test');
    fireEvent.click(clear);

    await wait(() => expect(input).toHaveValue(''));
    await wait(() => expect(depositStore.currentlyTyping).toEqual(''));

    unmount();
  });

  it('properly validates and submits form', async () => {
    const { getByTestId, getByDisplayValue, unmount } = render(component);
    const input = getByTestId('deposit-form-form-test');
    const submit = getByTestId('deposit-form-form-submit-test');

    expect(submit).toHaveAttribute('disabled');

    fireEvent.focus(input);
    fireEvent.change(input, {target: {value: 'new deposit'}});

    await wait(() => getByDisplayValue('new deposit'));

    fireEvent.click(submit);

    await wait(() => expect(depositStore.deposits.length).toBeGreaterThan(1));

    unmount();
  });
});
