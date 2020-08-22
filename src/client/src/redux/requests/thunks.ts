import { ThunkType } from '../store'
import { setRequests, setTotalRequests } from './slice'
import { RequestType } from '../../types/types'

export const getRequests = (pageSize: number, page: number, term: string = ''): ThunkType => {
  return async (dispatch, getState, { requestsAPI }) => {
    const requests = await requestsAPI.getRequests(pageSize, page, term)
    dispatch(setRequests({ requests: requests.data }))
    dispatch(setTotalRequests({ totalRequests: requests.total }))
  }
}

export const deleteRequest = (id: number, page: number): ThunkType => {
  return async (dispatch, getState, { requestsAPI }) => {
    await requestsAPI.deleteRequest(id)
    dispatch(getRequests(10, page))
  }
}

export const createRequest = (
  companyName: string,
  carrierFIO: string,
  carrierPhone: string,
  comment: string,
  ATICode: number,
  setStatus: (message: string) => void
): ThunkType => {
  return async (dispatch, getState, { requestsAPI }) => {
    await requestsAPI.createRequest(
      companyName,
      carrierFIO,
      carrierPhone,
      comment,
      ATICode
    )
    setStatus('Создано!')
  }
}

export const updateRequest = (id: number, request: RequestType, setStatus: (message: string) => void): ThunkType => {
  return async (dispatch, getState, { requestsAPI }) => {
    await requestsAPI.updateRequest(id, request)
    setStatus('Успешно!')
  }
}
