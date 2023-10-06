'use client'

import React, { useState } from 'react'
import Header from '../components/Header/Header'
import Search from '../components/Body/Search'
import Table from '../components/Body/Table'
import useStorage from '../utils/useStorage'
import Book from '../types/books'
import { booksData } from '../data/books'
import AddBookModal from '../components/Modal/AddBook'

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [addBookModalState, setAddBookModalState] = useState<boolean>(false)
  // @typescript-eslint/no-unused-vars
  const [books, setBooks, add, remove] = useStorage<Book>('books', booksData)
  const filteredBooks = books?.filter((book) =>
    book.name.toLowerCase().includes(searchValue.toLowerCase()),
  )
  return (
    <div className="main">
      <Header />
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setAddBookModalState={setAddBookModalState}
      />
      <Table books={filteredBooks} remove={remove} />
      <div>
        {addBookModalState && (
          <AddBookModal
            setModalState={setAddBookModalState}
            books={filteredBooks}
            addBook={add}
          />
        )}
      </div>
    </div>
  )
}
