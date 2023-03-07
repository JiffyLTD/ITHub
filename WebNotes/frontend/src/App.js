import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './Pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/main' element={<Main/>}/>
        <Route path='*' element={<Navigate replace to='/main'/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
