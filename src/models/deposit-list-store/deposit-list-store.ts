import { types, getEnv, getRoot } from 'mobx-state-tree';
import { DepositModel, Deposit, DepositSnapshot, DepositStatus } from '../deposit';
//import { RootStore } from '../root-store';
import { Environment } from '../environment';
import { flow } from 'mobx';
import { UUIDGenerator, compare } from '../../utilities/helpers';
import * as hash from 'object-hash';
import { LoadingStatus } from '../status';

export const DepositListStoreModel = types.model("DepositListStore")
  .props({
    status: types.optional(types.enumeration<LoadingStatus>("DepositListLoadingStatus", Object.values(LoadingStatus)), LoadingStatus.idle),
    deposits: types.optional(types.array(DepositModel), [])
  })
  .actions(self => ({ //all setters go here
    setStatus(value: LoadingStatus) {
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
    addDeposit({value, status, context} = {value: '', status: DepositStatus.unprocessed, context: ''}): boolean {
      if(self.deposits) {
        const deposit: Deposit = DepositModel.create({
          id: UUIDGenerator(),
          value: value,
          status: status,
          dateAdded: new Date(),
          dateEdited: new Date(),
          hash: hash({value: value, status: status, dateAdded: new Date()}),
          contextId: context
        });
        const deposits = [...self.deposits, ...[deposit]];
        self.deposits.replace(deposits as any);
        return true;
      } return false;
    },
    changeDeposit(index, {value, status}) {
      if(self.deposits && self.deposits[index]) {
        if(value && value!=='') {
          self.deposits[index].setValue(value);
          return true;
        }
        if(status && status!=='') {
          self.deposits[index].setStatus(status);
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
      return getRoot(self) as any; //returning this as RootStore results in ts calling a circular reference
    },
    get isLoading() {
      return self.status === "pending";
    },
    get chronological() {
      return self.deposits.slice().sort((d1, d2) => {
        return compare(d1.dateAdded.getTime(), d2.dateAdded.getTime());
      });
    }
  }))
  .actions(self => ({
    loadDeposits: flow(function*() {
      self.setStatus(LoadingStatus.pending);
      try { 
        const result = yield self.environment.depositApi.getDeposits();

        //@ts-ignore
        if(result.kind === "ok") {
          //@ts-ignore
          self.setDeposits(result.deposits);
          self.setStatus(LoadingStatus.done);
        } else {
          self.setStatus(LoadingStatus.error);
        }
      } catch {
        self.setStatus(LoadingStatus.error);
      }
    }),
  }))
  .views(self => ({
    chronoView(deposits?: any) {
      if(deposits) {
        return deposits.slice().sort((d1, d2) => {
          return compare(d1.dateAdded.getTime(), d2.dateAdded.getTime());
        });
      } else {
        return self.chronological;
      }
    },
    findByContext(contextID: string) {
      return self.deposits.filter((deposit) => deposit.contextId === contextID);
    }
  }));

type DepositStoreType = typeof DepositListStoreModel.Type;
export interface DepositStore extends DepositStoreType {};