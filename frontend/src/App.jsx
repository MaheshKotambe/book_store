import {BrowserRouter, Routes, Route} from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';

function App() {

  return (
    <>
      <AddBook/>
      <BookList/>
      <EditBook/>
    </>
  )
}

export default App;
