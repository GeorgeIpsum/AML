import React from 'react';
import InInput from './InInput';
import './InParent.scss';

type InParentProps = {};
type InParentState = {};

export default class InParent extends React.Component<InParentProps, InParentState> {
	render() {
		return(
			<div className="InParent">
				<InInput />
			</div>
		);
	}
}
