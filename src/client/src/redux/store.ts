import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit'
import * as requestsAPI from '../api/requests'
import { requestsReducer } from './requests/slice'

const extraArgument = {
  requestsAPI
}

export const store = configureStore({
  reducer: {
    requests: requestsReducer
  },
  middleware: getDefaultMiddleware({
    thunk: {
      extraArgument
    }
  })
})

export type ThunkType<R = void, A extends Action = Action> = ThunkAction<R, StateType, typeof extraArgument, A>
export type StateType = ReturnType<typeof store.getState>
