import { types, getEnv } from 'mobx-state-tree';
//add other store model imports here here
import { DepositListStoreModel } from '../deposit-list-store';
import { Environment } from '../environment';

/**
 * The RootStore model
 */
export const RootStoreModel = types.model("RootStore")
  .props({
    //add other stores here in format: someStore: types.optional(SomeStoreModel, {})
    depositStore: types.optional(DepositListStoreModel, {}),
    user: types.optional(types.string, '')
  })
  .views(self => ({
    get environment() {
      return getEnv(self) as Environment;
    }
  }))
  .actions(self => ({
    signIn(email, password) {
      return self.environment.api.signInUser(email, password);
    },
  }));

/**
 * The RootStore instance
 */
export type RootStore = typeof RootStoreModel.Type;


/**
 * The RootStore data
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType;