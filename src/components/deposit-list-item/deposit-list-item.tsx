import React from 'react';
import './deposit-list-item.scss';

type DepositListItemProps = {
	value: string,
	date: Date,
	status: boolean,
	hash: string,
	changeStatus: any
};
type DepositListItemState = {
	checked: boolean
};

export default class DepositListItem extends React.Component<DepositListItemProps, DepositListItemState> {
	constructor(props) {
		super(props);

		this.state = {
			checked: this.props.status
		};
	}

	onCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			checked: !this.state.checked
		});
		this.props.changeStatus(event, this.props.hash);
	}

	render() {
		return(
			<div className="Deposit-List-Item">
				<div className="Deposit-Check">
					<input type="checkbox" checked={this.state.checked} onChange={this.onCheckChange} />
				</div>
				<div className="Deposit-Value">
					<div className="Value" style={{textDecoration: this.state.checked ? 'line-through' : 'none', textDecorationColor: 'rgba(255,255,255,0.7)'}}>{this.props.value}</div>
					<div className="Date">{this.props.date.toDateString()}</div>
				</div>
			</div>
		);
	}
}
