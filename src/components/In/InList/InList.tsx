import React from 'react';
import './InList.scss';

type InListProps = {
	inList: any[]
};
type InListState = {
	inList: any[]
};

export default class InList extends React.Component<InListProps, InListState> {
	constructor(props) {
		super(props);

		this.state = {inList: this.props.inList};
	}

	componentDidUpdate(prevProps: InListProps) {
		if(this.props.inList.length !== prevProps.inList.length) {
			this.setState({inList: this.props.inList});
		}
	}

	render() {
		return(
			<div className="InList">
				{this.state.inList.map((e,i) => (<div key={i}>{e}</div>))}
			</div>
		);
	}
}
