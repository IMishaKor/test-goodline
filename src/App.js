import Navbar from './components/Navbar/Navbar';
import Registration from './components/Profile/Registration';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="my-3 text-center">Заметки</h1>

        <Registration />
      </div>
      ;
    </>
  );
}

export default App;
