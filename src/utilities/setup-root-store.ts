import { onSnapshot, getSnapshot } from 'mobx-state-tree';
import { RootStoreModel, RootStore } from '../models/root-store';
import { Environment } from '../models/environment';
import * as storage from './storage';
import { Api } from '../services/api';
import { DepositApi } from '../services/deposit-api';
import { ContextApi } from '../services/context-api';
import { ContextListStoreModel } from '../models/context';
import { DepositListStoreModel } from '../models/deposit';
import { DepositStatus } from '../models/deposit';

const ROOT_STATE_STORAGE_KEY = "AML";

export async function setupRootStore(useFirebase?: boolean) {
  let rootStore: RootStore;
  let data: any;

  const env = await createEnvironment(useFirebase);
  try {
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || defaultRootStore();
    rootStore = RootStoreModel.create(data, env);
  } catch {
    rootStore = RootStoreModel.create(defaultRootStore(), env);
  }

  if(rootStore.isNewStore) {
    rootStore.setIsNewStore(false);
    storage.save(ROOT_STATE_STORAGE_KEY, getSnapshot(rootStore));
  }

  handleInitialStateChanges(rootStore);

  onSnapshot(rootStore, snapshot => storage.save(ROOT_STATE_STORAGE_KEY, snapshot));

  return rootStore;
}

export async function createEnvironment(useFirebase?: boolean) {
  const env = new Environment();

  env.api = new Api();
  env.depositApi = new DepositApi();
  env.contextApi = new ContextApi();

  await env.api.setup(useFirebase);
  await env.depositApi.setup();
  await env.contextApi.setup();

  return env;
}

export function defaultRootStore() {
  const defaultContextListStore = ContextListStoreModel.create();
  defaultContextListStore.addContext('Default');
  defaultContextListStore.setDefaultContext(defaultContextListStore.contexts[0].id);

  const defaultDepositListStore = DepositListStoreModel.create();
  defaultDepositListStore.addDeposit({
    value: 'Hey there! Welcome to fruition.',
    status: DepositStatus.unprocessed,
    context: defaultContextListStore.contexts[0].id
  });

  return { depositStore: defaultDepositListStore, contextStore: defaultContextListStore };
}

function handleInitialStateChanges(rootStore: RootStore) {
  rootStore.projectStore.setDefaultProject();
}
