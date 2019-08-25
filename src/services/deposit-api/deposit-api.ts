import { ApisauceInstance, create, ApiResponse } from 'apisauce';
import { getGeneralApiProblem } from '../api/api-problem';
import { ApiConfig, DEFAULT_API_CONFIG } from '../api/api-config';
import * as Types from './deposit-api.types';
import { isNil } from '../../utilities/helpers';
import { DepositSnapshot } from '../../models/deposit';

export class DepositApi {
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
      });
    } catch(e) {
      console.error(e.message);
    }
  }

  async getDeposits(completed?: boolean): Promise<Types.GetDepositsResult> {
    const params = isNil(completed) ? {} : { completed };
    const response: ApiResponse<any> = await this.apisauce.get(`/deposits`, params);
    
    if(!response.ok) {
      const problem = getGeneralApiProblem(response);
      if(problem) return problem;
    }

    try {
      const deposits: DepositSnapshot[] = response.data;
      return { kind: "ok", deposits };
    } catch {
      return { kind: "bad-data" };
    }
  }
}