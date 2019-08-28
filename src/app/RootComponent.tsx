import React from 'react';
import { RootStore } from '../models/root-store';
import { DepositStore } from '../models/deposit-list-store';
import { getEnv } from 'mobx-state-tree';

interface RootComponentProps {
  rootStore?: RootStore;
  depositStore?: DepositStore;
}

export default class RootComponent extends React.Component<RootComponentProps, {value: string, test: any}> {
  constructor(props) {
    super(props);

    this.state = {value: "", test: ""};
    this.props.rootStore && this.props.rootStore.environment.api.auth.onAuthStateChanged(user => {
      if(user) {
        console.log(RootComponent.name, user.email);
      }
    })
  }

  someClick = () => {
    if(this.props.rootStore) {
      let a = this.props.rootStore.signIn('test@test.test', 'testerino');
      a.then((val) => this.setState({test: val.user.email}), (err) => console.log(err));
    }
  }
  someClickSecond = () => {
    this.props.depositStore && this.props.depositStore.environment.api.signOutUser().then((val) => console.log(val), (err) => console.log(err));
  }
  whatever = () => {
    this.props.rootStore && this.setState({value: getEnv(this.props.rootStore)});
    this.props.rootStore && console.log(this.props.rootStore.environment);
  }

  render() {
    const val = typeof this.state.value === 'string' ? this.state.value : JSON.stringify(this.state.value);
    return (
      <div style={{fontSize: 16}}>
        <button onClick={this.someClick} style={{height: 40, width: 40}}>test</button>
        <button onClick={this.someClickSecond} style={{height: 40, width: 40}}>logt</button>
        <button onClick={this.whatever} style={{height: 40, width: 40}}>wha</button>
        { val ? val : "" }
        { this.state.test }
      </div>
    )  
  }
}