import React from 'react'
import Search from './Search/Search'
import "./Body.css"
import useLocalStorage from '../../hooks/localStorage'
import { booksData } from '../../data/book'
export default function Body() {
    const [books, setBooks, removeBook] = useLocalStorage("books", booksData)
    return (
        <div className='body'>
            <Search books={books} setBooks={setBooks} removeBook={removeBook}/>
        </div>
    )
}
