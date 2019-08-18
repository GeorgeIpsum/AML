import React from 'react';
import InInput from './InInput';
import InList from './InList';
import './InParent.scss';

type InParentProps = {};
type InParentState = {
	value: string,
	inList: any[],
};

export default class InParent extends React.Component<InParentProps, InParentState> {
	constructor(props) {
		super(props);
		this.state = {value: '', inList: []};
		
		this.onInInput = this.onInInput.bind(this);
	}

	onInInput(value) {
		let inList = this.state.inList;
		inList.push(value);
		this.setState({inList: inList});
	}

	render() {
		return(
			<div className="InParent">
				<InInput submit={this.onInInput} />
				<InList inList={this.state.inList} />
			</div>
		);
	}
}
