import React, { Dispatch, useState } from 'react'
import Book from '../../types/books'

type Props = {
  setModalState: Dispatch<React.SetStateAction<boolean>>
  addBook: (book: Book) => void
  books: Book[]
}

export default function AddBookModal({ setModalState, addBook, books }: Props) {
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [topic, setTopic] = useState('Programming')
  const handleSubmit = () => {
    const maxId = Math.max(...books.map((book) => book.id))
    const newBook = {
      id: maxId + 1,
      name,
      author,
      topic,
    }
    addBook(newBook)
    setName('')
    setTopic('Programming')
    setAuthor('')
  }
  return (
    <div className="fixed top-0 left-0 z-10 pt-40 w-full h-full bg-black bg-opacity-40">
      <div className="relative m-auto p-0 bg-white w-1/4">
        {/* Modal Header */}
        <div className="flex flex-row justify-between p-4">
          <h3 className=" text-xl font-bold text-black">Add Book</h3>
          <button
            onClick={() => setModalState(false)}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>

            <span className="sr-only">Close Modal</span>
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="name">
              Name
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Search book"
                className="search-input my-2"
                required
              />
            </label>

            <label htmlFor="author">
              Author
              <input
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                placeholder="Search book"
                className="search-input my-2"
                required
              />
            </label>

            <label htmlFor="topic">
              Topic
              <select
                name="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2.5 rounded my-2 border-solid border-1 border-gray-400"
              >
                <option value="Programming" selected>
                  Programing
                </option>
                <option value="Self-Help">Self-Help</option>
                <option value="Devops">Devops</option>
              </select>
            </label>

            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-button hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                I accept
              </button>
              <button
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Decline
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
