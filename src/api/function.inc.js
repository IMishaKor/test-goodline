// функция имитируящая запрос на сервер
// callback - функция имитируящая процесы на сервере запросы к бд, проверку данных и т.п.
// возврощает объект с "ответом" от сервера { resultCode, data }
export const fakeFetch = (callback) => {
  const data = callback();
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
};
