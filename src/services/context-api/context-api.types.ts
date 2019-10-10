import { GeneralApiProblem } from '../api/api-problem';
import { ContextSnapshot } from '../../models/context';

export type GetContextsResult = { kind: "ok", contexts: ContextSnapshot[] } | GeneralApiProblem;
