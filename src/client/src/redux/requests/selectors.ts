import { StateType } from '../store'

export const requestsSelector = (state: StateType) => state.requests.requests
export const totalRequestsSelector = (state: StateType) => state.requests.totalRequests
