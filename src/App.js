import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Registration from './components/Profile/Registration';
import Login from './components/Login/Login';
import Notes from './components/Notes/Notes';
import AuthObserver from './components/Login/AuthObserver';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="my-3 text-center">Заметки</h1>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/notes" component={Notes} />
        </Switch>
      </div>
      <AuthObserver />
    </>
  );
}

export default App;
