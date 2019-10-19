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

export default function DepositListItem(props: DepositListItemProps) {
	const onCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.changeStatus(event, props.depositId);
	}

	const { value, date, context, project, status } = props;

	return(
		<div className="Deposit-List-Item">
			<div className="deposit-check">
				<input type="checkbox" checked={status} onChange={onCheckChange} />
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
