# Plyonkin
Для того, чтобы запустить сервер, нужно сделать следующее.
1. Установить Node.js: https://nodejs.org/en/download/
2. Зайти через консоль в папку с проектом, например "cd c:\intel" и установить зависимости сборки: npm install
3. Установить MySQL: https://dev.mysql.com/downloads/installer/
4. В MySQL добавить пользователя stduser (группа dbadmin) с паролем p55-cd53 (можно сделать во время установки). Можно добавить "своего", но тогда нужно будет внести правки в файлы dbpool, index
5. Запустить сервер MySQL (я думаю, ставить запуск на автозагрузку не нужно)
6. Запустить http сервер Node.js, для этого в папке с проектом выполнить команду "node index". При этом должно появиться сообщение о том, что сервер запущен, база данных и три таблицы подключены
Теперь должна быть возможность зайти локально на сайт http://localhost

Файлы конфигурации сервера login, dbpool, index и пользовательские скрипты client писал я, поэтому могу ответить на любые (почти) вопросы по их содержимому.
Конфигурация сервера содержит 4 новости и 2 пользователей.
Рендер страниц сделан с помощью модуля EJS, поэтому все файлы с таким же расширением, иначе ничего не работает. Это просто HTML файлы
Пока на этом всё
