import { types, getEnv } from 'mobx-state-tree';
//add other store model imports here here
import { DepositListStoreModel } from '../deposit-list-store';
import { ContextListStoreModel } from '../context';
import { Environment } from '../environment';

/**
 * The RootStore model
 */
export const RootStoreModel = types.model("RootStore")
  .props({
    //add other stores here in format: someStore: types.optional(SomeStoreModel, {})
    depositStore: types.optional(DepositListStoreModel, {}),
    contextStore: types.optional(ContextListStoreModel, {}),
    projectStore: types.optional(types.string, 'test'),
    user: types.optional(types.string, ''),
    isDarkTheme: types.optional(types.boolean, true),
    isNewStore: types.optional(types.boolean, true),
    currentRoute: types.optional(types.string, 'dashboard'),
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
    changeTheme() {
      self.isDarkTheme = !self.isDarkTheme;
      return true;
    },
    setIsNewStore(isNewStore: boolean) {
      self.isNewStore = isNewStore;
    },
    setCurrentRoute(route: string) {
      self.currentRoute = route;
    }
  }));

/**
 * The RootStore instance
 */
export type RootStore = typeof RootStoreModel.Type;


/**
 * The RootStore data
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType;
