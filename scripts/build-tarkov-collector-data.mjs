/**
 * Generates catalog JSON + lore JSON for the 44 streamer Collector items.
 * Run: node scripts/build-tarkov-collector-data.mjs
 */
import { writeFileSync } from 'node:fs'

/** @typedef {'gear'|'figurines'|'food'|'tools'|'electronics'|'valuables'} GroupId */

/** @type {Array<{ id: string, localeKey: string, name: string, file: string, itemGroup: GroupId, streamerName: string, twitchLogin: string, rarity: string }>} */
const ITEMS = [
  ['p2-nut-sack-balaclava', 'p2NutSackBalaclava', 'Nut Sack balaclava', 'nut-sack-balaclava.webp', 'gear', 'TheBurntPeanut', 'theburntpeanut', 'epic'],
  ['p2-domontovich-ushanka', 'p2DomontovichUshanka', 'Domontovich ushanka hat', 'domontovich-ushanka.webp', 'gear', 'Domontovich', 'domontovich', 'rare'],
  ['p2-glorious-e-mask', 'p2GloriousEMask', 'Glorious E Lightweight Armored Mask', 'glorious-e-lightweight-armored-mask.png', 'gear', 'Glorious_E', 'glorious_e', 'epic'],
  ['p2-pestily-mask', 'p2PestilyMask', 'Pestily plague mask', 'pestily-plague-mask.png', 'gear', 'Pestily', 'pestily', 'legendary'],
  ['p2-shroud-half-mask', 'p2ShroudHalfMask', 'Shroud half-mask', 'shroud-half-mask.png', 'gear', 'Shroud', 'shroud', 'epic'],
  ['p2-smoke-balaclava', 'p2SmokeBalaclava', 'Smoke balaclava', 'smoke-balaclava.png', 'gear', 'Smoke', 'smoke', 'rare'],
  ['p2-johnb-glasses', 'p2JohnbGlasses', 'JohnB Liquid DNB glasses', 'johnb-liquid-dnb-glasses.png', 'gear', 'John B', 'johnb', 'rare'],
  ['p2-viibiin-sneaker', 'p2ViibiinSneaker', 'Viibiin sneaker', 'viibiin-sneaker.png', 'gear', 'Viibiin', 'viibiin', 'rare'],
  ['p2-drd-body-armor', 'p2DrdBodyArmor', 'DRD body armor', 'drd-body-armor.png', 'gear', 'DrLupo', 'drlupo', 'epic'],
  ['p2-fake-mustache', 'p2FakeMustache', 'Fake mustache', 'fake-mustache.png', 'gear', 'Sequisha', 'sequisha', 'common'],
  ['p2-raven-figurine', 'p2RavenFigurine', 'Raven figurine', 'raven-figurine.png', 'figurines', 'Markstrom', 'markstrom', 'legendary'],
  ['p2-axel-parrot', 'p2AxelParrot', 'Axel parrot figurine', 'axel-parrot-figurine.png', 'figurines', 'Axel_TV', 'axel_tv', 'rare'],
  ['p2-loot-lord-plushie', 'p2LootLordPlushie', 'Loot Lord plushie', 'loot-lord-plushie.png', 'figurines', 'DrLupo', 'drlupo', 'epic'],
  ['p2-bear-buddy', 'p2BearBuddy', 'BEAR Buddy plush toy', 'bear-buddy-plush-toy.png', 'figurines', 'Mishka_Bear', 'mishka_bear', 'rare'],
  ['p2-bakeezy-cookbook', 'p2BakeezyCookbook', 'BakeEzy cook book', 'bakeezy-cook-book.png', 'figurines', 'BakeEzy', 'bakeezy', 'common'],
  ['p2-antique-book', 'p2AntiqueBook', 'Battered antique book', 'battered-antique-book.png', 'figurines', 'Kotton', 'kotton', 'rare'],
  ['p2-sheefgg-piggy-bank', 'p2SheefggPiggyBank', 'SheefGG piggy bank', 'sheefgg-piggy-bank.png', 'figurines', 'SheefGG', 'sheefgg', 'legendary'],
  ['p2-ymx-water', 'p2YmxWater', 'Bottle of YMXC water', 'bottle-of-ymxc-water.png', 'food', 'YMXC', 'ymxc', 'rare'],
  ['p2-lupo-coffee', 'p2LupoCoffee', "Can of Dr. Lupo's coffee beans", 'can-of-dr-lupo-coffee-beans.png', 'food', 'DrLupo', 'drlupo', 'epic'],
  ['p2-gigabeef-meat', 'p2GigabeefMeat', 'Can of GigaBeef meat', 'can-of-gigabeef-meat.png', 'food', 'GigaBeef', 'gigabeef', 'rare'],
  ['p2-rat-cola', 'p2RatCola', 'Can of RatCola soda', 'can-of-ratcola-soda.webp', 'food', 'General Sam', 'generalsam', 'epic'],
  ['p2-english-tea-42', 'p2EnglishTea42', '42 Signature Blend English Tea', '42-signature-blend-english-tea.png', 'food', 'Sacriel', 'sacriel', 'rare'],
  ['p2-french-baguette', 'p2FrenchBaguette', 'French bakery baguette', 'french-bakery-baguette.png', 'food', 'Mika', 'mika', 'common'],
  ['p2-fireklean', 'p2Fireklean', '#FireKlean gun lube', 'fireklean-gun-lube.png', 'tools', 'Klean', 'klean', 'legendary'],
  ['p2-deadlyslob-beard-oil', 'p2DeadlyslobBeardOil', "Deadlyslob's beard oil", 'deadlyslob-beard-oil.png', 'tools', 'DeadlySlob', 'deadlyslob', 'common'],
  ['p2-lvndmark-rat-poison', 'p2LvndmarkRatPoison', "LVNDMARK's rat poison", 'lvndmark-rat-poison.png', 'tools', 'LVNDMARK', 'lvndmark', 'epic'],
  ['p2-inseq-wrench', 'p2InseqWrench', 'Inseq gas pipe wrench', 'inseq-gas-pipe-wrench.png', 'tools', 'Inseq', 'inseq', 'rare'],
  ['p2-tigzresq-splint', 'p2TigzresqSplint', 'Tigzresq splint', 'tigzresq-splint.webp', 'tools', 'Tigzresq', 'tigzresq', 'rare'],
  ['p2-old-firesteel', 'p2OldFiresteel', 'Old firesteel', 'old-firesteel.png', 'tools', 'Eroktic', 'eroktic', 'rare'],
  ['p2-dunduk-floppy', 'p2DundukFloppy', 'Dunduk floppy disk', 'dunduk-floppy-disk.png', 'electronics', 'Dunduk', 'dunduk', 'epic'],
  ['p2-golden-1gphone', 'p2Golden1GPhone', 'Golden 1GPhone smartphone', 'golden-1gphone-smartphone.png', 'electronics', 'summit1g', 'summit1g', 'legendary'],
  ['p2-desmondpilak-cd', 'p2DesmondpilakCd', 'DesmondPilak CD', 'desmondpilak-cd.png', 'electronics', 'DesmondPilak', 'desmondpilak', 'rare'],
  ['p2-cyborg-killer-vhs', 'p2CyborgKillerVhs', 'Video cassette with the Cyborg Killer movie', 'cyborg-killer-vhs.png', 'electronics', 'Bullseye', 'bullseye', 'epic'],
  ['p2-wz-wallet', 'p2WzWallet', 'WZ Wallet', 'wz-wallet.png', 'electronics', 'WillerZ', 'willerz', 'epic'],
  ['p2-gingy-keychain', 'p2GingyKeychain', 'Gingy keychain', 'gingy-keychain.png', 'electronics', 'Gingy', 'gingy', 'rare'],
  ['p2-missam-forklift-key', 'p2MissamForkliftKey', 'Missam forklift key', 'missam-forklift-key.png', 'electronics', 'Missam', 'missam', 'rare'],
  ['p2-veritas-guitar-pick', 'p2VeritasGuitarPick', 'Veritas guitar pick', 'veritas-guitar-pick.png', 'valuables', 'Veritas', 'veritas', 'legendary'],
  ['p2-baddie-red-beard', 'p2BaddieRedBeard', "Baddie's red beard", 'baddie-red-beard.png', 'valuables', 'Baddie', 'baddie', 'rare'],
  ['p2-tamatthi-kunai', 'p2TamatthiKunai', 'Tamatthi kunai knife replica', 'tamatthi-kunai-replica.png', 'valuables', 'Tamatthi', 'tamatthi', 'common'],
  ['p2-kc130-model', 'p2Kc130Model', 'LM KC-130 model aircraft', 'lm-kc-130-model-aircraft.png', 'valuables', 'Onepeg', 'onepeg', 'legendary'],
  ['p2-silver-badge', 'p2SilverBadge', 'Silver Badge', 'silver-badge.png', 'valuables', 'DeadlySlob', 'deadlyslob', 'secret'],
  ['p2-antique-axe', 'p2AntiqueAxe', 'Antique axe', 'antique-axe.png', 'valuables', 'Grimmmz', 'grimmmz', 'legendary'],
  ['p2-golden-rooster', 'p2GoldenRooster', 'Golden rooster figurine', 'golden-rooster-figurine.png', 'valuables', 'Community', 'community', 'epic'],
  ['p2-golden-egg', 'p2GoldenEgg', 'Golden egg', 'golden-egg.png', 'valuables', 'BadJuJu', 'badjuju', 'epic'],
].map(
  ([id, localeKey, name, file, itemGroup, streamerName, twitchLogin, rarity]) => ({
    id,
    localeKey,
    name,
    file,
    itemGroup,
    streamerName,
    twitchLogin,
    rarity,
  }),
)

