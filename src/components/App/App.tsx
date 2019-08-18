import React from 'react';
import './App.scss';
import InParent from '../In';

type AppProps = {};
type AppState = {
  value: string,
};

export default class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);

    this.state = {value: ''};
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-inner">
          <InParent />
        </div>
      </div>
    );
  }
}