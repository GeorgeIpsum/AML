import React from 'react';
import { RootStore } from '../models/root-store';
import { DepositStore } from '../models/deposit-list-store';

interface RootComponentProps {
  rootStore?: RootStore;
  depositStore?: DepositStore;
}

export default class RootComponent extends React.Component<RootComponentProps, {value: string}> {
  constructor(props) {
    super(props);

    this.state = {value: ""};
  }
  someClick = () => {
    this.props.depositStore && this.props.depositStore.environment.api.createUser("test@test.test", "testerino");
  }
  someClickSecond = () => {
    this.props.depositStore && this.props.depositStore.environment.api.signOutUser().then((val) => console.log(val), (err) => console.log(err));
  }

  render() {
    const val = this.state.value;
    return (
      <div>
        <button onClick={this.someClick} style={{height: 40, width: 40}}>test</button>
        { val ? val : "" }
        <button onClick={this.someClickSecond} style={{height: 40, width: 40}}>logt</button>
      </div>
    )  
  }
}