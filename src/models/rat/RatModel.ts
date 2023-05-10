import { DocumentType, getModelForClass } from '@typegoose/typegoose'
import { Rat } from './Rat'

const RatModel = getModelForClass(Rat, {
  schemaOptions: { timestamps: true },
})

interface LoginOptions {
  id: string
  first_name: string
  username: string
}

async function getOrCreateRat(loginOptions: LoginOptions) {
  if (!loginOptions.id) {
    throw new Error()
  }
  let rat: DocumentType<Rat> | undefined
  rat = await RatModel.findOne({ id: loginOptions.id })
  console.log(rat)
  if (!rat) {
    if (!(loginOptions.id || loginOptions.first_name || loginOptions.username)) {
      throw new Error()
    }
    rat = (await new RatModel({
      id: loginOptions.id,
      first_name: loginOptions.first_name,
      username: loginOptions.username,
      rat: '',
      context: ''
    }).save()) as DocumentType<Rat>
  }
  return rat
}
export {RatModel, getOrCreateRat}