// функция имитируящая запрос на сервер
// callback - функция имитируящая процесы на сервере запросы к бд, проверку данных и т.п.
// возврощает объект с "ответом" от сервера { resultCode, data }
function fakeFetch(callback) {
  const data = callback();
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
}

export const authAPI = {
  async authMe(userId) {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
      const findUser = users.find((u) => u.userId === userId);
      if (findUser) {
        result.resultCode = 1;
        result.data = findUser;
        // пометка на "сервере" что пользователь авторизовался, пример: открытие сессии, установка куков и т.п.
        localStorage.setItem('AUTH_USER_ID', findUser.userId);
      } else {
        result.resultCode = 2;
      }

      return result;
    });
    return response;
  },
  async authLogin(email, password) {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
      const findUser = users.find((u) => u.email === email && u.password === password);
      if (findUser) {
        result.resultCode = 1;
        result.data = findUser;
      } else {
        result.resultCode = 2;
      }

      return result;
    });
    return response;
  },
  async authLogout() {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      result.resultCode = 1;
      // пометка на "сервере" что пользователь отлогинился, пример: закрытие сессии, обнуление куков и т.п.
      localStorage.setItem('AUTH_USER_ID', 0);
      return result;
    });
    return response;
  },
};
export const profileAPI = {
  async addUser(email, name, password) {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
      if (!users.find((u) => u.email === email)) {
        users.push({
          userId: Math.random() * Math.pow(10, 18),
          email,
          name,
          password,
        });
        localStorage.setItem('users', JSON.stringify(users));
        result.resultCode = 1;
      } else {
        result.resultCode = 2;
      }
      return result;
    });
    return response;
  },
};
