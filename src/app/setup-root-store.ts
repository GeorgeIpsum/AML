import { onSnapshot, getSnapshot } from 'mobx-state-tree';
import { RootStoreModel, RootStore } from '../models/root-store';
import { Environment } from '../models/environment';
import * as storage from '../utilities/storage';
import { Api } from '../services/api';
import { DepositApi } from '../services/deposit-api';
import { ContextApi } from '../services/context-api';
import { ContextListStoreModel } from '../models/context';
import { DepositListStoreModel } from '../models/deposit-list-store';
import { DepositStatus } from '../models/deposit';

const ROOT_STATE_STORAGE_KEY = "AML";

export async function setupRootStore() {
  let rootStore: RootStore;
  let data: any;
  const DEFAULT_ROOT_STORE = createDefaultRootStore();

  const env = await createEnvironment();
  try {
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || DEFAULT_ROOT_STORE;
    rootStore = RootStoreModel.create(data, env);
  } catch {
    rootStore = RootStoreModel.create(DEFAULT_ROOT_STORE, env);
  }

  if(data === DEFAULT_ROOT_STORE) {
    storage.save(ROOT_STATE_STORAGE_KEY, getSnapshot(rootStore));
  }

  onSnapshot(rootStore, snapshot => storage.save(ROOT_STATE_STORAGE_KEY, snapshot));

  return rootStore;
}

export async function createEnvironment() {
  const env = new Environment();

  env.api = new Api();
  env.depositApi = new DepositApi();
  env.contextApi = new ContextApi();

  await env.api.setup();
  await env.depositApi.setup();
  await env.contextApi.setup();

  return env;
}

export function createDefaultRootStore() {
  const defaultContextListStore = ContextListStoreModel.create();
  defaultContextListStore.addContext('Default');
  defaultContextListStore.setDefaultContext(defaultContextListStore.contexts[0].id);

  const defaultDepositListStore = DepositListStoreModel.create();
  defaultDepositListStore.addDeposit({
    value: 'Hey there! Welcome to fruition.',
    status: DepositStatus.unprocessed,
    context: defaultContextListStore.contexts[0].id
  });

  return { depositStore: defaultDepositListStore, contextStore: defaultContextListStore};
}