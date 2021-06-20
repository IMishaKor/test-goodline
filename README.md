# Тестовое задание на позицию React-разработчик: приложение “Заметки”

## Требования для Junior-разработчика:

- ✔️Приложение должно быть написано на React, для роутинга использовать соответствующую библиотеку;
- ✔️Для управления состоянием приложения использовать Redux или MobX;
- ✔️Для хранения заметок, логина, пароля использовать локальное хранилище;
- ✔️Не манипулировать DOM-элементами напрямую, работать с интерфейсом только с помощью React’а;
- ✔️Приложение должно быть приятно оформлено, т.е. иметь хоть какой-то дизайн (разрешается использовать сторонние библиотеки готовых компонентов, но не обязательно).

## Требования для Middle-разработчика:

- ❌Использование TypeScript;
- ✔️Приложение можно запустить одновременно в двух вкладках браузера, следовательно изменения, сделанные из одной вкладки, должны отобразиться автоматически в другой. Также если заметку открыли на редактирование, не разрешать доступ к ней из других вкладок;
- ✔️Если произошел логин\разлогин в одной вкладке, то приложение запущенное в других вкладках в этот момент должно как-то обработать эти события (как именно должно вести себя приложение, придумайте сами)
- ✔️Имитировать запросы на сервер, для авторизации и действий с заметками;
- ✔️Реализовать шифрование паролей;
- ✔️Добавить горячие клавиши на какие-либо действия;
- ✔️Добавить возможность поиска по заметкам, и сортировку.

## Итог:

Все отмеченные пункты так или иначе сделал.
Из самых видных недоработок форма регистрации и авторизации без валидации. Что касается запрета на редактирование, пример поведения: в окне 1 открыто редактирование; открываем редактирование в окне 2 – все полня не активны и выведено соответствующие сообщение; сохраняем в окне 1, после чего в окне 2 всё разблокируется и подгрузятся актуальные данные. Вот тут вторая недоработка: если в окне 1 сделать что угодно кроме сохранения (отмена, закрыть вкладку) то в окне 2 ничего не изменится.
По поводу структуры: некоторые компоненты явно перегружены кодом, по-хорошему их надо разделить на функциональную и презентационную; структура компонентов notes (add, edit) не корректная (лежат рядом друг с другом, а должны быть вложенностью к notes)
Все вышеперечисленные недоработки не являются для меня проблемой, просто не успеваю до понедельника всё причесать.
