-- MySQL dump 10.13  Distrib 5.6.28, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: hehe
-- ------------------------------------------------------
-- Server version	5.6.28-0ubuntu0.15.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `i18n_strings`
--

DROP TABLE IF EXISTS `i18n_strings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i18n_strings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `en-US` varchar(1000) DEFAULT NULL,
  `ru-RU` varchar(1000) DEFAULT NULL,
  `es-ES` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx-i18n_strings-name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `i18n_strings`
--

LOCK TABLES `i18n_strings` WRITE;
/*!40000 ALTER TABLE `i18n_strings` DISABLE KEYS */;
INSERT INTO `i18n_strings` VALUES (1,'layout/main-menu/about_us','About us','О нас',NULL),(2,'layout/main-menu/help','Help','Помочь проекту',NULL),(3,'layout/main-menu/volunteers','Volunteers','Стать волонтером',NULL),(4,'layout/main-menu/news','News','Новости',NULL),(5,'layout/main-menu/contacts','Contacts','Контакты',NULL),(6,NULL,'Виктория Валикова','Виктория Валикова','Виктория Валикова'),(7,NULL,'Основатель, врач','Основатель, врач','Основатель, врач'),(8,NULL,'Карина Башарова','Карина Башарова','Карина Башарова'),(9,NULL,'Исполнительный директор, врач','Исполнительный директор, врач','Исполнительный директор, врач'),(10,NULL,'Сергио Оттониель Кастийо Мендоза','Сергио Оттониель Кастийо Мендоза','Сергио Оттониель Кастийо Мендоза'),(11,NULL,'Основатель, врач','Основатель, врач','Основатель, врач'),(12,NULL,'Михаил Шишин','Михаил Шишин','Михаил Шишин'),(13,NULL,'Архитектор','Архитектор','Архитектор'),(14,NULL,'Игорь Енин','Игорь Енин','Игорь Енин'),(15,NULL,'Главный инженер','Главный инженер','Главный инженер'),(16,NULL,'Маргарита Кудрявцева','Маргарита Кудрявцева','Маргарита Кудрявцева'),(17,NULL,'Рекрутер','Рекрутер','Рекрутер'),(18,NULL,'Яна Захарова','Яна Захарова','Яна Захарова'),(19,NULL,'Бухгалтер','Бухгалтер','Бухгалтер'),(20,NULL,'Дарья Царик','Дарья Царик','Дарья Царик'),(21,NULL,'Фандрайзер','Фандрайзер','Фандрайзер'),(22,NULL,'Михаил Никифоров','Михаил Никифоров','Михаил Никифоров'),(23,NULL,'Координатор дистанционных волонтеров','Координатор дистанционных волонтеров','Координатор дистанционных волонтеров'),(24,NULL,'Лариса Мельникова','Лариса Мельникова','Лариса Мельникова'),(25,NULL,'Управление IT-проектами и переговорами','Управление IT-проектами и переговорами','Управление IT-проектами и переговорами'),(26,NULL,'Елизавета Шишина','Елизавета Шишина','Елизавета Шишина'),(27,NULL,'Архитектор','Архитектор','Архитектор'),(28,NULL,'building','строительство',NULL),(29,NULL,'finance','финансы',NULL),(30,NULL,NULL,'спонсоры',NULL),(31,NULL,NULL,'медикаменты',NULL),(34,NULL,NULL,'краудфандинг 2',NULL),(35,NULL,NULL,'Health&Help запускает краудфандинг кампанию',NULL),(36,NULL,NULL,'Первые новости о ходе кампании',NULL),(37,NULL,NULL,'офтальмологическая программа',NULL),(38,NULL,NULL,'Запускаем офтальмологическую программу',NULL),(39,NULL,NULL,'мобильные бригады',NULL),(40,NULL,NULL,'Москва',NULL),(41,NULL,NULL,'FuckUp Night',NULL),(42,NULL,NULL,'Digital October',NULL),(43,NULL,NULL,'Лариса Мельникова',NULL),(44,NULL,NULL,'14 июля расскажем о проекте на FuckUp Night Moscow',NULL),(45,NULL,'Наталья Овчинникова','Наталья Овчинникова','Наталья Овчинникова'),(46,NULL,'Координация отдела переводов','Координация отдела переводов','Координация отдела переводов'),(47,NULL,'Татьяна Малкова','Татьяна Малкова','Татьяна Малкова'),(48,NULL,'Переводчик','Переводчик','Переводчик'),(49,NULL,'Владимир Полуляхов','Владимир Полуляхов','Владимир Полуляхов'),(50,NULL,'Дизайнер','Дизайнер','Дизайнер'),(51,NULL,'Николай Мавренков','Николай Мавренков','Николай Мавренков'),(52,NULL,'Программист','Программист','Программист');
/*!40000 ALTER TABLE `i18n_strings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `i18n_texts`
--

