const { 
    Telegraf,
    Markup
} = require('telegraf');
require('dotenv').config()
const text = require ('./const')

const bot = new Telegraf(process.env.DateRB_bot);
bot.start((ctx) => ctx.reply(`Вітаю ${ctx.message.from.first_name   ?   ctx.message.from.first_name : 'госьць'}!`));
bot.help((ctx) => ctx.reply(text.commands))

bot.command('dates', async (ctx) => {
    try {
      await ctx.replyWithHTML('<b>Даты Рэспублікi Беларусь</b>', Markup.inlineKeyboard(
        [
            [Markup.button.callback('Гістарычны', 'btn_1'), Markup.button.callback('Aфіцыйныя', 'btn_2')]
        ]
      ))
        } catch(e) {
        console.error(e)
    }  
})

function addbtn(name,src,text) {
    bot.action(name, async (ctx) => {
        try {
           await ctx.answerCbQuery()
           if (src !== false) {
            await ctx.replyWithPhoto({
                sourse: src
            })
           }
           await ctx.replyWithHTML(text, {
                disable_web_page_preview : true
            })
        }catch(e) {
            console.error(e)
        } 
    })
}

addbtn('btn_1',false, text.text1)
addbtn('btn_2',false, text.text2)


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));