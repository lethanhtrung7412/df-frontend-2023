import React, { useState } from 'react'
import './Search.css'
import useAddBook from '../../../hooks/useAddBook'
import Table from '../Table/Table'
import { Book } from '../../../interface/book'
import { SetValue } from '../../../interface/types'

interface Props {
  books: Book[]
  setBooks: (value: SetValue<Book[]>) => void
  removeBook: (id: number) => void
}

export default function Search({ books, setBooks, removeBook }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [topic, setTopic] = useState('Programming')

  const { addBookIsOpen, addBookOpenPopup, addBookClosePopup } = useAddBook()

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchValue.toLowerCase()),
  )

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const maxId = Math.max(...books.map((book) => book.id))
    const newBook: Book = {
      id: maxId + 1,
      name,
      author,
      topic,
    }

    const updatedBooks = [...books, newBook]
    setBooks(updatedBooks)

    setName('')
    setTopic('Programming')
    setAuthor('')

    addBookClosePopup()
  }

  return (
    <>
      <div className="search">
        <button className="button" onClick={addBookOpenPopup}>
          Add book
        </button>

        {addBookIsOpen && (
          <div id="add_book_popup_box">
            <div className="modal-content">
              <div className="modal-header">
                <button onClick={addBookClosePopup} className="close">
                  ×
                </button>
                <h2>Add book</h2>
              </div>

              <div className="modal-body">
                <form
                  className="form-inline"
                  id="new_book_submit"
                  onSubmit={handleSubmit}
                >
                  <label htmlFor="name">
                    Name
                    <input
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Search book"
                      size={47}
                      className="search-input"
                      required
                    />
                  </label>

                  <label htmlFor="author">
                    Author
                    <input
                      name="author"
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      type="text"
                      placeholder="Search book"
                      size={47}
                      className="search-input"
                      required
                    />
                  </label>

                  <label htmlFor="topic">
                    Topic
                    <select
                      name="topic"
                      id="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="topic"
                    >
                      <option value="Programming" selected>
                        Programing
                      </option>
                      <option value="Self-Help">Self-Help</option>
                      <option value="Devops">Devops</option>
                    </select>
                  </label>

                  <input
                    type="submit"
                    className="button submit"
                    value="Create"
                  />
                </form>
              </div>
            </div>
          </div>
        )}

        <input
          type="text"
          placeholder="Search book"
          size={30}
          className="search-input"
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <Table books={filteredBooks} removeBook={removeBook} />
    </>
  )
}
