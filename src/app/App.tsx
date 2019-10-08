import React from 'react';
import './App.scss';
import { RootStore } from '../models/root-store';
import { setupRootStore } from './setup-root-store';
import RootComponent from '../components/root-component';
import { observer } from 'mobx-react';

interface AppState {
  rootStore?: RootStore,
  userState: any,
  themeDark: boolean
}

@observer
export default class App extends React.Component<{}, AppState> {
  
  async componentDidMount() {
    const rootStore = await setupRootStore();
    this.setState({
      userState: {},
      themeDark: true,
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

  changeTheme = () => {
    this.setState({themeDark: !this.state.themeDark});
  }
  
  render() {
    const rootStore = this.state && this.state.rootStore;
    const email = this.state && this.state.userState && this.state.userState.email;

    if(!rootStore) {
      return (
        <div>Initializing...</div>
      );
    }

    const depositStore = rootStore.depositStore;

    return (
      <div className={ this.state.themeDark ? "App Dark" : "App Light" }>
        <div className="App-inner">
          { email ? email : 'Loading...' }
          <RootComponent rootStore={rootStore} depositStore={depositStore} />
        </div>
        <button type="button" className="Button Theme" onClick={this.changeTheme}>Change Theme</button>
      </div>
    );
  }
}