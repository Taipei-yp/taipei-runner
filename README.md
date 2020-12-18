# Taipei Runner
Taipei Runner - пиксельный 2D раннер с преодолением препятствий. [Играть в игру](https://taipei-runner-yp.herokuapp.com/)
_Сделано в рамках проектной работы на Яндекс.Практикуме._

***
### Референсы

 * Механика игры - [T-Rex Chrome Dino Game](https://chromedino.com/)
 * Графическое оформление - [Warped city](https://ansimuz.itch.io/warped-city)
 * [Шаблоны экранов](https://www.figma.com/file/ZivewCSY68lxDhPeC6MwnX/Runner)

***
### Техническое описание
Игра реализована с помощью CanvasAPI. В качестве фореймворка использован React.

#### Механика игры
Персонаж автоматически передвигается вперед, преодолевая препятствия с помощью прыжков.
За преодоленное расстояние начисляются игровые очки. 
При преодолевании определенного порога очков увеличивается скорость движения.
Управление осуществляется с помощью клавиш Пробел или стрелки вверх.

#### Экраны приложения
* Вход пользователя
* Регистрация пользователя
* Редакрирование информации о пользователе
* Главное меню
* Рейтинг игроков
* Игра
* GameOver
* Форум
   * Список топиков
   * Просмотр топика
* Обратная связь
* Сетевые ошибки (404,500)
* Необработанная ошибка в приложении

#### Бекэнд
Бекэнд в виде API предоставлен Практикумом ( [описание API](https://ya-praktikum.tech/api/v2/swagger/) ).
Для игры из API используются ручки:
* Auth - для действий с пользователем
* Leaderboard - для рейтинга игроков

***
### Команды 

#### Установка
`npm install`

#### Запуск
`npm start` — запуск локального сервера

#### .env
BROWSER=false - отключение авто открытия браузера при старте дев сервера

#### Сборка
результат сборки - директория **/dist**

`npm run build` - прод сборка
`npm run build-dev` - дев сборка
`npm run build-prod` - прод сборка

#### Запуск тестов
`npm test`

#### Проверка стиля кода
`npm run lint` - проверка стиля
`npm run lint-write` - фикс стиля
