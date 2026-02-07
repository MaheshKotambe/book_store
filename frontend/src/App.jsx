import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {useState} from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import MyNavbar from './components/MyNavbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ChangePassword from './components/ChangePassword';

function App() {

  const [refresh, setRefresh] = useState(false);

  const handleBookAdded = ()=>{
    setRefresh(!refresh);
  }

  return (
    <>
      <BrowserRouter>
        <MyNavbar/>
        <Routes>
          <Route path='/edit/:id' element={<EditBook />}></Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/add-book' element={<AddBook/>}></Route>
          {/* <Route path='/' element={
            <>
              <AddBook onBookAdded={handleBookAdded} />
              <BookList key={refresh} />
            </>
          }></Route> */}
          <Route path='/change-password' element={<ChangePassword/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
