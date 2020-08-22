## Тествое задание для YetiCrab
Запуск:
1) **npm install**
1) **cd src/client** && **npm install**
1) **npm run server** (http://localhost:5000)
2) **npm run client** (http://localhost:3000)

### Документация сервера
Базовый адрес - http://localhost:5000/api/v1

Все тела запроса в формате json
<hr>

##### (GET) /requests
Выдает заявки с пагинацией

Параметры строки запроса
- pageSize - количество элементов на страницу
- page - номер страницы
- term - строка для поиска


##### (GET) /requests/:id
Выдает одну заявку по id

##### (POST) /requests/
Создает новую заявку

Параметры тела запроса (json)
- companyName - название компании (string)
- carrierFIO - фио перевозчика (string)
- carrierPhone - телефон перевозчика (string)
- comment - комментарий (string)
- ATICode - ati код (number)

##### (PUT) /requests/:id
Редактирует заявку

Параметры тела запроса (json)
- companyName - название компании (string)
- carrierFIO - фио перевозчика (string)
- carrierPhone - телефон перевозчика (string)
- comment - комментарий (string)
- ATICode - ati код (number)

##### (DELETE) /requests/:id
Удаляет заявку по id
