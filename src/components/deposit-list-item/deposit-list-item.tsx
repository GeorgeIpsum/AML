import React from 'react';
import './deposit-list-item.scss';

type DepositListItemProps = {
	value: string,
	date: Date,
	status: boolean,
	changeStatus: any,
	context: any,
	project: any,
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
		const { value, date, context, project, status } = this.props;
		return(
			<div className="Deposit-List-Item">
				<div className="deposit-check">
					<input type="checkbox" checked={status} onChange={this.onCheckChange} />
				</div>
				<div className="deposit-value">
					<div className="value" style={{textDecoration: status ? 'line-through' : 'none'}}>{value}</div>
					<div className="subitems">
						<div className="context">{ context.name }</div>
						{ project ? (<div className="project">PROJECT: { project.name }</div>) : null }
						<div className="date">{ date.toDateString() }</div>
					</div>
				</div>
			</div>
		);
	}
}
