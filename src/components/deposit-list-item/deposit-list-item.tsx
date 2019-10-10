import React from 'react';
import './deposit-list-item.scss';

type DepositListItemProps = {
	value: string,
	date: Date,
	status: boolean,
	changeStatus: any,
	context: any,
	depositId: string
};
type DepositListItemState = {
	checked: boolean
};

export default class DepositListItem extends React.Component<DepositListItemProps, DepositListItemState> {
	constructor(props) {
		super(props);

		this.state = { checked: props.status };
	}

	onCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			checked: !this.state.checked
		});
		this.props.changeStatus(event, this.props.depositId);
	}

	render() {
		const { value, date, context } = this.props;
		const { checked } = this.state;
		return(
			<div className="Deposit-List-Item">
				<div className="Deposit-Check">
					<input type="checkbox" checked={checked} onChange={this.onCheckChange} />
				</div>
				<div className="Deposit-Value">
					<div className="Value" style={{textDecoration: checked ? 'line-through' : 'none'}}>{value}</div>
					<div className="subitems">
						<div className="Context">{ context.name }</div>
						<div className="Date">{ date.toDateString() }</div>
					</div>
				</div>
			</div>
		);
	}
}
