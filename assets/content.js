// SHIVERS — все тексты сайта в одном месте (RU + EN).
// Чтобы добавить продукт — добавьте объект в products. Тексты оферты и политики требуют проверки юристом.
// Юридически действует русская версия оферты и политики; английская — перевод для удобства.

window.SITE = {
  brand: 'SHIVERS',
  seller: {
    name: { ru: 'Шинаев Дмитрий Валерьевич', en: 'Dmitry Valerievich Shinaev' },
    status: { ru: 'Плательщик налога на профессиональный доход (самозанятый)', en: 'Self-employed (professional income tax payer, Russia)' },
    inn: '695004852841',
    email: 'shivers.help@yandex.ru',
  },
  offerDate: { ru: '10 ноября 2026 г.', en: 'November 10, 2026' },

  ui: {
    ru: {
      payment: 'Оплата', about: 'Обо мне', home: 'Главная', offer: 'Оферта', start: 'START',
      project: 'Проект', of: 'из', prices: 'Цены', audience: 'Для кого',
      prev: 'Предыдущий проект', next: 'Следующий проект', soonMore: 'Скоро здесь появятся новые проекты',
      scan: 'Наведите камеру телефона, чтобы скачать', onlyAndroid: 'Пока только для Android',
      openPage: 'Открыть оферту отдельной страницей', privacy: 'Политика конфиденциальности',
      swipe: 'Листайте влево-вправо, чтобы переключать проекты',
      payTitle: 'Как проходит оплата', payLead: 'Оплата принимается через платёжный сервис Robokassa. Оплата разовая — без подписок и автосписаний.',
      payMethods: '<b>Способы оплаты:</b> карты российских банков (Мир, Visa, Mastercard), СБП.',
      payTax: '<b>Налоги:</b> продавец — самозанятый, чек формируется в приложении «Мой налог» ФНС России. НДС не облагается.',
      payFull: 'Полные условия — в <a href="offer.html" target="_blank">оферте</a> каждого продукта. <a href="privacy.html" target="_blank">Политика конфиденциальности</a>.',
      aboutTitle: 'Обо мне',
      aboutText: 'Приветствую тебя! Меня зовут Дмитрий. Я создаю полезные ИТ-продукты, которые решают проблемы общества. Надеюсь, что ты оценишь мои труды и найдёшь здесь то, что будет полезно именно тебе.',
      aboutNote: 'Вопросы по оплате, доступу и возврату — пишите на электронную почту, отвечаю в течение 1–2 рабочих дней.',
      legalRu: '',
      footer: 'Оферта', inn: 'ИНН',
    },
    en: {
      payment: 'Payment', about: 'About me', home: 'Home', offer: 'Terms', start: 'START',
      project: 'Project', of: 'of', prices: 'Prices', audience: 'For whom',
      prev: 'Previous project', next: 'Next project', soonMore: 'New projects coming soon',
      scan: 'Point your phone camera to download', onlyAndroid: 'Android only for now',
      openPage: 'Open the terms as a separate page', privacy: 'Privacy policy',
      swipe: 'Swipe left or right to switch projects',
      payTitle: 'How payment works', payLead: 'Payments are processed by Robokassa. One-time payment — no subscriptions or automatic charges.',
      payMethods: '<b>Payment methods:</b> cards of Russian banks (Mir, Visa, Mastercard), SBP (Faster Payments System).',
      payTax: '<b>Taxes:</b> the seller is self-employed; the receipt is issued via the Federal Tax Service app “Moi Nalog”. VAT is not applicable.',
      payFull: 'Full conditions are in each product’s <a href="offer.html?lang=en" target="_blank">terms</a>. <a href="privacy.html?lang=en" target="_blank">Privacy policy</a>.',
      aboutTitle: 'About me',
      aboutText: 'Welcome! My name is Dmitry. I build useful IT products that solve real problems for people. I hope you will appreciate my work and find something here that is useful for you.',
      aboutNote: 'Questions about payment, access or refunds — email me, I reply within 1–2 business days.',
      legalRu: '<p class="muted"><b>Translation for convenience.</b> The Russian version of this document is legally binding.</p>',
      footer: 'Terms', inn: 'Tax ID (INN)',
    },
  },

  payment: {
    ru: [
      ['Выберите, что хотите купить', 'В приложении или на сайте нужного продукта нажмите «Купить» или «Оплатить». Перед оплатой вы увидите цену и краткие условия.'],
      ['Оплатите через Robokassa', 'Откроется защищённая страница Robokassa. Можно заплатить картой российского банка или через СБП. Данные карты вводятся только на стороне платёжной системы — продавец их не видит.'],
      ['Получите чек', 'Чек из приложения «Мой налог» (ФНС) придёт на электронную почту или телефон, указанный при оплате.'],
      ['Пользуйтесь', 'Доступ открывается сразу после оплаты. Сохраните номер платежа — он пригодится, если понадобится помощь.'],
      ['Возврат в течение 24 часов', 'Передумали? Напишите на электронную почту с номером платежа в течение 24 часов после покупки — вернём деньги без вопросов тем же способом, которым вы платили.'],
    ],
    en: [
      ['Choose what you want to buy', 'In the app or on the product’s website, tap “Buy” or “Pay”. You will see the price and short conditions before paying.'],
      ['Pay via Robokassa', 'A secure Robokassa page opens. You can pay with a Russian bank card or via SBP. Card details are entered only on the payment system’s side — the seller never sees them.'],
      ['Get a receipt', 'A receipt from the “Moi Nalog” tax app is sent to the email or phone you specified.'],
      ['Enjoy', 'Access opens right after payment. Keep the payment number — you may need it if you contact support.'],
      ['Refund within 24 hours', 'Changed your mind? Email us with the payment number within 24 hours of purchase — we will refund you, no questions asked, using the same payment method.'],
    ],
  },

  products: [
    {
      id: 'rusexam',
      kind: 'android',               // android | web — от этого зависит кнопка (скачать / открыть)
      url: null,                     // ссылка на RuStore (или на веб-сервис); пока нет — кнопка «Скоро»
      name: { ru: 'РусЭкзамен', en: 'RusExam' },
      audience: { ru: 'Для мигрантов из Узбекистана, Таджикистана и Киргизии', en: 'For migrants from Uzbekistan, Tajikistan and Kyrgyzstan' },
      tagline: { ru: 'Подготовка к экзамену по русскому языку, истории и законам РФ', en: 'Preparation for the Russian language, history and law exam' },
      lead: {
        ru: 'Мобильное приложение помогает сдать комплексный экзамен для патента, РВП, ВНЖ и гражданства России.',
        en: 'A mobile app that helps pass the comprehensive exam required for a work patent, temporary residence, permanent residence and Russian citizenship.',
      },
      features: {
        ru: [
          ['Курс, а не только тесты', '120 уроков по порядку и тренажёр — 1&nbsp;300+ заданий как на экзамене.'],
          ['Объяснения на родном языке', 'Каждая ошибка разобрана на русском, узбекском, таджикском и киргизском.'],
          ['Работает без интернета', 'Все уроки и 860+ аудиозаписей уже внутри приложения.'],
          ['Как на настоящем экзамене', '5 вариантов пробного экзамена по структуре ФИПИ: баллы, пороги, таймер.'],
          ['Оплата один раз', 'Без подписки и автосписаний. Платите только за свой экзамен.'],
        ],
        en: [
          ['A full course, not just tests', '120 step-by-step lessons and a trainer with 1&nbsp;300+ exam-style tasks.'],
          ['Explanations in your native language', 'Every mistake is explained in Russian, Uzbek, Tajik and Kyrgyz.'],
          ['Works offline', 'All lessons and 860+ audio recordings are built into the app.'],
          ['Just like the real exam', '5 mock exams following the official structure: scores, pass marks, timer.'],
          ['Pay once', 'No subscription, no automatic charges. Pay only for your exam.'],
        ],
      },
      screens: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'].map((n) => `assets/img/rusexam-${n}.jpg`),
      prices: {
        ru: [['«Патент»', 'подготовка к экзамену для получения патента на работу', '299 ₽'], ['«РВП / ВНЖ»', 'подготовка к экзамену для разрешения на временное проживание и вида на жительство', '490 ₽'], ['«Гражданство»', 'подготовка к экзамену для приёма в гражданство РФ', '790 ₽']],
        en: [['“Patent”', 'exam preparation for a work patent', '299 ₽'], ['“Residence”', 'exam preparation for temporary and permanent residence permits', '490 ₽'], ['“Citizenship”', 'exam preparation for Russian citizenship', '790 ₽']],
      },
      priceNote: {
        ru: 'В приложении может действовать акционная цена (например, «Гражданство» — 590 ₽ на старте продаж). Актуальная цена всегда показывается перед оплатой.',
        en: 'A promotional price may apply in the app (e.g. “Citizenship” — 590 ₽ at launch). The current price is always shown before payment.',
      },
      access: {
        ru: 'Доступ к выбранному курсу открывается в приложении сразу после оплаты и действует бессрочно, без подписки. Часть уроков доступна бесплатно до покупки.',
        en: 'Access to the selected course opens in the app right after payment and does not expire; no subscription. Some lessons are free before purchase.',
      },
      platform: { ru: 'Android. Приложение работает без подключения к интернету; интернет нужен только для оплаты.', en: 'Android. The app works offline; internet is needed only for payment.' },
      disclaimer: {
        ru: 'Приложение — учебный материал. Оно помогает подготовиться, но не гарантирует сдачу экзамена: результат зависит от самого ученика. Требования законодательства могут меняться — актуальные правила уточняйте в МВД.',
        en: 'The app is a study aid. It helps you prepare but does not guarantee passing the exam — the result depends on the learner. Legal requirements may change; check current rules with the Ministry of Internal Affairs.',
      },
    },
  ],
};

