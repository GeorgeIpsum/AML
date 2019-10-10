import { GeneralApiProblem } from './api-problem';

export interface User {

}

export type GetUserResult = { kind: "ok", user: User } | GeneralApiProblem;
