import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Login';
import EmployeeList from './EmployeeList';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Routes>
         <Route path='/' element={<LoginForm/>}/>
         <Route path='/employeelist' element={<EmployeeList/>}/>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
