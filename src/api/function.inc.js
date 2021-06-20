// функция имитируящая запрос на сервер
// callback - функция имитируящая процесы на сервере запросы к бд, проверку данных и т.п.
// возврощает объект с "ответом" от сервера { resultCode, data }
export const fakeFetch = (callback) => {
  const data = callback();
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
};

export const sortBy = (field, reverse) => {
  const key = (x) => x[field];

  reverse = reverse === 'ASC' ? 1 : -1;

  return (a, b) => {
    a = key(a);
    b = key(b);
    return reverse * ((a > b) - (b > a));
  };
};
