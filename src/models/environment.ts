import { Api } from '../services/api';
import { DepositApi } from '../services/deposit-api';
import { ContextApi } from '../services/context-api';
import * as env from '../../env';

export class Environment {
  api: Api;
  depositApi: DepositApi;
  contextApi: ContextApi;
};

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY || env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL || env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID || env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID || env.REACT_APP_APP_ID
};
