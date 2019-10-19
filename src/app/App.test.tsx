import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe("App", () => {
  it('renders and unmounts without crashing', () => {
    const { getByTestId, unmount } = render(<App />);
    expect(getByTestId('init')).toHaveTextContent(/Initializing/);
    unmount();
  });

  it('mounts with rootStore, renders, and unmounts without crashing', async () => {
    const { getByTestId, unmount } = render(<App />);
    await wait(() => getByTestId('init-inner'));
    expect(getByTestId('init')).toHaveClass('App');
    unmount();
  });

  it('properly changes theme', async () => {
    const { getByTestId, getByText, unmount } = render(<App />);
    await wait(() => getByTestId('init-inner'));

    expect(getByTestId('init')).toHaveClass('Dark');

    fireEvent.click(getByText('Change Theme'));

    expect(getByTestId('init')).toHaveClass('Light');

    unmount();
  });

  it('properly changes segment', async () => {
    const { getByTestId, unmount } = render(<App />);
    await wait(() => getByTestId('init-inner'));

    expect(getByTestId('root-segment')).toHaveTextContent(/Soon/);

    fireEvent.click(getByTestId('stats-test-nav'));

    expect(getByTestId('root-segment')).toHaveTextContent(/Stats/);

    unmount();
  });

  it('properly initializes firebase API', async () => {
    const { getByTestId, unmount } = render(<App useFirebase={true} />);
    await wait(() => getByTestId('init-inner'));
    unmount();
  });
});
