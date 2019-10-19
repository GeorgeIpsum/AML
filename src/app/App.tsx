import React from 'react';
import './App.scss';
import { RootStore } from '../models/root-store';
import { setupRootStore } from '../utilities/setup-root-store';
import RootComponent from '../components/root-component';
import { observer } from 'mobx-react';
import Nav from '../segments/nav';
import { Grid, CheckCircle, Layers, PieChart, Settings } from 'react-feather';
import Button from '../dummies/button';

interface AppProps {
  useFirebase?: boolean;
}

interface AppState {
  rootStore?: RootStore;
  userState: any;
}

@observer
export default class App extends React.Component<AppProps, AppState> {
  navItems: any;
  unsubscribeFromAuthStateChanges: firebase.Unsubscribe;
  _isMounted: boolean = false;

  async componentDidMount() {
    this._isMounted = true;
    this.navItems = [
      {
        name: "dashboard",
        icon: (<Grid size={24} />)
      }, {
        name: "deposits",
        icon: (<CheckCircle size={24} />)
      }, {
        name: "projects",
        icon: (<Layers size={24} />)
      }, {
        name: "stats",
        icon: (<PieChart size={24} />)
      }, {
        name: "options",
        icon: (<Settings size={24} />)
      }
    ];

    const rootStore = await setupRootStore(this.props.useFirebase);

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
    this.state.rootStore && this.state.rootStore.changeTheme();
  }

  onSegmentChange = (segment: string) => {
    this.state.rootStore && this.state.rootStore.setCurrentRoute(segment);
  }
  
  render() {
    const rootStore = this.state && this.state.rootStore;

    if(!rootStore) {
      return (
        <div data-testid="init" style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center', fontWeight: 'bold'}}>Initializing...</div>
      );
    }

    return (
      <div data-testid="init" className={ rootStore.isDarkTheme ? "App Dark" : "App Light" }>
        <Nav onSegmentChange={this.onSegmentChange} initialNavState={rootStore.currentRoute} navItems={this.navItems} />
        <div data-testid="init-inner" className="App-inner">
          <RootComponent currentRoute={rootStore.currentRoute} rootStore={rootStore} />
        </div>
        <Button variant="theme" style={{position: 'fixed', bottom: '1rem', right: '1rem', padding: '0.6rem'}} onClick={this.changeTheme}>Change Theme</Button>
      </div>
    );
  }
}
