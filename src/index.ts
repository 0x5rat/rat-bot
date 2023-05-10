
const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');

import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose'
import { runMongo } from './models/index'
import {RatModel, getOrCreateRat} from './models/rat/index'

// Run mongo
runMongo().then(() => {
  console.log('Mongo connected')
  console.log(RatModel)
})

const token: string = '6284363330:AAHvDusgtQtAeuOxfMktmLyMAAXDKTEQ5fI'
const bot = new Telegraf(token);

bot.use(async (ctx, next) => {
  const telegramRat = {
    id: `${ctx.message.chat.id}`,
    first_name: ctx.message.chat.first_name,
    username: ctx.message.chat.username
  }
  let rat = await getOrCreateRat(telegramRat)
  ctx.rat = rat

  if (rat.context === 'name') {
    if (ctx.message.text.length > 10) {
      ctx.reply('имя не может быть больше десяти букв')
      return
    }
    rat.context = ''
    rat.rat = JSON.stringify({name: ctx.message.text})
    await rat.save()
    return
  }
  if (rat.rat === '') {
    rat.context = 'name'
    await rat.save()
    ctx.reply('Вам нужно назвать крысу, напиши ее имя:')
  } else {
    await next()
  }
})

bot.hears('главная', (ctx) => {
  console.log(ctx.rat)
  ctx.reply(
    'Вернулись на главную страницу',
    Markup.keyboard([
      [
        Markup.button.callback('крыса', 'start'),
        Markup.button.callback('покормить крысу', 'stop'),
        Markup.button.callback('выйти на поиски пищи', 'start'),
      ],
      [
        Markup.button.callback('главная', 'start2'),
      ]
    ]),
  )
});

bot.hears('крыса', async (ctx) => {
  let rat = JSON.parse(ctx.rat.rat)
  // rat.name = 'lisa change'
  // ctx.rat.rat = JSON.stringify(rat)
  // await ctx.rat.save()

  ctx.reply(`имя: ${rat.name}`)
})

// bot.hears('список всех крыс', async (ctx: any) => {
//   let rats = await RatModel.find({})
//   console.log(rats)
//   ctx.reply('get')
// });

// bot.start((ctx: any) => ctx.reply('Welcome'));
// bot.hears('hi', (ctx: any) => ctx.reply('Hey there'));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));