import { types, getEnv, getRoot } from 'mobx-state-tree';
import { Environment } from '../environment';
import { LoadingStatus } from '../status';
import { ContextModel, Context, ContextSnapshot } from './context';
import { UUIDGenerator } from '../../utilities/helpers';

export const ContextListStoreModel = types.model("ContextListStore")
  .props({
    status: types.optional(types.enumeration<LoadingStatus>("ContextListLoadingStatus", Object.values(LoadingStatus)), LoadingStatus.idle),
    contexts: types.optional(types.array(ContextModel), []),
    defaultContext: types.optional(types.string, 'ERROR')
  })
  .actions(self => ({
    setStatus(value: LoadingStatus) {
      self.status = value;
    },
    setContexts(value: Context[] | ContextSnapshot[] | null) {
      if(self.contexts) {
        if(value) {
          self.contexts.replace(value as any);
        } else {
          self.contexts.clear();
        }
      } else {
        self.contexts = value as any;
      }
    },
    setDefaultContext(id: string) {
      if(self.contexts && self.contexts.find((c) => c.id === id)) {
        self.defaultContext = id;
      }
    },
    addContext(name: string = '') {
      if(self.contexts) {
        const context: Context = ContextModel.create({
          id: UUIDGenerator(),
          name: name
        });
        const contexts = [...self.contexts, ...[context]];
        self.contexts.replace(contexts as any);
        return true;
      } return false;
    },
    changeContext(index, name?) {
      if(self.contexts && self.contexts[index]) {
        if(name) {
          self.contexts[index].setName(name);
          return true;
        } return false;
      } return false;
    }
  }))
  .views(self => ({
    get environment() {
      return getEnv(self) as Environment;
    },
    get rootStore() {
      return getRoot(self) as any;
    },
    get isLoading() {
      return self.status === "pending";
    },
    get alphabetical() {
      return self.contexts.slice().sort((c1, c2) => {
        const C1 = c1.name.toUpperCase(); const C2 = c2.name.toUpperCase();
        return (C2 < C1) ? -1 : (C1 > C2) ? 1 : 0;
      });
    }
  }))
  .actions(self => ({
    findByName(name: string) {
      const value = self.contexts.find((c) => c.name === name);
      if(value) {
        return value;
      } return false;
    },
    findById(id: string) {
      const value = self.contexts.find((c) => c.id === id);
      if(value) {
        return value;
      } return false;
    }
  }));

type ContextStoreType = typeof ContextListStoreModel.Type;
export interface ContextStore extends ContextStoreType {};
