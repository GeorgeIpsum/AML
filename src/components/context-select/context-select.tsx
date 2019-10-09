import React from 'react';
import './context-select.scss';
import { observer } from 'mobx-react';
import { PlusCircle } from 'react-feather';

@observer
export default class ContextSelect extends React.Component<{contextStore: any}, {selectedContext: any, isOpen: boolean, newContextInput: string, error: string}> {
  constructor(props) {
    super(props);

    const defaultContext = this.props.contextStore.findById(this.props.contextStore.defaultContext);
    this.state = {
      selectedContext: defaultContext,
      isOpen: false,
      newContextInput: '',
      error: ''
    };
  }

  changeSelectedContext = (event: any) => {
    const id = event.target.id;
    this.setState({selectedContext: this.props.contextStore.findById(id)});
    this.props.contextStore.setDefaultContext(id);
  }

  onFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { newContextInput } = this.state;
    const { contextStore } = this.props;
    if(newContextInput.length !== 0 && !contextStore.findByName(newContextInput)) {
      contextStore.addContext(newContextInput);
    }
  }

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({newContextInput: event.target.value});
  }

  toggleOpen = () => {
    this.setState(state => ({isOpen: !state.isOpen}));
  }

  render() {
    const { isOpen, selectedContext, newContextInput } = this.state;
    const { contextStore } = this.props;
    const contexts = contextStore.contexts.slice().filter((c) => c.id !== selectedContext.id).map(
      (c) => (<div key={c.id} id={c.id} className="context" onClick={this.changeSelectedContext}>{ c.name }</div>)
    );
    const isDisabled = newContextInput.length === 0 || contextStore.findByName(newContextInput);
    return(
      <div className="Context">
        <div className="title">CONTEXT</div>
        <div className="current-context" onClick={this.toggleOpen} style={{borderRadius: isOpen ? '4px 4px 0 0' : ''}}>
          <div className="context">{ selectedContext.name }</div>
          <div className="arrow">
            <div className="arrow-inner"></div>
          </div>
        </div>
        <div className="other-contexts" style={{display: isOpen ? 'block' : 'none'}}>
          { contexts }
          <div className="add-context">
            <form onSubmit={this.onFormSubmit}>
              <label htmlFor="addNewContext">ADD CONTEXT</label>
              <input id="addNewContext" type="text" value={newContextInput} onChange={this.onInputChange} />
              <button type="submit" disabled={isDisabled}>
                <PlusCircle size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}