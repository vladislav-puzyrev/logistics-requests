import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RequestType } from '../../types/types'

const initialState = {
  requests: [] as RequestType[],
  totalRequests: 0
}

const requestsSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {
    setRequests (state, action: PayloadAction<{ requests: RequestType[] }>) {
      state.requests = action.payload.requests
    },
    setTotalRequests (state, action: PayloadAction<{ totalRequests: number }>) {
      state.totalRequests = action.payload.totalRequests
    }
  }
})

const { actions, reducer } = requestsSlice
export const requestsReducer = reducer
export const { setRequests, setTotalRequests } = actions
