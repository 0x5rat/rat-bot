import { Ref, prop } from '@typegoose/typegoose'

export class Rat {
  @prop({ index: true, required: true, lowercase: true, unique: true })
  id: string
  @prop({ index: true, required: true, lowercase: true, unique: true })
  first_name: string
  @prop({ index: true, required: true, lowercase: true, unique: true })
  username: string

  @prop({ index: true })
  context: string

  @prop({index: true })
  rat: string

  // Mongo property
  updatedAt: Date
  _id: string
  _doc: any
  createdAt: Date
}
