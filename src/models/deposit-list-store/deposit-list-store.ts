import { types, getEnv, getRoot } from 'mobx-state-tree';
import { DepositModel, Deposit, DepositSnapshot, DepositStatus } from '../deposit';
//import { RootStore } from '../root-store';
import { Environment } from '../environment';
import { flow } from 'mobx';
import { UUIDGenerator } from '../../utilities/helpers';
import * as hash from 'object-hash';

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
    setDeposits(value: Deposit[] | DepositSnapshot[] | null) {
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
    addDeposit({value, status} = {value: '', status: DepositStatus.unprocessed}): boolean {
      if(self.deposits) {
        const deposit: Deposit = DepositModel.create({
          id: UUIDGenerator(),
          value: value,
          status: status,
          dateAdded: new Date(),
          dateEdited: new Date(),
          hash: hash({value: value, status: status, dateAdded: new Date()})
        });
        const deposits = [...self.deposits, ...[deposit]];
        self.deposits.replace(deposits as any);
        return true;
      } else {
        return false;
      }
    }
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
    },
    get chronoView() {
      return self.deposits.sort((d1, d2) => {
        return d1.dateAdded.getTime() < d2.dateAdded.getTime() ? 1 : -1;
      });
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