// ───── Оферта: общий текст + приложение с условиями конкретного продукта ─────
window.offerHTML = function (productId, L = 'ru') {
  const S = window.SITE, s = S.seller, U = S.ui[L];
  const p = S.products.find((x) => x.id === productId) || S.products[0];
  const tbl = `<table>${p.prices[L].map(([n, d, c]) => `<tr><td><b>${n}</b><br><span class="muted">${d}</span></td><td class="price">${c}</td></tr>`).join('')}</table>`;
  if (L === 'en') return `${U.legalRu}
<h1>Public offer</h1>
<p class="muted">for access to paid materials of SHIVERS apps and services · version of ${S.offerDate.en}</p>
<h2>1. General</h2>
<p>1.1. ${s.name.en}, ${s.status.en.toLowerCase()}, INN ${s.inn} (the “Seller”), offers any person with full legal capacity (the “Buyer”) to enter into an agreement on the terms of this offer.</p>
<p>1.2. Payment for the selected paid access means full and unconditional acceptance of this offer (Art. 438 of the Civil Code of the Russian Federation). The agreement is concluded when payment is received.</p>
<p>1.3. Terms of a specific product (what is included, prices, how access is provided) are set out in the Appendix and form an integral part of this offer.</p>
<h2>2. Subject</h2>
<p>2.1. The Seller grants the Buyer, for a fee, access to paid materials of the product (a simple non-exclusive licence for personal non-commercial use); the Buyer pays for the access.</p>
<p>2.2. The Buyer may not copy, distribute or resell the materials or transfer access to third parties.</p>
<h2>3. Price and payment</h2>
<p>3.1. The price is shown in the product before payment and in the Appendix. VAT is not applicable as the Seller pays the professional income tax.</p>
<p>3.2. Payment is made via Robokassa by bank card or SBP. Card data is processed by the payment service and is not transferred to the Seller.</p>
<p>3.3. After payment the Buyer receives a receipt issued via the “Moi Nalog” app in accordance with the law on professional income tax.</p>
<h2>4. Access</h2>
<p>4.1. Access opens in the product after payment is confirmed, usually immediately. If access does not open within 24 hours, the Buyer may email ${s.email} with the payment number.</p>
<p>4.2. The service is deemed rendered when access to the paid materials is opened.</p>
<h2>5. Refunds</h2>
<p>5.1. Within 24 (twenty-four) hours of payment the Buyer may cancel without giving reasons by emailing ${s.email} with the payment number. The Seller refunds the full amount using the original payment method.</p>
<p>5.2. After 24 hours refunds are made in the cases and manner provided by Russian law, including when paid access was not provided or the product does not work through the Seller’s fault.</p>
<p>5.3. Refund timing depends on the Buyer’s bank, usually up to 10 business days after approval. The receipt is cancelled after the refund.</p>
<h2>6. Liability</h2>
<p>6.1. The materials are educational and informational. The Seller does not guarantee a specific result, as it depends on the Buyer’s actions.</p>
<p>6.2. The Seller strives to keep the materials up to date, but laws may change. The Buyer should check current requirements with the competent authorities.</p>
<p>6.3. The Seller is not liable for failures caused by the Buyer’s device, app stores, banks, payment systems or other circumstances beyond the Seller’s control.</p>
<h2>7. Personal data</h2>
<p>7.1. Personal data is processed in accordance with the <a href="privacy.html?lang=en">Privacy policy</a>.</p>
<h2>8. Other</h2>
<p>8.1. Disputes are settled by negotiation; claims are sent to ${s.email}, response time is 10 business days. Otherwise disputes are resolved in court under Russian law.</p>
<p>8.2. The Seller may amend the offer; the new version applies from publication and does not affect access already paid for.</p>
<h2>9. Seller details</h2>
<p>${s.name.en}<br>${s.status.en}<br>INN ${s.inn}<br>Email: <a href="mailto:${s.email}">${s.email}</a></p>
<hr>
<h1>Appendix: “${p.name.en}”</h1>
<p>${p.lead.en}</p>
<h2>What is included</h2><p>${p.access.en}</p>
<h2>Prices</h2>${tbl}<p class="muted">${p.priceNote.en}</p>
<h2>Platform</h2><p>${p.platform.en}</p>
<h2>Important</h2><p>${p.disclaimer.en}</p>`;

  return `
<h1>Публичная оферта</h1>
<p class="muted">о предоставлении доступа к платным материалам приложений и сервисов SHIVERS · редакция от ${S.offerDate.ru}</p>
<h2>1. Общие положения</h2>
<p>1.1. ${s.name.ru}, ${s.status.ru.toLowerCase()}, ИНН ${s.inn} (далее — «Продавец»), предлагает любому дееспособному лицу (далее — «Покупатель») заключить договор на условиях настоящей оферты.</p>
<p>1.2. Оплата Покупателем выбранного платного доступа означает полное и безоговорочное принятие (акцепт) условий оферты (ст. 438 ГК РФ). Договор считается заключённым с момента поступления оплаты.</p>
<p>1.3. Условия конкретного продукта (что входит в доступ, цены, порядок предоставления) указаны в Приложении к оферте и являются её неотъемлемой частью.</p>
<h2>2. Предмет договора</h2>
<p>2.1. Продавец предоставляет Покупателю за плату доступ к платным материалам продукта (простая неисключительная лицензия на использование для личных некоммерческих целей), а Покупатель оплачивает доступ.</p>
<p>2.2. Покупатель не вправе копировать, распространять, перепродавать материалы и передавать доступ третьим лицам.</p>
<h2>3. Цена и порядок оплаты</h2>
<p>3.1. Цена доступа указывается в продукте перед оплатой и в Приложении к оферте. НДС не облагается в связи с применением Продавцом налога на профессиональный доход.</p>
<p>3.2. Оплата производится через платёжный сервис Robokassa банковской картой или через Систему быстрых платежей. Данные банковской карты обрабатываются платёжным сервисом и Продавцу не передаются.</p>
<p>3.3. После оплаты Покупателю направляется чек, сформированный в приложении «Мой налог» в соответствии с законодательством о налоге на профессиональный доход.</p>
<h2>4. Предоставление доступа</h2>
<p>4.1. Доступ открывается в продукте после подтверждения оплаты, как правило — сразу. Если доступ не открылся в течение 24 часов, Покупатель вправе написать Продавцу на электронную почту ${s.email}, указав номер платежа.</p>
<p>4.2. Услуга считается оказанной в момент открытия доступа к оплаченным материалам.</p>
<h2>5. Возврат денежных средств</h2>
<p>5.1. В течение 24 (двадцати четырёх) часов с момента оплаты Покупатель вправе отказаться от доступа без объяснения причин, направив запрос на электронную почту ${s.email} с указанием номера платежа. Продавец возвращает полную стоимость тем же способом, которым была произведена оплата.</p>
<p>5.2. По истечении 24 часов возврат осуществляется в случаях и в порядке, предусмотренных законодательством Российской Федерации, в том числе если оплаченный доступ не был предоставлен или продукт не работает по вине Продавца.</p>
<p>5.3. Срок возврата зависит от банка Покупателя и обычно составляет до 10 рабочих дней с момента одобрения запроса. После возврата чек аннулируется.</p>
<h2>6. Ответственность</h2>
<p>6.1. Материалы носят учебный и информационный характер. Продавец не гарантирует достижения конкретного результата, так как он зависит от действий Покупателя.</p>
<p>6.2. Продавец прилагает усилия к актуальности материалов, но законодательство может меняться. Актуальные требования Покупатель уточняет в уполномоченных органах.</p>
<p>6.3. Продавец не несёт ответственности за сбои, вызванные устройством Покупателя, работой магазина приложений, банков, платёжных систем и иными обстоятельствами вне контроля Продавца.</p>
<h2>7. Персональные данные</h2>
<p>7.1. Обработка персональных данных осуществляется в соответствии с <a href="privacy.html">Политикой конфиденциальности</a>.</p>
<h2>8. Прочие условия</h2>
<p>8.1. Споры решаются путём переговоров, претензии направляются на электронную почту ${s.email}; срок ответа — 10 рабочих дней. При недостижении согласия спор рассматривается в суде по законодательству Российской Федерации.</p>
<p>8.2. Продавец вправе изменять оферту; новая редакция действует с момента публикации и не распространяется на уже оплаченный доступ.</p>
<h2>9. Реквизиты Продавца</h2>
<p>${s.name.ru}<br>${s.status.ru}<br>ИНН ${s.inn}<br>Эл. почта: <a href="mailto:${s.email}">${s.email}</a></p>
<hr>
<h1>Приложение: «${p.name.ru}»</h1>
<p>${p.lead.ru}</p>
<h2>Что входит в доступ</h2><p>${p.access.ru}</p>
<h2>Цены</h2>${tbl}<p class="muted">${p.priceNote.ru}</p>
<h2>Платформа</h2><p>${p.platform.ru}</p>
<h2>Важно</h2><p>${p.disclaimer.ru}</p>`;
};

window.privacyHTML = function (L = 'ru') {
  const S = window.SITE, s = S.seller, U = S.ui[L];
  if (L === 'en') return `${U.legalRu}
<h1>Privacy policy</h1>
<p class="muted">SHIVERS apps, services and website · version of ${S.offerDate.en}</p>
<h2>1. Who processes the data</h2><p>${s.name.en}, ${s.status.en.toLowerCase()}, INN ${s.inn}, email: <a href="mailto:${s.email}">${s.email}</a>.</p>
<h2>2. What data we receive</h2>
<p>Offline apps store your progress, name, exam date and settings <b>only on your device</b>; they are not sent to us.</p>
<p>When you pay, Robokassa sends us payment details: number, amount, date, the selected product and the contact for the receipt (email or phone) if you provided it. Card data is not transferred to us.</p>
<p>If you email us, we receive your address and the content of your message.</p>
<h2>3. Why</h2><p>To open paid access, issue a receipt, process refunds and answer your requests. We do not use advertising trackers and do not sell data to third parties.</p>
<h2>4. Who receives it</h2><p>Only Robokassa (payment processing) and the Federal Tax Service via the “Moi Nalog” app (receipts) — to the extent required by law.</p>
<h2>5. How long we keep it</h2><p>Payment details — for the period required by tax law. Correspondence — until the issue is resolved, but no longer than 3 years.</p>
<h2>6. Your rights</h2><p>You may request information about your data, its correction or deletion by emailing <a href="mailto:${s.email}">${s.email}</a>. Data on your device is deleted together with the app or with the “Reset progress” button.</p>`;
  return `
<h1>Политика конфиденциальности</h1>
<p class="muted">приложений, сервисов и сайта SHIVERS · редакция от ${S.offerDate.ru}</p>
<h2>1. Кто обрабатывает данные</h2><p>${s.name.ru}, ${s.status.ru.toLowerCase()}, ИНН ${s.inn}, эл. почта: <a href="mailto:${s.email}">${s.email}</a>.</p>
<h2>2. Какие данные мы получаем</h2>
<p>Приложения, работающие без интернета, хранят ваш прогресс, имя, дату экзамена и настройки <b>только на вашем устройстве</b> и нам их не передают.</p>
<p>При оплате платёжный сервис Robokassa передаёт нам сведения о платеже: номер, сумму, дату, выбранный продукт и контакт для чека (электронная почта или телефон), если вы его указали. Данные банковской карты нам не передаются.</p>
<p>Если вы пишете нам на электронную почту, мы получаем ваш адрес и содержание письма.</p>
<h2>3. Зачем</h2><p>Чтобы открыть оплаченный доступ, выдать чек, выполнить возврат и ответить на обращение. Мы не используем рекламные трекеры и не продаём данные третьим лицам.</p>
<h2>4. Кому передаются</h2><p>Только ООО «Робокасса» (приём платежей) и ФНС России через приложение «Мой налог» (чек) — в объёме, необходимом по закону.</p>
<h2>5. Сколько храним</h2><p>Сведения о платежах — в течение срока, установленного налоговым законодательством. Переписку — до решения вопроса, но не дольше 3 лет.</p>
<h2>6. Ваши права</h2><p>Вы можете запросить сведения о своих данных, их исправление или удаление, написав на <a href="mailto:${s.email}">${s.email}</a>. Данные на устройстве удаляются вместе с приложением или кнопкой «Сбросить прогресс».</p>`;
};
