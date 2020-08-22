import { NextFunction, Request, Response } from 'express'
import { RequestModel } from '../../models/Request'

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pageSize: number = req.query.pageSize ? +req.query.pageSize : 10
    const page: number = req.query.page ? +req.query.page : 0
    const term: string | null = req.query.term ? req.query.term as string : null
    const skip = pageSize * page - pageSize

    const total = await RequestModel.countDocuments()
    const requests = term
      ? await RequestModel.find({ $text: { $search: term } }).lean()
      : await RequestModel.find().skip(skip).limit(pageSize).lean()
    res.status(200).json({
      data: requests,
      total
    })
  } catch (err) {
    next(err)
  }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestId = req.params.requestId
    const request = await RequestModel.find({ seq: +requestId })
    res.status(200).json(request[0])
  } catch (err) {
    next(err)
  }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyName, carrierFIO, carrierPhone, comment, ATICode } = req.body
    const count = await RequestModel.find().countDocuments()
    const request = await RequestModel.create({
      seq: count + 2,
      companyName,
      carrierFIO,
      carrierPhone,
      comment,
      ATICode
    })
    res.status(200).json(request)
  } catch (err) {
    next(err)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = await RequestModel.findOneAndUpdate(
      { seq: +req.params.requestId },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(request)
  } catch (err) {
    next(err)
  }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await RequestModel.remove({ seq: +req.params.requestId })
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
