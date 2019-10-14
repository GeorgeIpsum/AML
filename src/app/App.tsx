import React from 'react';
import './App.scss';
import Button from '../dummies/button';
import { RootStore } from '../models/root-store';
import { setupRootStore } from '../utilities/setup-root-store';
import RootComponent from '../components/root-component';
import { observer } from 'mobx-react';

interface AppState {
  rootStore?: RootStore,
  userState: any,
}

@observer
export default class App extends React.Component<{}, AppState> {
  unsubscribeFromAuthStateChanges;
  _isMounted = false;

  async componentDidMount() {
    this._isMounted = true;
    const rootStore = await setupRootStore(false);
    if(this._isMounted) {
      this.setState({
        userState: {},
        rootStore
      });
    }
    if(rootStore.environment.api.auth) {
      this.unsubscribeFromAuthStateChanges = rootStore.environment.api.auth.onAuthStateChanged(this.authStateChange, this.authStateChangeError);
    }
  }

  componentWillUnmount() {
    if(this.unsubscribeFromAuthStateChanges) {
      this.unsubscribeFromAuthStateChanges();
    }
    this._isMounted = false;
  }

  authStateChange = (val) => {
    if(val && val.email && this._isMounted) {
      this.setState({
        userState: {
          email: val.email
        }
      });
    } else if(this._isMounted) {
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
    console.log(this.state);
    this.state.rootStore && this.state.rootStore.changeTheme();
  }
  
  render() {
    const rootStore = this.state && this.state.rootStore;

    if(!rootStore) {
      return (
        <div>Initializing...</div>
      );
    }

    const depositStore = rootStore.depositStore;
    const contextStore = rootStore.contextStore;

    return (
      <div className={ rootStore.isDarkTheme ? "App Dark" : "App Light" }>
        <div className="App-inner">
          <RootComponent rootStore={rootStore} depositStore={depositStore} contextStore={contextStore} />
        </div>
        <Button variant="theme" style={{position: 'fixed', bottom: '1rem', right: '1rem', padding: '0.6rem'}} onClick={this.changeTheme}>Change Theme</Button>
      </div>
    );
  }
}