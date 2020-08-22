import { server } from './server'
import { RequestType } from '../types/types'

export const getRequests = async (pageSize: number, page: number, term: string = '') => {
  const res = await server.get<{
    data: RequestType[],
    total: number
  }>(`/requests?pageSize=${pageSize}&page=${page}&term=${term}`)
  return res.data
}

export const getRequest = async (id: number) => {
  const res = await server.get(`/requests/${id}`)
  return res.data
}

export const createRequest = async (
  companyName: string,
  carrierFIO: string,
  carrierPhone: string,
  comment: string,
  ATICode: number
) => {
  const res = await server.post(`/requests`, {
    companyName,
    carrierFIO,
    carrierPhone,
    comment,
    ATICode
  })
  return res.data
}

export const updateRequest = async (id: number, request: RequestType) => {
  const res = await server.put(`/requests/${id}`, request)
  return res.data
}

export const deleteRequest = async (id: number) => {
  const res = await server.delete(`/requests/${id}`)
  return res.data
}
