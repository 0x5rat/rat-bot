const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const token: string = '6284363330:AAHvDusgtQtAeuOxfMktmLyMAAXDKTEQ5fI'
const bot = new Telegraf(token);
bot.start((ctx: any) => ctx.reply('Welcome'));
bot.hears('hi', (ctx: any) => ctx.reply('Hey there'));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));