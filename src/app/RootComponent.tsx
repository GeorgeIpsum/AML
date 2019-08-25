import React from 'react';
import { RootStore } from '../models/root-store';
import { DepositStore } from '../models/deposit-list-store';

interface RootComponentProps {
  rootStore?: RootStore;
  depositStore?: DepositStore;
}

export default class RootComponent extends React.Component<RootComponentProps, {}> {

}