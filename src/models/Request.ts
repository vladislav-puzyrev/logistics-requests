import { getModelForClass, index, prop } from '@typegoose/typegoose'

@index({ companyName: 'text', carrierFIO: 'text', carrierPhone: 'text', comment: 'text' })
class RequestClass {
  @prop({ required: true })
  public seq!: number

  @prop({ default: Date.now })
  public date?: Date

  @prop({ required: true })
  public companyName!: string

  @prop({ required: true })
  public carrierFIO!: string

  @prop({ required: true })
  public carrierPhone!: string

  @prop({ required: true })
  public comment!: string

  @prop({ required: true })
  public ATICode!: number
}

export const RequestModel = getModelForClass(RequestClass, {
  schemaOptions: { collection: 'requests' }
})
