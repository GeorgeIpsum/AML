import { types, getRoot } from 'mobx-state-tree';

export enum DepositStatus {
  unprocessed = "unprocessed",
  trashed = "trashed",
  incubated = "incubated",
  referenced = "referenced",
  actedUpon = "acted upon",
  deferred = "deferred",
  delegated = "delegated",
  addedToProject = "added to project"
};

export const DepositModel = types.model("Deposit")
  .props({
    id: types.optional(types.identifier, 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx'),
    value: types.string,
    status: types.optional(types.enumeration<DepositStatus>("DepositStatus", Object.values(DepositStatus)), DepositStatus.unprocessed),
    dateAdded: types.optional(types.Date, new Date()),
    dateEdited: types.optional(types.Date, new Date()),
    contextId: types.optional(types.string, '')
  })
  .actions(self => ({
    setId(value: string) {
      self.id = value;
    },
    setValue(value: string) {
      self.value = value;
      self.dateEdited = new Date();
    },
    setStatus(value: DepositStatus) {
      self.status = value;
      self.dateEdited = new Date();
    }
  }))
  .views(self => ({
    get context() {
      const root = getRoot(self);
      if(root && root.contextStore) {
        return root.contextStore.findById(self.contextId);
      }
      return '';
    }
  }));

type DepositType = typeof DepositModel.Type;
export interface Deposit extends DepositType {};

type DepositSnapshotType = typeof DepositModel.SnapshotType;
export interface DepositSnapshot extends DepositSnapshotType {};
