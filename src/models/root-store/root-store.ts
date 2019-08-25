import { types } from 'mobx-state-tree';
//add other store model imports here here
import { DepositListStoreModel } from '../deposit-list-store';

/**
 * The RootStore model
 */
export const RootStoreModel = types.model("RootStore")
  .props({
    //add other stores here in format: someStore: types.optional(SomeStoreModel, {})
    depositStore: types.optional(DepositListStoreModel, {}),
  });

/**
 * The RootStore instance
 */
export type RootStore = typeof RootStoreModel.Type;


/**
 * The RootStore data
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType;