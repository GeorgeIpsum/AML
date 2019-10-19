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
    dateCompleted: types.optional(types.union(types.boolean, types.Date), false),
    positionInProject: types.optional(types.union(types.null, types.number), null),
    contextId: types.optional(types.string, ''),
    projectId: types.optional(types.string, '')
  })
  .actions(self => ({
    setValue(value: string) {
      self.value = value;
      self.dateEdited = new Date();
    },
    setStatus(value: DepositStatus) {
      self.status = value;
      self.dateEdited = new Date();
    },
    setContext(value: string) {
      const root = getRoot(self);
      if(root && root.contextStore && root.contextStore.findById(value)) {
        self.contextId = value;
      }
    },
    setProject(value: string) {
      const root = getRoot(self);
      if(root && root.projectStore && root.projectStore.findById(value)) {
        self.projectId = value;
      }
    }
  }))
  .views(self => ({
    get context() {
      const root = getRoot(self);
      if(root && root.contextStore && self.contextId!=='') {
        return root.contextStore.findById(self.contextId);
      } return '';
    },
    get project() {
      const root = getRoot(self);
      if(root && root.projectStore && self.projectId!=='') {
        return root.projectStore.findById(self.projectId);
      } return '';
    }
  }));

type DepositType = typeof DepositModel.Type;
export interface Deposit extends DepositType {};

type DepositSnapshotType = typeof DepositModel.SnapshotType;
export interface DepositSnapshot extends DepositSnapshotType {};
