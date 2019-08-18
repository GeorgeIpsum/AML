import React from 'react';
import { chooseRandomItem } from '../../../utilities/helpers';
import './InInput.scss';

type InInputProps = {};
type InInputState = {
	value: string,
};

const placeholderTexts = [
	"What's on your mind?",
	"What needs processing?",
	"What's happening?",
	"What's crackalackin?",
	"What's up?",
];

export default class InInput extends React.Component<InInputProps, InInputState> {
	constructor(props) {
		super(props);

		this.state = {value: ''};
		this.onInputEdit = this.onInputEdit.bind(this);
	}

	onInputEdit(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({value: e.target.value});
	}

	render() {
		return(
			<div className="InInput">
				<input value={this.state.value} className="InInput-text" placeholder={chooseRandomItem(placeholderTexts)} onChange={this.onInputEdit} />
				<div className="InInput-below">
					{this.state.value === '' ? "" : "You said: " + this.state.value }
				</div>
			</div>
		);
	}
}
