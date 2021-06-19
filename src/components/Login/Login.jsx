function Login() {
  return (
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">
          Адрес электронной почты
        </label>
        <input type="email" class="form-control form-control-lg" id="email" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">
          Пароль
        </label>
        <input type="password" class="form-control form-control-lg" id="password" />
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary btn-lg">
          Войти
        </button>
        <button type="submit" class="btn btn-default btn-lg">
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
}

export default Login;
