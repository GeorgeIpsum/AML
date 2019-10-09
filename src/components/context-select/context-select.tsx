import React from 'react';
import './context-select.scss';
import { observer } from 'mobx-react';

@observer
export default class ContextSelect extends React.Component<{contexts: any, addContext: any}, {selected: any, add: boolean}> {
  constructor(props) {
    super(props);
    this.state = {selected: '', add: false};
  }

  onContextChange = (event) => {
    this.setState({selected: event.target.value});
    if(!this.findByName(event.target.value)) {
      this.setState({add: true});
    } else {
      this.setState({add: false});
    }
  }

  findByName = (name: string) => {
    if(this.props.contexts) {
      const value = this.props.contexts.find((c) => c.name === name);
      if(value) {
        return value;
      } return false;
    } return false;
  }

  render() {
    const contexts = this.props && this.props.contexts && this.props.contexts.slice().map((c) => (<option key={c.id} value={c.name}/>));
    return(
      <div className="Context">
        <input placeholder="Context" type="text" list="context" onChange={this.onContextChange} className="Context-Select" />
        <datalist id="context">
          {contexts}
        </datalist>
        <div className="add" onClick={this.props.addContext(this.state.selected)}>
          { this.state.add ? 'Add Context' : '' }
        </div>
      </div>
    );
  }
}