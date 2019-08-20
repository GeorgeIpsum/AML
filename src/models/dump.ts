import { types } from 'mobx-state-tree';

//TODO: build this out
export enum DumpStatus {
  unprocessed = "unprocessed",
  trashed = "trashed",
  incubated = "incubated",
  referenced = "referenced",
  actedUpon = "acted upon",
  deferred = "deferred",
  delegated = "delegated",
  projected = "projected"
};

const Dump = types.model("Dump", {
  value: types.string,
  date: types.Date,
  status: types.enumeration<DumpStatus>("BlarghStatus", Object.values(DumpStatus))
});