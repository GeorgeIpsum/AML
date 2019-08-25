import { types } from 'mobx-state-tree';

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
    id: types.identifierNumber,
    value: types.string,
    status: types.optional(types.enumeration<DepositStatus>("DepositStatus", Object.values(DepositStatus)), DepositStatus.unprocessed)
  })
  .actions(self => ({
    setId(value: number) {
      self.id = value;
    },
    setValue(value: string) {
      self.value = value;
    },
    setStatus(value: DepositStatus) {
      self.status = value;
    }
  }));

type DepositType = typeof DepositModel.Type;
export interface Deposit extends DepositType {};

type DepositSnapshotType = typeof DepositModel.SnapshotType;
export interface DepositSnapshot extends DepositSnapshotType {};