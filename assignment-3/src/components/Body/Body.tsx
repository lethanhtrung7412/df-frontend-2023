import React from 'react'
import Search from './Search/Search'
import './Body.css'
import useLocalStorage from '../../hooks/useLocalStorage'
import { booksData } from '../../data/booksData'
import { Book } from '../../interface/book'

export default function Body() {
  const [books, setBooks, removeBook] = useLocalStorage<Book[]>(
    'books',
    booksData,
  )
  return (
    <div className="body">
      <Search books={books} setBooks={setBooks} removeBook={removeBook} />
    </div>
  )
}