DROP TABLE IF EXISTS `i18n_texts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i18n_texts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `scope` varchar(100) DEFAULT NULL,
  `en-US` text,
  `ru-RU` text,
  `es-ES` text,
  PRIMARY KEY (`id`),
  KEY `idx-i18n_texts-name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `i18n_texts`
--

LOCK TABLES `i18n_texts` WRITE;
/*!40000 ALTER TABLE `i18n_texts` DISABLE KEYS */;
INSERT INTO `i18n_texts` VALUES (1,'main/intro','main',NULL,'# Благотворительный проект\n\nВ проекте Health&Help почти <b>сотня</b> людей объединилась для того, чтобы дать гватемальским индейцам\nМайя доступ к базовой медицинской помощи. Работаем, чтобы помогать людям, а для покупки лекарств,\nрасходных материалов и оборудования нам нужна ваша помощь. Даже сто рублей могут помочь вылечить\nчеловека',NULL),(2,'help/pharmacy/part1','help',NULL,'# Готовые наборы\n\nВключают в себя самое необходимое на текущий момент\n\nПожертвование пойдет на закупку и отправку препаратов',NULL),(3,'help/pharmacy/part2','help',NULL,'## Если хотите самостоятельно купить препараты и отправить в Гватемалу\n\nЕсть несколько вариантов отправлений\n\n1. [Почтой РФ](/help/russian-post);\n1. Почтой СНГ;\n1. Курьерские службы.\n\n## Полный список необходимых медикаментов\n\n####  Перевязка и расходные материалы\n\n| Бинт стерильный 16 м х 1000 мм | 30 ₽ |\n| Бинт стерильный 14 м х 700 мм | 21 ₽ |\n| Бинт стерильный 10 м х 700 мм | 4 ₽ |\n| Салфетки стерильные 14 x 16 см в упаковках по 20 штук | 24 ₽ |\n| Трубчатые эластичные сетчато-трубчатые бинты № 1 | 15 ₽ |\n| Трубчатые эластичные сетчато-трубчатые бинты № 2 | 12 ₽ |\n| Клей БФ-6 10,0 (Лифузоль, Фуропласт, Пластубол) | 50 ₽ |\n| Лейкопластырь на тканевой основе рулонный, 3 м х 500 мм | 69 ₽ |\n| Салфетки кровоостанавливающие в упаковках по 7 штук | 90 ₽ |\n| Перчатки хирургические стерильные | 14 ₽ |\n| Перчатки хирургические нестерильные | 8 ₽ |\n\n#### Медицинский препараты\n| Анальгин в таблетках | 40 ₽ |\n| Анальгин в ампулах | 100 ₽ |\n| Нимика (Нимесулид, Найз) | 63 ₽ |\n| Кетанов (Кеторолак, Кетокам) 10 мг №20 | 56 ₽ |\n| Парацетамол | 40 ₽ |\n| Аспирин (ацетилсалициловая кислота) №20 | 200 ₽ |\n| Но-шпа или дротаверин в таб. №24 | 177 ₽ |\n| Но-шпа в амп. №5 | 97 ₽ |\n| Фуразолидон №20 | 120 ₽ |\n| Амоксициллин 0,5-№16 | 60 ₽ |\n| Азитромицин0,25 №6 | 80 ₽ |\n| Тетрациклин таб0,1 №20 | 60 ₽ |\n| Линкомицин в амп. №10 | 53 ₽ |\n| Лоратадин  в таб. 10мг №30 | 51 ₽ |\n| Тавегил в амп. №5 | 201 ₽ |\n| Хлоропирамин (супрастин) в таб. №20 | 110 ₽ |\n| Хлоропирамин (супрастин) в амп. №5 | 128 ₽ |\n| Дексаметазон 4 мг/мл №25 | 177 ₽ |\n| Драмина (от укачивания) | 152 ₽ |\n| Крем «Бепантен», «Пантенол» 50,0 | 101 ₽ |\n| Левомеколь мазь 40,0 | 120 ₽ |\n| Вермокс 0,1 № 6 таб. | 100 ₽ |\n| Пирантел 0,25 №3 | 24 ₽ |\n| Немазол | 145 ₽ |\n| Метронидазол | 20 ₽ |\n| Лидокаин в амп. 2%, 2 мл, №10 | 30 ₽ |\n| Новокаин в амп. 2%, 2 мл, №10 | 30 ₽ |\n| Ацикловир в таб. №20 | 50 ₽ |\n| Папаверин в амп. №10 | 80 ₽ |\n| Фуросемид в таб. | 27 ₽ |\n| Фуросемид в амп. | 30 ₽ |\n| Домперидон в таб. 10 мг №30 | 87 ₽ |\n| Эналаприл 10 мг  №20 | 20 ₽ |\n| Омепразол 20 мг №20 | 50 ₽ |\n| Фталозол в таб. №20 | 22 ₽ |\n| Цефалексин 0,5 №16 | 77 ₽ |\n| Гидровит/регидрон №10 | 120 ₽ |\n| Комплевит №60 | 135 ₽ |\n| Селмевит №60 | 226 ₽ |',NULL),(4,'help/volunteers/part1','help',NULL,'# Если вы хотите приехать в Гватемалу в качестве волонтера\n\nМы рассчитываем на вашу готовность',NULL),(5,'help/volunteers/part2','help',NULL,'##### Взнос\nОбязателен для всех, кроме волонтеров-строителей,\nдля них взнос желателен, но доброволен.\n\n##### Питание\n\nОсновная пища в Гватемале - это рис, бобы, кукуруза, местные фрукты и овощи. У местных\nжителей можно купить за 1$ кукурузные лепешки, бананы, яйца, мясо, сыр, все это нужно\nзаказывать у продавцов заранее. Мясо и сладости лучше захватить с собой или попросить\nродственников выслать вам почтой.\n\n##### Погода\n\nВ Гватемале не очень холодно и не очень жарко, температура держится на уровне +25.Однако,\nстоит взять с собой свитер и ветровку - вечерами может быть холодно, особенно в горах.\nТакже не помешает захватить с собой резиновые сапоги и дождевик.\n\n##### Вакцинация\n\nСобираясь в Гватемалу, нужно обязательно захватить с собой аптечку для экстренного лечения\n (мы поможем определиться с её составом). Кроме того, рекомендуется проверить наличие всех\n плановых прививок и вакцинации от гепатита В. До выезда необходимо провести вакцинацию\n от гепатита А, брюшного тифа и  бешенства.',NULL),(6,'help/volunteers/part3','help',NULL,'##### Проживание\nЕсли вы будете волонтером-строителем, мы обеспечим\nвас палаточным ночлегом и горячей едой\nвне зависимости от срока вашего пребывания в лагере.\n\nВолонтерам других специальностей мы предоставляем место\nдля ночлега и питание в случае, если  они пробудут с нами более трех месяцев. Если вы хотите приехать к нам ненадолго, мы поможем вам\nнайти кров за минимальную цену (обычно 1-2$ в сутки).\n\n##### Виза и билеты\n\nГражданам России, желающим посетить Гватемалу на срок до трех месяцев, визу получать не\nнужно. В консульстве Гватемалы можно продлить срок пребывания до полугода. Если вы планируете\nпробыть у нас более полугода, мы можем посодействовать получению визы на больший срок или же\nпридется выехать в соседнюю страну и тут же въехать обратно.\n\nБилет Москва-Гватемала-Москва при полете через США стоит от 700$, в этом случае вам может\nпотребоваться виза этой страны. Билеты по маршруту, не предусматривающему пересадок в США,\nстоят дороже - от 850$.',NULL),(7,'help/volunteers/part4','help',NULL,'## Зачем мне становиться волонтером?\n\nВолонтерство связывают с желанием помогать нуждающимся, а это еще и отличная возможность познакомиться с новыми людьми и получить полезные навыки. Разберемся со всем по порядку.\n\n### Карьера\nПредположим, в обычной жизни вы инженер, бухгалтер, водитель троллейбуса или официант — проектируете автомобили, утюги или бетонные конструкции, работаете с документами и 1С, профессионально преодолеваете пробки или запоминаете заказы. Став волонтером, вы приобретаете навыки, которые может оценить ваш руководитель, например, опыт командной работы, деловой переписки с партнерами и спонсорами, написания и перевода текстов.\nЕсли вы еще только заканчиваете обучение, те же самые навыки повысят вашу ценность для работодателя и выделят вас из массы вчерашних выпускников.\n\n### Саморазвитие\nНа работе и в университете нас с вами контролируют — ставят задачи и дедлайны, дают инструкции и корректируют в процессе выполнения. Волонтеры мотивируют и контролируют себя самостоятельно, поэтому волонтерство — отличный шанс научиться управлять своим временем, освоить планирование и приоретизацию задач. Вы можете попробовать себя в разном: может быть, вы отлично рисуете иллюстрации или придумываете идеи для футболок, но еще не занимались этим.\n\n### Общение\nНаш проект объединяет людей из разных стран - Россия, Беларусь, США, Португалия, Германия, Гватемала и так далее. Если вы живете в крупном городе России, скорее всего, среди его жителей найдется наш волонтер, с которым вы сможете познакомиться и пообщаться. Во время скайп-встреч мы вместе обсуждаем рабочие вопросы, делимся мнениями, принимаем решения, шутим и смеемся. Люди часто жалуются на то, что у них почти нет общих семейных дел кроме дачи и просмотра телевизора. Привлеките детей или родителей к проекту, и одной общей целью станет больше. Рассматривать после ужина шапочки для новорожденных, связанные вашей мамой или бабушкой, интереснее, чем смотреть новости.\n\n### Удовольствие\nПомогая людям, мы чувствуем себя лучше. Попробуйте, вам понравится ;-)\n\nЕсли вы хотите стать нашим волонтером, пожалуйста, [заполните анкету](https://docs.google.com/forms/d/1y7qa9oc_EBJCYiAHrRQjb1jFa_NTBAmlRS3pjrTS4p0/viewform), или напишите Михаилу Никифорову на [nimimi@yandex.ru](mailto:nimimi@yandex.ru).',NULL),(8,'help/russian-post','help',NULL,'# Как отправить посылку Почтой России\n\n## 1. Упаковка\n\nНебольшие вещи весом до 3 кг: упаковать в конверт, пластиковый пакет или  плотную бумагу,\nперевязав или заклеив обертку;\n\nКрупные и тяжелые посылки: положить в коробку, её можно купить на почте или взять с собой. Надписи на собственной\nкоробке можно закрасить маркером. Длина коробки не больше 150 см. Сумма длины, высоты и ширины не больше 300 см.\n\nОграничения по весу: общий вес не больше 20 кг. Заклеивать коробку не нужно.\nЧтобы содержимое не перемешалось внутри коробки, можно заполнить её ватой или мятой бумагой.\n\n\n## 2. Отправка\n\n#### Где?\nПосылку можно отправить в любом отделении Почты России.\n\n#### Что придётся заполнять?\nВ некоторых отделениях вас попросят написать на бумажке или коробке адрес получателя,\nв других – заполнить бланк сопроводительного адреса CP 71 и три экземпляра таможенной декларации CN 23.\n\n\n### Вещи\n\nНа русском и английском языках указывается содержимое посылки, например,\n«шапочки для новорожденных из хлопка». Если вы не знаете название на английском,  пишите транслитом.\n\nВсе вещи нужно лишить ценников и пометить как бывшие в употреблении — б/у.\nНовых вещей можно отправлять всего по три экземпляра, а б/у — сколько угодно.\n\nУказать количество и примерный вес, например:\n1. T-shirt / Футболка б/у, / 4 шт. / 500 г.\n2. Socks / Носки б/у / 5 шт. / 200 г.\n3. Grecha / греча / 1 пач. / 1000 г.\n\n\n### Медикаменты\n\nОтправляя медицинские расходники, лекарства и оборудование, не указывайте\nих в бланках с описанием содержимого посылки!\n\n#### Упаковка\nЗаверните лекарства в непрозрачные, лучше фабричные пакеты, из-под того, что\nприсылать можно: шоколад, печенье или конфеты.\n\n#### Бланки\nВ посылке укажите «конфеты, 1 кг». Медицинские приборы удобно посылать под видом бытовых,\nнапример, ингалятор становится «увлажнителем воздуха» или «пылесосом», а стерилизаторы или УФ лампы —\n«сушилки для ногтей» или «микроволновки».\n\n\n### Продукты\n\nОтправляя чай, кофе, травы, фрукты и овощи, в том числе сушеные, их точно так же придется «маскировать».\nЕсли вы отправляете большую посылку с тем, что можно, например, 19 кг пеленок, и 1 кг\nтого, что нельзя, лучше все же делать отдельные посылки — «можно» и «нельзя».\n\nВ посылку «можно» положите 19 кг пеленок и 1 кг сухого молока. В посылку «нельзя» — чай, кофе,\nлекарства, расходники и сушеную морковь, а сверху, например, 1 кг «разрешенных» носков.\n\n## Адрес для отправки\n\nAddress: Segunda calle 3-109 zona 8, Huehuetenango, Guatemala\nZip code: 13001\nTo: Sergio Ottoniel Castillo Mendoza\nHealth&Help',NULL),(11,NULL,NULL,NULL,'Уже почти год, как мы начали проект, посвященный строительству клиники в Гваетмале. Тысячи людей помогали и продолжают помогать нам в этой истории: делают пожертвования, посылают посылки, распространяют информацию в соцсетях или становятся волонтерами. И вот, все готово: мы в Гватемале и уже в июле начинаем строить. Осталось совсем немного: собрать деньги на второй этап строительства, функционирование клиники и организацию медицинских бригад.\n\nМы запускаем краудфандинг на международной платформе. Поддержите нас: сделайте пожертвование и распространите посты в соцсетях:\n\n[Facebook](https://www.facebook.com/healthandhelporg/posts/603310439832722​)  \n[ВКонтакте](https://vk.com/heandhe?w=wall-99809841_463/all​)  \n[LiveJournal](http://tropical-doc.livejournal.com/34257.html​)\n\nИзменить жизнь 15 000 человек к лучшему: http://bit.ly/hehe-together',NULL),(12,NULL,NULL,NULL,'Уже 50 человек сделали пожертвования на наш проект! Пятидесятым пожертвованием оказались 8$, присланные анонимом. Мы очень рады и таким небольшим донациям, ведь за каждой из них - еще один человек, который поддержал нас.\n\n[Присоединяйтесь к нашей кампании](https://www.generosity.com/medical-fundraising/let-s-build-a-clinic-for-locals-in-guatemala)',NULL),(13,NULL,NULL,NULL,'Гватемала - это страна джунглей, вулканов, индейцев Майя, которые когда-то изобрели шоколад. Но еще это страна, где слабое зрение может убить - если ты плохо видишь, ты не можешь работать, кормить семью или учиться. Потерять зрение там легко, в этом помогают повсевместное недоедание и яркое солнце. \n\nМы расспросили друзей и знакомых: в среднем, у каждого третьего человека есть дома очки, которые больше не подходят ему или кому-то из членов его семьи. Или походят, но надоела оправа, вышли из моды, или появилась пара царапин. Эти ненужные очки могут спасти кого-то от голода и дать кому-то шанс на лучшую жизнь. \n\nЕще никогда стать супергероем-спасателем не было так просто. \n\nЕсли ты готов поставить ящик сбора очков в своей компании, пожалуйста, напиши нам на [larisa.v.melnikova@gmail.com](mailto:larisa.v.melnikova@gmail.com)\n\nЕсли у тебя есть ненужные очки, пожалуйста, [подпишись на нас в Facebook](https://www.facebook.com/healthandhelporg), чтобы получать новости об устанавливаемых ящиках сбора.',NULL),(14,NULL,NULL,NULL,'[FuckUp Nights](www.fuckupnights.com) - это серия мероприятий, которая проходит по всему миру и помогает бизнесу и некоммерческим организациям учиться на ошибках друг друга. На нашем пути мы сталкивались со многим - коррупцией, вооруженными стычками, противоречивым законодательством. Иногда мы запоздало или неправильно реагировали на происходящее, и работа над ошибками помогла нам стать сильнее и лучше. \n\n14 июля в Digital October на второй конференции FuckUp Nights в Москве участник нашей команды [Лариса Мельникова](https://www.facebook.com/LaraMelnikova>) расскажет о том, как наши ошибки повлияли на строительство клиники и наши спецпроекты - офтальмологическую программу и мобильные бригады. \n\nУзнать больше о конференции можно на [странице мероприятия в Facebook](https://www.facebook.com/events/826560987475408)',NULL);
/*!40000 ALTER TABLE `i18n_texts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_id` int(11) NOT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `vk` varchar(100) DEFAULT NULL,
  `fb` varchar(100) DEFAULT NULL,
  `linked_in` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk-members-name_id` (`name_id`),
  KEY `fk-members-role_id` (`role_id`),
  CONSTRAINT `fk-members-name_id` FOREIGN KEY (`name_id`) REFERENCES `i18n_strings` (`id`),
  CONSTRAINT `fk-members-role_id` FOREIGN KEY (`role_id`) REFERENCES `i18n_strings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,6,'/images/main/members/viktoriya_valikova_4x3_small.jpg','http://vk.com/vik.valikova','https://www.facebook.com/viktoriya.valikova',NULL,'viktoriya.valikova@gmail.com',7),(2,8,'/images/main/members/karina_basharova_4х3_small.jpg','http://vk.com/kr.basharova','https://www.facebook.com/kr.basharova',NULL,'kr.basharova@gmail.com',9),(3,10,'/images/main/members/serdjio_4x3_small.jpg','http://vk.com/id324087451','https://www.facebook.com/otto.castillo.71',NULL,'Sergiocastillomed@outlook.com',11),(4,12,'/images/main/members/mihail_shishin_4х3_small.jpg','http://vk.com/id2103608',NULL,NULL,NULL,13),(5,14,'/images/main/members/igor_enin_4x3_small.jpg','http://vk.com/ropepark_tb',NULL,NULL,'gaareg@mail.ru',15),(6,16,'/images/main/members/margarita_kudryavtseva 4х3_small.jpg','https://vk.com/id774962',NULL,NULL,'ritakudryavtseva@gmail.com',17),(7,18,'/images/main/members/yana_zaharova_4x3_small.jpg','http://vk.com/id530346','https://www.facebook.com/yana.msu',NULL,'yana.zakh@gmail.com',19),(8,20,'/images/main/members/daria_tsarik_4х3_small.jpg',NULL,'https://www.facebook.com/dariatsaryk',NULL,'alcharkoc@gmail.com',21),(9,22,'/images/main/members/mihail_nikiforof_4x3_small.jpg','http://vk.com/id1139974',NULL,NULL,'nimimi@yandex.ru',23),(10,24,'/images/main/members/larisa_melnikova_4x3_small.jpg',NULL,'http://facebook.com/laramelnikova','https://www.linkedin.com/in/larisamelnikova','larisa.v.melnikova@gmail.com',25),(11,26,'/images/main/members/elizaveta_shishina_4х3_small.jpg','http://vk.com/liz.shishina',NULL,NULL,NULL,27),(12,45,'/images/main/members/natalia_ovchinnikova_4x3_small.jpg',NULL,NULL,NULL,NULL,46),(13,47,'/images/main/members/tatiana_malkova_4x3_small.jpg',NULL,NULL,NULL,NULL,48),(14,49,'/images/main/members/vladimir_polulyakhov_4x3_small.jpg',NULL,NULL,NULL,NULL,50),(15,51,'/images/main/members/nikolai_mavrenkov_4x3_small.jpg','https://vk.com/id772744','https://www.facebook.com/profile.php?id=1717166686','https://www.linkedin.com/in/nikolay-mavrenkov-5aab364b','koluch@koluch.ru',52);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migration`
--

DROP TABLE IF EXISTS `migration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migration`
--

LOCK TABLES `migration` WRITE;
/*!40000 ALTER TABLE `migration` DISABLE KEYS */;
INSERT INTO `migration` VALUES ('m000000_000000_base',1471471294),('m160604_224942_create_i18n_strings',1471471297),('m160611_103729_create_i18n_texts',1471471297),('m160612_140733_create_members',1471471297),('m160702_095004_create_news',1471471297),('m160702_100405_create_news_tags',1471471298),('m160702_103054_create_junction_news_and_news_tags',1471471298),('m160702_103120_add_some_news',1471471298),('m160703_095325_fix_texts',1471471298),('m160703_120822_fix_texts',1471471298),('m160703_122302_fix_texts',1471471298),('m160703_133626_fix_texts',1471471298),('m160703_134646_add_news',1471471298),('m160709_164629_fix_news',1471471298),('m160709_181006_fix_texts',1471471298),('m160712_221252_add_news',1471471298),('m160712_235057_add_news',1471471298),('m160713_232240_fix_texts',1471471298),('m160715_215813_add_team_members',1471471298),('m160721_204739_alter_junction_table',1471471298),('m160730_124137_fix_texts',1471471298),('m160730_124748_fix_texts',1471471298);
/*!40000 ALTER TABLE `migration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title_id` int(11) NOT NULL,
  `text_id` int(11) NOT NULL,
  `image_url` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk-news-title_id` (`title_id`),
  KEY `fk-news-text_id` (`text_id`),
  CONSTRAINT `fk-news-text_id` FOREIGN KEY (`text_id`) REFERENCES `i18n_texts` (`id`),
  CONSTRAINT `fk-news-title_id` FOREIGN KEY (`title_id`) REFERENCES `i18n_strings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (3,'2016-06-28 00:00:00',35,11,'/images/news/2UpfyKHwA3k-2-40850.jpg'),(4,'2016-06-29 00:00:00',36,12,'/images/news/2016-06-29_12-17-58-18636.png'),(5,'2016-07-08 00:00:00',38,13,'/images/news/img_oft_1-17677.jpg'),(6,'2016-07-10 00:00:00',44,14,'/images/news/img_01-85935.jpg');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_news_tags`
--

DROP TABLE IF EXISTS `news_news_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_news_tags` (
  `news_id` int(11) NOT NULL DEFAULT '0',
  `news_tags_id` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx-news_news_tags-unique` (`news_id`,`news_tags_id`),
  KEY `idx-news_news_tags-news_id` (`news_id`),
  KEY `idx-news_news_tags-news_tags_id` (`news_tags_id`),
  CONSTRAINT `fk-news_news_tags-news_id` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk-news_news_tags-news_tags_id` FOREIGN KEY (`news_tags_id`) REFERENCES `news_tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_news_tags`
--

LOCK TABLES `news_news_tags` WRITE;
/*!40000 ALTER TABLE `news_news_tags` DISABLE KEYS */;
INSERT INTO `news_news_tags` VALUES (3,1,1),(3,5,2),(4,1,3),(4,5,4),(5,6,5),(6,5,6),(6,6,7),(6,7,8),(6,8,9),(6,9,10),(6,10,11),(6,11,12);
/*!40000 ALTER TABLE `news_news_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_tags`
--

DROP TABLE IF EXISTS `news_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk-news-tags-title_id` (`title_id`),
  CONSTRAINT `fk-news-tags-title_id` FOREIGN KEY (`title_id`) REFERENCES `i18n_strings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_tags`
--

LOCK TABLES `news_tags` WRITE;
/*!40000 ALTER TABLE `news_tags` DISABLE KEYS */;
INSERT INTO `news_tags` VALUES (1,28),(2,29),(3,30),(4,31),(5,34),(6,37),(7,39),(8,40),(9,41),(10,42),(11,43);
/*!40000 ALTER TABLE `news_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_tags_link`
--

DROP TABLE IF EXISTS `news_tags_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_tags_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_tags_link`
--

LOCK TABLES `news_tags_link` WRITE;
/*!40000 ALTER TABLE `news_tags_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `news_tags_link` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-08-17 22:02:02
