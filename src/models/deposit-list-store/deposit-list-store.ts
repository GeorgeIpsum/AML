import { types, getEnv, getRoot } from 'mobx-state-tree';
import { DepositModel, Deposit, DepositSnapshot } from '../deposit';
//import { RootStore } from '../root-store';
import { Environment } from '../env';
import { flow } from 'mobx';

export enum DepositStoreStatus {
  idle = "idle",
  pending = "pending",
  done = "done",
  error = "error"
};

export const DepositListStoreModel = types.model("DepositListStore")
  .props({
    status: types.optional(types.enumeration<DepositStoreStatus>("DepositStoreStatus", Object.values(DepositStoreStatus)), DepositStoreStatus.idle),
    deposits: types.optional(types.array(DepositModel), [])
  })
  .actions(self => ({ //all setters go here
    setStatus(value: DepositStoreStatus) {
      self.status = value;
    },
    setDeposits(value: Deposit[] | DepositSnapshot[]) {
      if(self.deposits) {
        if(value) {
          self.deposits.replace(value as any);
        } else {
          self.deposits.clear();
        }
      } else {
        self.deposits = value as any;
      }
    },
  }))
  .views(self => ({
    get environment() {
      return getEnv(self) as Environment;
    },
    get rootStore() {
      return getRoot(self) as any; //returning this as RootStore results in ts calling a circular reference
    },
    get isLoading() {
      return self.status === "pending";
    }
  }))
  .actions(self => ({
    loadDeposits: flow(function*() {
      self.setStatus(DepositStoreStatus.pending);
      try { 
        const result = yield self.environment.depositApi.getDeposits();

        //@ts-ignore
        if(result.kind === "ok") {
          //@ts-ignore
          self.setDeposits(result.deposits);
          self.setStatus(DepositStoreStatus.done);
        } else {
          self.setStatus(DepositStoreStatus.error);
        }
      } catch {
        self.setStatus(DepositStoreStatus.error);
      }
    }),
  }));

type DepositStoreType = typeof DepositListStoreModel.Type;
export interface DepositStore extends DepositStoreType {};