/** @type {Record<string, { ru: { description: string, funFact: string }, en: { description: string, funFact: string } }>} */
const LORE = {
  p2NutSackBalaclava: {
    ru: {
      description:
        'Вязаный головной убор, закрывающий голову и лицо, оставляя открытыми только глаза. Изготовлен из плотной шерсти и отлично защищает от холода. Снабжен этикеткой "Nut Sack".',
      funFact:
        'Предмет посвящен стримеру TheBurntPeanut. В англоязычном сообществе словосочетание «Nut sack» имеет весьма пикантное сленговое значение, поэтому появление балаклавы с таким названием вызвало тонны шуток во время стримов.',
    },
    en: {
      description:
        'A knit headpiece that covers the head and face, leaving only the eyes exposed. Made of dense wool and great against the cold. Bears a "Nut Sack" label.',
      funFact:
        'Dedicated to streamer TheBurntPeanut. In English slang, "nut sack" has a very cheeky meaning, so a balaclava with this name sparked endless jokes on stream.',
    },
  },
  p2DomontovichUshanka: {
    ru: {
      description:
        'Обычная зимняя шапка-ушанка с кокардой. На внутренней стороне аккуратно вышита фамилия владельца — Домонтович.',
      funFact:
        'Эта шапка создана в честь Андрея Домонтовича — известного русскоязычного стримера и блогера (канал Дядя Дёма), который прославился своими душевными стримами и гайдами, где он часто сидел в подобном головном уборе.',
    },
    en: {
      description:
        'A regular winter ushanka with a cockade. The owner\'s surname — Domontovich — is neatly embroidered on the inside.',
      funFact:
        'Made for Andrey Domontovich, the Russian streamer behind Dyadya Dyoma, known for cozy streams and guides where he often wore this kind of hat.',
    },
  },
  p2GloriousEMask: {
    ru: {
      description:
        'Стильная защитная полумаска, обеспечивающая легкую баллистическую защиту лица. На внутренней стороне выгравировано клеймо Glorious E.',
      funFact:
        'Стример Glorious_E известен своей невероятной агрессивной стрельбой и тем, что почти всегда играет в Таркове в очках и с полумаской на лице своего персонажа. Разработчики просто перенесли его любимый стиль в игру.',
    },
    en: {
      description:
        'A stylish protective half-mask that offers light ballistic protection for the face. "Glorious E" is stamped on the inside.',
      funFact:
        'Glorious_E is known for hyper-aggressive gunplay and almost always running Tarkov with glasses and a half-mask. BSG copied his look straight into the game.',
    },
  },
  p2PestilyMask: {
    ru: {
      description:
        'Аутентичная кожаная маска чумного доктора с длинным клювом. Выглядит зловеще, пахнет травами и старой кожей.',
      funFact:
        'Посвящена Pestily — «лицу» мирового сообщества Таркова. Во время своих знаменитых благотворительных марафонов (где он собирал сотни тысяч долларов для детей) он надевал реальную маску чумного доктора прямо на стриме за достижение определенных целей по донатам.',
    },
    en: {
      description:
        'An authentic leather plague doctor mask with a long beak. Looks ominous and smells of herbs and old leather.',
      funFact:
        'Dedicated to Pestily, the face of Tarkov worldwide. During charity marathons that raised hundreds of thousands for kids, he wore a real plague mask on stream when donation goals were hit.',
    },
  },
  p2ShroudHalfMask: {
    ru: {
      description:
        'Защитная полумаска из неопрена с логотипом Shroud. Отлично защищает дыхательные пути от пыли, гари и чужих взглядов.',
      funFact:
        'Легенда шутеров Shroud зашел в Тарков на заре его популярности. Battlestate Games настолько обрадовались его приходу, что оперативно добавили эту маску. Долгое время она была главным символом «богатого и опытного» игрока.',
    },
    en: {
      description:
        'A neoprene half-mask with the Shroud logo. Keeps dust, smoke, and unwanted stares out of your airways.',
      funFact:
        'FPS legend Shroud jumped into Tarkov early. BSG was so happy they added this mask quickly — for a long time it was the flex of a rich, experienced player.',
    },
  },
  p2SmokeBalaclava: {
    ru: {
      description:
        'Черная тактическая балаклава из огнеупорного материала. Излюбленный элемент экипировки скрытных бойцов.',
      funFact:
        'Предмет стримера Smoke, ветерана хардкорных симуляторов и DayZ. Он славится своим кинематографичным, тактическим стилем игры и глубоким радио-голосом. Черная маска идеально отражает его скрытный геймплей.',
    },
    en: {
      description:
        'A black tactical balaclava made of fire-resistant material. A favorite piece for stealthy operators.',
      funFact:
        'Tied to Smoke, a hardcore sim and DayZ veteran known for cinematic tactical play and a deep radio voice. The black mask fits his low-profile style.',
    },
  },
  p2JohnbGlasses: {
    ru: {
      description:
        'Солнцезащитные очки в футуристичной оправе. Линзы имеют особое зеркальное напыление. На дужке красуется надпись Liquid DNB.',
      funFact:
        'Посвящены знаменитому британскому диджею и стримеру John B, который играет музыку в стиле Drum & Bass. Он проводил стримы по Таркову прямо из своей музыкальной студии, всегда в неоновых футуристических очках.',
    },
    en: {
      description:
        'Sunglasses in a futuristic frame with mirrored lenses. "Liquid DNB" is printed on the temple.',
      funFact:
        'Dedicated to British DJ and streamer John B (Drum & Bass). He streamed Tarkov from his studio, always in neon futuristic shades.',
    },
  },
  p2ViibiinSneaker: {
    ru: {
      description:
        'Спортивная кроссовка известного бренда, судя по состоянию — побывавшая не в одной переделке. На подошве можно разглядеть логотип Viibiin.',
      funFact:
        'Стример Viibiin славится своей гиперактивностью, безумным стилем передвижения по карте и прыжками. Кроссовка в игре — это шутка о том, что его персонаж постоянно «бежит сломя голову».',
    },
    en: {
      description:
        'A name-brand athletic shoe that has clearly seen a few fights. The Viibiin logo is visible on the sole.',
      funFact:
        'Viibiin is hyperactive with wild movement and constant jumping. The in-game sneaker jokes that his PMC never stops sprinting.',
    },
  },
  p2DrdBodyArmor: {
    ru: {
      description:
        'Легкий бронежилет скрытого ношения, кастомизированный яркими граффити и логотипом DRD. Ззащита так себе, но стиль неоспорим.',
      funFact:
        'Отсылка к стримеру DrLupo (его старый никнейм/тег — DrD). Жилет имеет расцветку его бренда. Это один из немногих стримерских бронежилетов, который можно реально надеть, хотя его защитные свойства в игре умышленно сделаны слабыми — чисто ради стиля.',
    },
    en: {
      description:
        'A concealed-carry light vest customized with bright graffiti and a DRD logo. Protection is mediocre, style is not.',
      funFact:
        'A nod to DrLupo (old tag DrD). You can actually wear it, but protection is deliberately weak — pure fashion flex.',
    },
  },
  p2FakeMustache: {
    ru: {
      description:
        'Искусственные усы на клейкой основе. Отличный элемент маскировки, если вам нужно прикинуться кем-то другим или просто поднять настроение товарищам.',
      funFact:
        'Скрытая отсылка к стримеру Sequisha, который обладает роскошными реальными усами. Позже эти усы стали мемом: игроки надевают их вместе с очками, чтобы косплеить «внедренного агента» или мешать тиммейтам серьезно воспринимать их персонажа.',
    },
    en: {
      description:
        'Fake adhesive mustache. Great for disguises or just ruining your squad\'s seriousness.',
      funFact:
        'A wink at Sequisha\'s legendary real mustache. Players pair it with glasses to cosplay "undercover agents" and troll teammates.',
    },
  },
  p2RavenFigurine: {
    ru: {
      description:
        'Изящная статуэтка ворона, отлитая из темного металла. Похоже, это наградной трофей за победу в каком-то старом турнире.',
      funFact:
        'Это не просто предмет — это реальный кубок! Предмет был добавлен в игру как физическое воплощение награды за победу в первом официальном стримерском турнире Tarkov Twitch Rivals.',
    },
    en: {
      description:
        'An elegant raven figurine cast in dark metal. Looks like a trophy from an old tournament win.',
      funFact:
        'It mirrors a real trophy — added after Markstrom won the first official Tarkov Twitch Rivals streamer tournament.',
    },
  },
  p2AxelParrot: {
    ru: {
      description:
        'Раскрашенная вручную фарфоровая фигурка попугая. На подставке выведена аккуратная надпись — Axel.',
      funFact:
        'Посвящена стримеру Axel_TV. На его стримах зрители часто слышали его реального домашнего попугая, который громко комментировал происходящее на заднем плане и мешал слушать шаги врагов в игре.',
    },
    en: {
      description:
        'A hand-painted porcelain parrot figurine. "Axel" is neatly written on the stand.',
      funFact:
        'For Axel_TV, whose real pet parrot often shouted over the game and made hearing footsteps impossible.',
    },
  },
  p2LootLordPlushie: {
    ru: {
      description:
        'Небольшая плюшевая игрушка в короне и мантии, известная среди местных как "Лут Лорд". Приносит удачу тем, кто ищет ценный хабар.',
      funFact:
        'Еще один предмет DrLupo, которого сообщество прозвало «Королем Лута» (Loot Lord) за его невероятную удачу при обыске ящиков. Игрушка выглядит как мемный мембер его канала.',
    },
    en: {
      description:
        'A small plush in a crown and robe, known locally as the "Loot Lord". Luck for loot goblins.',
      funFact:
        'Another DrLupo item — chat crowned him Loot Lord for absurd container RNG. The plush is basically channel merch.',
    },
  },
  p2BearBuddy: {
    ru: {
      description:
        'Плюшевый мишка в миниатюрном камуфляже ЧВК BEAR. Суровый, но милый спутник для любого бойца.',
      funFact:
        'Стример Mishka (или Mishka_Bear) получил этот предмет благодаря своему никнейму. Игрушка стала настолько популярной, что BSG позже выпустили ее ограниченным тиражом в виде реального мерча, который фанаты раскупили за считанные минуты.',
    },
    en: {
      description:
        'A plush bear in mini BEAR PMC camo. Tough but cute company for any fighter.',
      funFact:
        'For Mishka_Bear — the nickname became loot. Real merch sold out in minutes after fans fell in love with it.',
    },
  },
  p2BakeezyCookbook: {
    ru: {
      description:
        'Потрепанное кулинарное руководство с кучей заметок на полях и кустарных рецептов на все случаи жизни. На обложке красуется BakeEzy.',
      funFact:
        'Стример BakeEzy прославился тем, что мог во время долгих и занудных рейдов или ожидания в лобби начать увлеченно обсуждать рецепты еды со своим чатом. Книга — ироничный намек на то, что в Таркове кулинария важнее стрельбы.',
    },
    en: {
      description:
        'A worn cookbook full of margin notes and improvised recipes. "BakeEzy" on the cover.',
      funFact:
        'BakeEzy would discuss cooking with chat during slow raids. The book jokes that cuisine beats gunfights in Tarkov.',
    },
  },
  p2AntiqueBook: {
    ru: {
      description:
        'Старинный фолиант в кожаном переплете. Страницы пожелтели от времени, а текст написан на давно забытом языке.',
      funFact:
        'Предмет посвящен стримеру и лороведу Kotton (один из самых первых стримеров Таркова). Он обожал копаться в скрытых деталях игры. Текст в книге — это зашифрованная пасхалка от разработчиков с благодарностью первым игрокам альфа-теста.',
    },
    en: {
      description:
        'An old leather-bound tome. Yellowed pages and text in a long-forgotten language.',
      funFact:
        'For lore nerd Kotton, one of Tarkov\'s earliest streamers. The text is a dev Easter egg thanking alpha testers.',
    },
  },
  p2SheefggPiggyBank: {
    ru: {
      description:
        'Керамическая копилка в виде пухлой свинки с логотипом SheefGG. Внутри приятно звенят монеты, а сама конструкция на удивление прочная.',
      funFact:
        'Посвящена SheefGG, стримеру, известному своими безумными челленджами на миллиарды внутриигровых рублей. Прикольно то, что эта копилка в игре функциональна: она занимает 1 слот в инвентаре, но внутри имеет 4 слота, в которые можно прятать только наличные деньги.',
    },
    en: {
      description:
        'A ceramic piggy bank with the SheefGG logo. Coins rattle inside; surprisingly sturdy.',
      funFact:
        'SheefGG runs insane ruble challenges. In-game it\'s functional: 1 inventory slot, 4 inner slots for cash only.',
    },
  },
  p2YmxWater: {
    ru: {
      description:
        'Бутылка чистейшей артезианской воды под брендом YMXC. Отлично утоляет жажду в условиях жаркого тарковского лета.',
      funFact:
        'Этот предмет посвящен популярному китайскому стримеру YMXC. Введение этой бутылки ознаменовало официальное признание огромного вклада азиатского комьюнити в развитие и популярность игры.',
    },
    en: {
      description:
        'A bottle of pristine artesian water branded YMXC. Quenches thirst in Tarkov\'s hot summers.',
      funFact:
        'Dedicated to Chinese streamer YMXC — a nod to Asia\'s huge role in Tarkov\'s growth.',
    },
  },
  p2LupoCoffee: {
    ru: {
      description:
        'Жестяная банка с отборными кофейными зернами от Dr. Lupo. Один только запах этого кофе способен поднять на ноги мертвого ЧВК.',
      funFact:
        'Третий(!) предмет DrLupo. Стример известен своей фанатичной любовью к качественному кофе. Банка стала мемом, так как в реальной жизни бренд кофе DrLupo жертвовал часть прибыли в онкологическую клинику St. Jude.',
    },
    en: {
      description:
        'A tin of premium coffee beans from Dr. Lupo. The smell alone could revive a dead PMC.',
      funFact:
        'DrLupo\'s third item — he loves good coffee. IRL his coffee brand donates to St. Jude Children\'s Hospital.',
    },
  },
  p2GigabeefMeat: {
    ru: {
      description:
        'Армейская тушеная говядина повышенной калорийности. На этикетке гордо красуется надпись GigaBeef. Сытно и надежно.',
      funFact:
        'Создано в честь стримера GigaBeef, который делает невероятно подробные технические разборы механик игры и оружия. Банка тушенки — метафора его «плотного и питательного» контента.',
    },
    en: {
      description:
        'High-calorie military stew. "GigaBeef" on the label — filling and reliable.',
      funFact:
        'For GigaBeef\'s deep-dive mechanics content. The stew can is a metaphor for dense, nutritious videos.',
    },
  },
  p2RatCola: {
    ru: {
      description:
        'Энергетический сильногазированный напиток с ароматом колы. Любимый выбор всех местных "крыс", коротающих время в засадах.',
      funFact:
        'Предмет стримера General Sam, который легализовал и популяризировал стиль игры «Крыса» (сидение в кустах и на выходах). На банке изображена крыса, а сам напиток стал неофициальным гимном всех кемперов Таркова.',
    },
    en: {
      description:
        'Highly carbonated cola-flavored energy drink. Favorite of local "rats" camping exits.',
      funFact:
        'General Sam popularized rat play. The can shows a rat; RatCola is the unofficial anthem of campers.',
    },
  },
  p2EnglishTea42: {
    ru: {
      description:
        'Упаковка элитного английского чая "42 Signature Blend". Изысканный вкус посреди разрушенного и опасного города.',
      funFact:
        'Посвящен стримеру Sacriel. Цифра 42 — его любимое число (и отсылка к книге «Автостопом по галактике», где 42 — ответ на вопрос о смысле жизни). Будучи истинным британцем, он пил чай почти на каждом стриме.',
    },
    en: {
      description:
        'A pack of elite English tea, "42 Signature Blend". Refined taste amid a ruined city.',
      funFact:
        'For Sacriel — 42 is his favorite number (Hitchhiker\'s Guide). True Brit; tea on nearly every stream.',
    },
  },
  p2FrenchBaguette: {
    ru: {
      description:
        'Хрустящий французский багет из местной пекарни. Удивительно, как он умудрился остаться свежим в этом хаосе.',
      funFact:
        'Посвящен францuzскому стримеру Mika (Mika_Twitch). Долгое время сообщество шутило, что багет — самое опасное холодное оружие в игре, так как его физическая модель была очень твердой и длинной.',
    },
    en: {
      description:
        'A crispy French baguette from a local bakery. Somehow still fresh in the chaos.',
      funFact:
        'For French streamer Mika. Chat joked the baguet was the deadliest melee weapon thanks to its stiff, long model.',
    },
  },
  p2Fireklean: {
    ru: {
      description:
        'Высококачественное синтетическое масло для чистки и смазки оружия. Обеспечивает плавную работу механизмов даже в самый жесткий мороз.',
      funFact:
        'Самый первый стримерский предмет в истории Таркова! Он посвящен стримеру Kleano (Klean). В реальности бренд FireKlean существовал и судился с блогерами, утверждавшими, что их оружейное масло — это обычное рапсовое масло для жарки.',
    },
    en: {
      description:
        'Premium synthetic gun oil for cleaning and lubrication. Smooth action even in hard frost.',
      funFact:
        'The first streamer item in Tarkov history — for Klean. Real-world FireKlean even sued bloggers who said it was just cooking oil.',
    },
  },
  p2DeadlyslobBeardOil: {
    ru: {
      description:
        'Специальное средство по уходу за тактической бородой от Deadlyslob. Придает волосам мягкость и приятный брутальный аромат дерева.',
      funFact:
        'Посвящено канадскому стримеру Deadlyslob, первопроходцу хардкорных челленджей в Таркове. Его роскошная борода стала его визитной карточкой, поэтому Никита Буянов (глава BSG) лично одобрил добавление этого масла.',
    },
    en: {
      description:
        'Deadlyslob\'s tactical beard oil. Soft hair and a woody, rugged scent.',
      funFact:
        'For Canadian pioneer DeadlySlob. His beard is iconic — Nikita Buyanov personally signed off on the oil.',
    },
  },
  p2LvndmarkRatPoison: {
    ru: {
      description:
        'Сильнодействующее химическое вещество для борьбы с грызунами от бренда LVNDMARK. Крайне токсично, использовать с осторожностью.',
      funFact:
        'Посвящено LVNDMARK — одному из самых скилловых и агрессивных «чадов» (игроков, ищущих ПВП). Он искренне ненавидит «крыс» (стримеров и игроков, сидящих в засадах). Разработчики пошутили и дали ему в качестве именного предмета... яд против крыс.',
    },
    en: {
      description:
        'LVNDMARK-brand rodent poison. Highly toxic — handle with care.',
      funFact:
        'LVNDMARK hates rat play. Devs trolled him with rat poison as his named item.',
    },
  },
  p2InseqWrench: {
    ru: {
      description:
        'Тяжелый профессиональный трубный ключ, выкрашенный в ярко-красный цвет. На рукоятке выбито клеймо Inseq.',
      funFact:
        'Предмет польского стримера Inseq. Красный цвет ключа — прямая отсылка к культовой игре Half-Life и монтировке Гордона Фримена, фанатом которой является стример.',
    },
    en: {
      description:
        'A heavy professional pipe wrench painted bright red. "Inseq" stamped on the handle.',
      funFact:
        'Polish streamer Inseq — red wrench nods to Half-Life and Gordon Freeman\'s crowbar.',
    },
  },
  p2TigzresqSplint: {
    ru: {
      description:
        'Эластичная медицинская шина Tigzresq для фиксации переломов с логотипом Tigzresq. Быстро накладывается и надежно держит поврежденную конечность.',
      funFact:
        'Стример Tigz известен тем, что постоянно ломает ноги своему персонажу, прыгая с крыш санатория на Берегу или со скал ради эффектных фрагов. Именная шина — тонкий троллинг его стиля игры.',
    },
    en: {
      description:
        'Elastic Tigzresq splint for fractures. Quick to apply, holds the limb steady.',
      funFact:
        'Tigz breaks legs constantly with stunt jumps — the splint is gentle trolling of his playstyle.',
    },
  },
  p2OldFiresteel: {
    ru: {
      description:
        'Старое надежное огниво из магниевого сплава. Позволяет добыть огонь в любых погодных условиях, когда промокли все спички.',
      funFact:
        'Предмет посвящен выживальщику и стримеру Eroktic. На заре Таркова он прославился своими эксцентричными криками «Fire! Fire!» во время перестрелок.',
    },
    en: {
      description:
        'Old reliable magnesium firesteel. Fire in any weather when matches are soaked.',
      funFact:
        'For survivalist Eroktic, famous for yelling "Fire! Fire!" during early Tarkov firefights.',
    },
  },
  p2DundukFloppy: {
    ru: {
      description:
        'Старая 3.5-дюймовая дискета, на которой маркером написано "Dunduk". Что на ней записано — секретные шифры или старая игра — загадка.',
      funFact:
        'Посвящена русскоязычному стримеру Dunduk. Мем в том, что дискета в век терабайтных SSD выглядит максимально устаревшей, что намекает на «древние» тактики стримера и его олдскульный подход к играм.',
    },
    en: {
      description:
        'An old 3.5" floppy labeled "Dunduk" in marker. Secrets or an old game — who knows.',
      funFact:
        'For Russian streamer Dunduk — a floppy in the SSD era jokes about his old-school tactics.',
    },
  },
  p2Golden1GPhone: {
    ru: {
      description:
        'Эксклюзивная модель смартфона в корпусе из чистого золота. Электроника давно сдохла, но как ценный слиток металла он невероятно хорош.',
      funFact:
        'Самая известная отсылка к стримеру Summit1g. Во времена, когда он только пришел в Тарков, его фирменной фишкой было заглядывать в свой реальный телефон прямо во время рейдов, из-за чего его персонажа часто убивали на месте.',
    },
    en: {
      description:
        'Exclusive smartphone in solid gold. Dead electronics, excellent bullion.',
      funFact:
        'Summit1g\'s iconic phone-check during raids got his PMC killed constantly — hence the golden 1GPhone.',
    },
  },
  p2DesmondpilakCd: {
    ru: {
      description:
        'Компакт-диск в треснувшем пластиковом боксе. На поверхности диска корявым почерком выведено DesmondPilak.',
      funFact:
        'Посвящен стримеру DesmondPilak. Диск символизирует его любовь к ретро-музыке и привычку включать старые треки во время долгих рейдов.',
    },
    en: {
      description:
        'A CD in a cracked case. "DesmondPilak" scrawled on the disc.',
      funFact:
        'DesmondPilak loves retro music and played old tracks on long raids — the CD is that vibe.',
    },
  },
  p2CyborgKillerVhs: {
    ru: {
      description:
        'Раритетная кассета формата VHS с культовым боевиком конца 80-х. Настоящая находка для ценителей эпохи видеосалонов.',
      funFact:
        'Предмет стримера Bullseye. Название «Киборг-убийца» — это локальный мем сообщества, обозначающий идеальную точность ботов-Диких, которые в прошлых патчах могли поставить headshot через полкарты сквозь кусты.',
    },
    en: {
      description:
        'Rare VHS of a late-80s action cult classic. Video-store era treasure.',
      funFact:
        '"Cyborg Killer" is a community meme for scarily accurate Scav bots that headshoted through bushes across the map.',
    },
  },
  p2WzWallet: {
    ru: {
      description:
        'Потертое кожаное портмоне с тиснением WZ. Внутри можно найти пару потайных отделений для особо ценных купюр или карт.',
      funFact:
        'Посвящен стримеру WillerZ, мастеру невероятного паркура в Таркове. Он находил такие геометрические баги на картах, что мог запрыгнуть на крышу, куда обычный игрок физически не попадет. Кошелек — намек на его умение находить заначки в самых неожиданных местах.',
    },
    en: {
      description:
        'Worn leather wallet embossed WZ. Hidden pockets for valuable bills or cards.',
      funFact:
        'WillerZ parkour king — wallet nods to stashes in impossible spots via geometry bugs.',
    },
  },
  p2GingyKeychain: {
    ru: {
      description:
        'Текстильная ключница ручной работы с забавным принтом от Gingy. Помогает держать все мелкие ключи в одном надежном месте.',
      funFact:
        'Предмет стримерши Gingy. Это один из самых полезных стримерских предметов, потому что, в отличие от остальных «бесполезных безделушек», ключница Gingy является полноценным контейнером для ключей на ранних этапах вайпа.',
    },
    en: {
      description:
        'Handmade fabric key pouch with a Gingy print. Keeps small keys together.',
      funFact:
        'One of the few useful streamer items — a real key container early wipe, not just a trinket.',
    },
  },
  p2MissamForkliftKey: {
    ru: {
      description:
        'Небольшой ключ со штампованным логотипом Missam. Предназначен для запуска дизельного вилочного погрузчика.',
      funFact:
        'Посвящен стримеру Missam. Игроки долгое время пытались найти тот самый погрузчик на карте «Завод», чтобы завести его, думая, что это скрытый квест, пока разработчики не подтвердили, что это просто коллекционный сувенир.',
    },
    en: {
      description:
        'Small key stamped with Missam\'s logo. Starts a diesel forklift — in theory.',
      funFact:
        'Players hunted Factory for a drivable forklift quest for ages — it\'s just a collectible souvenir.',
    },
  },
  p2VeritasGuitarPick: {
    ru: {
      description:
        'Фирменный медиатор для электрогитары с гравировкой Veritas. Сделан из прочного пластика, почти не изношен.',
      funFact:
        'Стример Veritas в реальной жизни является профессиональным музыкантом и гитаристом, а также программистом (он создал культовое мобильное приложение-справочник по Таркову Battle Buddy).',
    },
    en: {
      description:
        'Veritas-branded guitar pick, tough plastic, barely worn.',
      funFact:
        'Veritas is a pro musician and dev of the Battle Buddy Tarkov app.',
    },
  },
  p2BaddieRedBeard: {
    ru: {
      description:
        'Бутафорская накладная борода ярко-рыжего цвета. Принадлежала какому-то эксцентричному местному выживальщику.',
      funFact:
        'Предмет стримера Baddie. Он славится своей ярко-рыжей бородой в реальной жизни. Бороду можно надеть на персонажа, и она дает забавный эффект — лицо вашего ЧВК становится видно за километр из-за ее яркости.',
    },
    en: {
      description:
        'Bright red fake beard. Belonged to some eccentric local survivor.',
      funFact:
        'Baddie\'s real ginger beard — equippable in-game and visible from a kilometer away.',
    },
  },
  p2TamatthiKunai: {
    ru: {
      description:
        'Сувенирная копия японского метательного ножа кунай. Металл мягкий, для реального боя не годится, но выглядит стильно.',
      funFact:
        'Посвящен стримеру Tamatthi, фанату аниме и японской культуры. Предмет высмеивает тот факт, что в суровом военном Таркове этот нож абсолютно бесполезен и является дешевой китайской штамповкой.',
    },
    en: {
      description:
        'Souvenir kunai replica. Soft metal, useless in combat, looks cool.',
      funFact:
        'Tamatthi loves anime — the kunai mocks useless mall-ninja loot in a military sim.',
    },
  },
  p2Kc130Model: {
    ru: {
      description:
        'Пластиковая масштабная модель военно-транспортного самолета Lockheed KC-130. Детализированный сувенир для фанатов авиации.',
      funFact:
        'Посвящен стримеру Onepeg, который делает подробнейшие разборы патчноутов и экономики игры. KC-130 — это тот самый самолет, который сбрасывает Аирдропы (гуманитарную помощь) на карты в Таркове.',
    },
    en: {
      description:
        'Scale model of a Lockheed KC-130 transport. Detailed aviation souvenir.',
      funFact:
        'Onepeg patch/economy breakdowns — the KC-130 is the plane that drops airdrops in Tarkov.',
    },
  },
  p2SilverBadge: {
    ru: {
      description:
        'Старинный наградной жетон из серебра высокой пробы. На лицевой стороне изображена геральдическая символика.',
      funFact:
        'Посвящен стримеру DeadlySlob (его второй предмет). Изначально планировался как награда за внутренние хардкор-соревнования между стримерами.',
    },
    en: {
      description:
        'Old award token of fine silver with heraldic engraving on the face.',
      funFact:
        'DeadlySlob\'s second item — originally meant as a prize for internal streamer hardcore events.',
    },
  },
  p2AntiqueAxe: {
    ru: {
      description:
        'Старинный кованый топор с резным топорищем. Несмотря на возраст, лезвие остается бритвенно острым.',
      funFact:
        'Посвящен легендарному стримеру Grimmmz. Этот топор был добавлен во времена расцвета «топористов» — голых игроков, которые бежали к ценному луту только с холодным оружием в руках.',
    },
    en: {
      description:
        'Old forged axe with carved handle. Blade still razor sharp.',
      funFact:
        'For Grimmmz — added during the "hatchet runners" era of naked melee loot sprints.',
    },
  },
  p2GoldenRooster: {
    ru: {
      description:
        'Фарфоровая статуэтка петуха, покрытая сусальным золотом. Дорогая безделушка, которую часто прятали в сейфах богатые жители Таркова.',
      funFact:
        'Изначально задумывался как обычный ценный лут, но Скупщик забрал его в квест «Коллекционер» как дань уважения мему о «Петухах» — так в русскоязычном комьюнити иногда в шутку называют неопытных ЧВК, которые случайно выдают свои позиции глупыми звуками.',
    },
    en: {
      description:
        'Porcelain rooster figurine gilded with gold leaf. Rich Tarkov citizens hid these in safes.',
      funFact:
        'Became a Collector quest item — homage to the "rooster" meme for noisy newbie PMCs in RU chat.',
    },
  },
  p2GoldenEgg: {
    ru: {
      description:
        'Массивное ювелирное изделие из золота, инкрустированное мелкими камнями. Настоящее сокровище для любого мародера.',
      funFact:
        'Посвящено стримеру BadJuJu и его локальной шутке про «стальные яйца», которые необходимы игроку, чтобы в одиночку ходить на локацию Лаборатория и воевать с читерами и Рейдерами.',
    },
    en: {
      description:
        'Heavy gold jewelry piece studded with small gems. Any looter\'s dream.',
      funFact:
        'BadJuJu\'s "steel balls" joke — what you need to solo Labs against cheaters and Raiders.',
    },
  },
}

// Fix typos from copy-paste
LORE.p2DrdBodyArmor.ru.description = LORE.p2DrdBodyArmor.ru.description.replace(
  'Ззащита',
  'Защита',
)
LORE.p2FrenchBaguette.ru.funFact = LORE.p2FrenchBaguette.ru.funFact.replace(
  'францuzскому',
  'французскому',
)

const catalogPath = new URL(
  '../src/features/projects/data/tarkov-collector-items.json',
  import.meta.url,
)
const lorePath = new URL('./data/tarkov-collector-lore.json', import.meta.url)

writeFileSync(catalogPath, `${JSON.stringify(ITEMS, null, 2)}\n`)
writeFileSync(lorePath, `${JSON.stringify(LORE, null, 2)}\n`)

console.log('Wrote', ITEMS.length, 'catalog items and lore keys')
