import React from 'react';
import './item-select.scss';
import { observer } from 'mobx-react';
import { PlusCircle } from 'react-feather';

interface ItemSelectProps {
  id: string;
  store: any;
  canBeNull: boolean;
};

interface ItemSelectState {
  selectedItem: any;
  isOpen: boolean;
  newItemInput: string;
  error: string;
};

@observer
export default class ItemSelect extends React.Component<ItemSelectProps, ItemSelectState> {
  constructor(props) {
    super(props);

    const defaultItem = this.props.store.findById(this.props.store.defaultItem);

    this.state = {
      selectedItem: defaultItem ? defaultItem : {name: '(none)', id: this.props.id+'_SELECT_NO_DEFAULT'},
      isOpen: false,
      newItemInput: '',
      error: ''
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.globalToggleOpen, true);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.globalToggleOpen, true);
  }

  changeSelectedItem = (event: any) => {
    const id = event.target.id;
    const item = this.props.store.findById(id);
    this.setState({ selectedItem: item ? item : {name: '(none)', id: this.props.id+'_SELECT_NO_DEFAULT'} });
    this.props.store.setDefaultItem(id);
  }

  onFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { newItemInput } = this.state;
    const { store } = this.props;
    if(newItemInput.length !== 0 && !store.findByName(newItemInput)) {
      store.addItem(newItemInput);
      this.setState({ newItemInput: '' });
    }
  }

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newItemInput: event.target.value });
  }

  toggleOpen = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  globalToggleOpen = (event) => {
    const ref = document.getElementById(this.props.id + '_Item_Select');
    if(ref && event.target.id !== ref && !ref.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    const { isOpen, selectedItem, newItemInput } = this.state;
    const { store, id, canBeNull } = this.props;
    const itemSelectId = id + '_Item_Select';
    const itemInputId = id + '_Input_Item_Select';

    const items = store.items.slice().filter((c) => c.id !== selectedItem.id).map(
      (c) => (<div key={c.id} id={c.id} className="item" onClick={this.changeSelectedItem}>{ c.name }</div>)
    );

    const isDisabled = newItemInput.length === 0 || store.findByName(newItemInput);

    return(
      <div id={ itemSelectId } className="Item-Select">
        <div className="title"> { id.toUpperCase() } </div>
        <div className="current-item" onClick={this.toggleOpen} style={{borderRadius: isOpen ? '4px 4px 0 0' : ''}}>
          <div className="item">{ selectedItem.name }</div>
          <div className="arrow">
            <div className="arrow-inner"></div>
          </div>
        </div>
        <div className="other-items" style={{display: isOpen ? 'block' : 'none'}}>
          { items }
    { canBeNull && selectedItem.id!==id+'_SELECT_NO_DEFAULT' ? (<div id={id+'_SELECT_NO_DEFAULT'} className="item item-none" onClick={this.changeSelectedItem}>No Project</div>) : null }
          <div className="add-item">
            <form onSubmit={this.onFormSubmit}>
    <label htmlFor={itemInputId}>ADD { id.toUpperCase() }</label>
              <input id={itemInputId} type="text" value={newItemInput} onChange={this.onInputChange} />
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
