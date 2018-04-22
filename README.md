# Plyonkin
Для того, чтобы запустить сервер, нужно сделать следующее.
1. Установить Node.js: https://nodejs.org/en/download/
2. Зайти через консоль в папку с проектом и установить зависимости сборки: npm install
3. Установить MySQL: https://dev.mysql.com/downloads/installer/
4. В MySQL добавить пользователя stduser (группа dbadmin) с паролем p55-cd53 (можно сделать во время установки). Можно добавить "своего", но тогда нужно будет внести правки в файлы dbpool, index
5. Запустить сервер MySQL (я думаю, ставить запуск на автозагрузку не нужно)
6. Запустить http сервер Node.js, для этого в папке с проектом выполнить команду "node index". При этом должно появиться сообщение о том, что сервер запущен, база данных и таблицы подключены.
Теперь должна быть возможность зайти локально на сайт http://localhost.
В данный момент сервер забинден на порт 1666, чтобы была возможность проверить удалённо его работу. Реализована работа с email.

Файлы конфигурации сервера login, dbpool, index и пользовательские скрипты client писал я, поэтому могу ответить на любые (почти) вопросы по их содержимому.
Рендер страниц сделан с помощью модуля EJS, поэтому все файлы с таким же расширением, иначе ничего не работает. Это просто HTML файлы. Новость оформляется в виде кусочка html кода (только текст с тегами; заголовок, картинку и автора добавлять не надо), её нужно сохранить с расширением ejs.
Новости добавляются через форму в профиле пользователя следующим образом: пользователь с правами админа авторизуется на любой странице с комментариями и переходит по клику на своё имя в профиль. В поля вводится нужная информация, загружаются картинка и ejs файл, и можно отправлять.
Можно изменить ID новости, которая отображается в шапке.

Для синхронизации БД воспользуйтесь файлом mydb.sql, вот как им пользоваться:
![Instruction](https://github.com/Botinok666/Plyonkin/blob/master/images/mysql.png)
Если появится желание добавить инфы в БД (новостей, например), пишите в vk, я запущу сервер и напишу свой IP.
