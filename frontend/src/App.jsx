import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {useState} from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';

function App() {

  const [refresh, setRefresh] = useState(false);

  const handleBookAdded = ()=>{
    setRefresh(!refresh);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/edit/:id' element={<EditBook />}></Route>
          <Route path='/' element={
            <>
              <AddBook onBookAdded={handleBookAdded} />
              <BookList key={refresh} />
            </>
          }></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
