import React from 'react';
import './context-select.scss';
import { observer } from 'mobx-react';

@observer
export default class ContextSelect extends React.Component<{contextStore: any}, {selectedContext: any, isOpen: boolean, newContextInput: string, error: string}> {
  constructor(props) {
    super(props);
    this.state = {selectedContext: this.props.contextStore.defaultContext, isOpen: false, newContextInput: '', error: ''};
  }

  render() {
    
    return(
      <div className="Context">
        
      </div>
    );
  }
}