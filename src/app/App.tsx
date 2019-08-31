import React from 'react';
import './App.scss';
import { RootStore } from '../models/root-store';
import { setupRootStore } from './setup-root-store';
import RootComponent from '../components/root-component';
import { observer } from 'mobx-react';

interface AppState {
  rootStore?: RootStore,
  userState: any
}

@observer
export default class App extends React.Component<{}, AppState> {
  
  async componentDidMount() {
    const rootStore = await setupRootStore();
    this.setState({
      userState: {},
      rootStore
    });
    rootStore.environment.api.auth.onAuthStateChanged(this.authStateChange, this.authStateChangeError);
  }

  authStateChange = (val) => {
    if(val && val.email) {
      val.email && console.log('root store', val.email);
      this.setState({
        userState: {
          email: val.email
        }
      });
    } else {
      this.setState({
        userState: {
          email: "not logged in"
        }
      });
    }
  }

  authStateChangeError = (error) => {
    console.log(error);
  }
  
  render() {
    const rootStore = this.state && this.state.rootStore;
    const email = this.state && this.state.userState && this.state.userState.email;

    if(!rootStore) {
      return (
        <div>test</div>
      );
    }

    const depositStore = rootStore.depositStore;

    return (
      <div className="App">
        <div className="App-inner">
          { email ? email : 'Loading...' }
          <RootComponent rootStore={rootStore} depositStore={depositStore} />
        </div>
      </div>
    );
  }
}