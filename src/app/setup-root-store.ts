import { onSnapshot } from 'mobx-state-tree';
import { RootStoreModel, RootStore } from '../models/root-store';
import { Environment } from '../models/environment';
import * as storage from '../utilities/storage';
import { Api } from '../services/api';
import { DepositApi } from '../services/deposit-api';
import { ContextApi } from '../services/context-api';

const ROOT_STATE_STORAGE_KEY = "AML";

export async function setupRootStore() {
  let rootStore: RootStore;
  let data: any;

  const env = await createEnvironment();
  try {
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {};
    rootStore = RootStoreModel.create(data, env);
  } catch {
    rootStore = RootStoreModel.create({}, env);
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