import { ApisauceInstance, create, ApiResponse } from 'apisauce';
import { getGeneralApiProblem } from '../api/api-problem';
import { ApiConfig, DEFAULT_API_CONFIG } from '../api/api-config';
import * as Types from './context-api.types';
import { isNil } from '../../utilities/helpers';
import { ContextSnapshot } from '../../models/context';

export class ContextApi {
  apisauce: ApisauceInstance;

  config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  setup() {
    try {
      this.apisauce = create({
        baseURL: this.config.url,
        timeout: this.config.timeout,
        headers: {
          Accept: "application/json",
        },
      })
    } catch(e) {
      console.error(e.message);
    }
  }

  async getContexts(completed?: boolean): Promise<Types.GetContextsResult> {
    const params = isNil(completed) ? {} : { completed };
    const response: ApiResponse<any> = await this.apisauce.get(`/contexts`, params);

    if(!response.ok) {
      const problem = getGeneralApiProblem(response);
      if(problem) return problem;
    }

    try {
      const contexts: ContextSnapshot[] = response.data;
      return { kind: "ok", contexts };
    } catch {
      return { kind: "bad-data" };
    }
  }
}