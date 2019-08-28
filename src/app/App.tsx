import React from 'react';
import './App.scss';
import { RootStore } from '../models/root-store';
import { setupRootStore } from './setup-root-store';
import RootComponent from './RootComponent';

interface AppState {
  rootStore?: RootStore
}

export default class App extends React.Component<{}, AppState> {
  
  async componentDidMount() {
    this.setState({
      rootStore: await setupRootStore()
    });
  }
  
  render() {
    const rootStore = this.state && this.state.rootStore;

    if(!rootStore) {
      return (
        <div>test</div>
      );
    }

    const depositStore = rootStore.depositStore;

    return (
      <div className="App">
        <div className="App-inner">
          <RootComponent rootStore={rootStore} depositStore={depositStore} />
        </div>
      </div>
    );
  }
}