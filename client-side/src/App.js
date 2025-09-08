import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Nav } from './components/nav';
import { Routing } from './components/routing';

function App() {
  return (
    <BrowserRouter>
      <Nav ></Nav>
      <div className='container' >
           <Routing></Routing>
      </div>
    </BrowserRouter>
  );
}

export default App;