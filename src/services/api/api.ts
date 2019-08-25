import { ApisauceInstance, create, ApiResponse } from 'apisauce';
import { getGeneralApiProblem } from './api-problem';
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import * as Types from './api.types';

export class Api {
  apisauce: ApisauceInstance;
  config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  setup() {
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {},
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
}