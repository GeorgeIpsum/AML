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

  toggleOpen = () => {
    this.setState(state => ({isOpen: !state.isOpen}));
  }

  render() {
    const { isOpen, selectedContext } = this.state;
    return(
      <div className="Context">
        <div className="current-context" onClick={this.toggleOpen} style={{borderRadius: isOpen ? '4px 4px 0' : ''}}>
          <div className="context">{ selectedContext.name }</div>
          <div className="arrow">
            <div className="arrow-inner"></div>
          </div>
        </div>
        <div className="title">context</div>
        <div className="other-contexts" style={{display: isOpen ? 'block' : 'none'}}>
          <PlusCircle size={16} />
        </div>
      </div>
    );
  }
}