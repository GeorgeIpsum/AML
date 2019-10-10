import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './nav';

const navItems = [
  {
    name: "Deposits",
    icon: (<div>icon</div>)
  }, {
    name: "Options",
    icon: (<div>icon</div>)
  }
];
const onSegmentChange = () => {
  console.log('segment change');
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Nav navItems={navItems} onSegmentChange={onSegmentChange} initialNavState={'Deposits'} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
