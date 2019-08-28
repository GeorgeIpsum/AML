import { ApisauceInstance, create, ApiResponse } from 'apisauce';
import { getGeneralApiProblem } from './api-problem';
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import * as Types from './api.types';
import app from 'firebase';
import { firebaseConfig } from '../../models/environment';

export class Api {
  apisauce: ApisauceInstance;
  config: ApiConfig;
  auth: app.auth.Auth;
  user: app.User;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  setup() {
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {},
    });

    app.initializeApp(firebaseConfig);

    this.auth = app.auth();

    this.auth.onAuthStateChanged(user => {
      if(user) {
        console.log('auth state', user);
        console.log('auth user 2', user.email);
      } else {
        console.log('auth state change', this.auth);
      }
    }, (error) => {
      console.log('auth state error', error);
    });
  }

  async getUser(username: string): Promise<Types.GetUserResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${username}`);

    if(!response.ok) {
      const problem = getGeneralApiProblem(response);
      if(problem) return problem;
    }

    try {
      const resultUser: Types.User = {

      }
      return { kind: "ok", user: resultUser };
    } catch {
      return { kind: "bad-data" };
    }
  }

  createUser = (email, password) => {
    this.auth.createUserWithEmailAndPassword(email, password).then((val) => {
      console.log('fulfilled',val);
      this.user = val.user as app.User;
    }, (rsn) => {
      console.log('rejected',rsn);
      this.signInUser(email, password);
    });
  }

  signInUser = (email, password) => {
    this.auth.signInWithEmailAndPassword(email, password).then((val) => { console.log('yesy',val) }, (rsn) => { console.log('no',rsn) });
  }

  signOutUser = () => this.auth.signOut();
}