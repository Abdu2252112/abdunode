const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '865127867:AAEe3AhTeah-Q967yXwzTORzbeiYlVEu_TQ';

const bot = new TelegramBot(TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(msg.from.id, '@ustoztopbot ga xush kelibsiz!\n'
    + 'Добро пожаловать в @ustoztopbot !');
  bot.sendMessage(msg.from.id, `Iltimos, tilni tanlang.\n`
    + 'Пожалуйста, выберите ваш язык.', {
    reply_markup: JSON.stringify({
      resize_keyboard: true,
      one_time_keyboard: true,
      keyboard: [
        ['\ud83c\uddfa\ud83c\uddff O\'zbekcha', '\ud83c\uddf7\ud83c\uddfa Русcкий']
      ]
    })
  });
});

bot.onText(/\ud83c\uddfa\ud83c\uddff O\'zbekcha/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(msg.from.id, `Salom, *${ msg.from.first_name }*!\n\n`
    + '*Iltimos, savollarni diqqat bilan o\'qib javob bering.*\n\n'
    + 'E\'lon qo\'shish uchun kerakli bo\'limni tanlang \ud83d\udc47\ud83c\udffb', {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      resize_keyboard: true,
      one_time_keyboard: true,
      keyboard: [
        ['\ud83d\udc68\ud83c\udffb\u200d\ud83c\udfeb Ustozman \ud83d\udc69\ud83c\udffc\u200d\ud83c\udfeb',
         '\ud83d\udc68\ud83c\udffb\u200d\ud83c\udf93 O\'quvchiman \ud83d\udc69\ud83c\udffb\u200d\ud83c\udf93']
      ]
    })
  });
});



bot.onText(/\/editable/, function onEditableText(msg) {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Edit Text',
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: 'edit'
          }
        ]
      ]
    }
  };
  bot.sendMessage(msg.from.id, 'Original Text', opts);
});

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === 'edit') {
    text = 'Edited Text';
  }

  bot.editMessageText(text, opts);
});
