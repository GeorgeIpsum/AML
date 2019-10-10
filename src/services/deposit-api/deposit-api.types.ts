import { GeneralApiProblem } from '../api/api-problem';
import { DepositSnapshot } from '../../models/deposit';

export type GetDepositsResult = { kind: "ok", deposits: DepositSnapshot[] } | GeneralApiProblem;
