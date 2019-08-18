import React from 'react';
import { chooseRandomItem } from '../../../utilities/helpers';
import './InInput.scss';

type InInputProps = {
	submit?: any,
};
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
		this.onSubmit = this.onSubmit.bind(this);
		this.onSubmitButton = this.onSubmitButton.bind(this);
	}

	onInputEdit(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({value: e.target.value});
	}

	onSubmit(e: React.KeyboardEvent) {
		if(e.keyCode === 13 && this.state.value !== '') {
			this.setState({value: ''});
			this.props.submit(this.state.value);
		}
	}

	onSubmitButton(e: React.MouseEvent) {
		if(this.state.value !== '') {
			this.setState({value: ''});
			this.props.submit(this.state.value);
		}
	}

	render() {
		return(
			<div className="InInput">
				<input value={this.state.value} className="InInput-text" placeholder={chooseRandomItem(placeholderTexts)} onChange={this.onInputEdit} onKeyDown={this.onSubmit} />
				<button className="InInput-button" onClick={this.onSubmitButton} />
				<div className="InInput-below">
					{this.state.value === '' ? "" : "You said: " + this.state.value }
				</div>
			</div>
		);
	}
}
