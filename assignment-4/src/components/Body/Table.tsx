import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Book from '../../types/books'
import DeleteBookModal from '../Modal/DeleteBook'

interface Props {
  books: Book[]
  remove: (id: number) => void
}

function NoData() {
  return (
    <div className="w-full text-center text-xl">Have no book at the moment</div>
  )
}

export default function Table({ books, remove }: Props) {
  const [deleteBookModalState, setDeleteBookModalState] =
    useState<boolean>(false)
  const [bookToDelete, setBookToDelete] = useState<Book>({
    id: 1,
    name: '',
    author: '',
    topic: '',
  })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [booksPerPage] = useState<number>(3)
  useEffect(() => {
    setCurrentPage(1)
  }, [books])

  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook)

  const pageNumbers: number[] = []
  for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
    pageNumbers.push(i as number)
  }
  const renderPageNumbers = pageNumbers.map((number) => (
    // eslint-disable-next-line
    <li
      key={number}
      className={currentPage === number ? 'bg-button text-white' : ''}
      onClick={() => setCurrentPage(number)}
      onKeyDown={() => setCurrentPage(number)}
    >
      {number}
    </li>
  ))
  function openDeleteModal(book: Book) {
    setBookToDelete(book)
    setDeleteBookModalState(true)
  }
  return (
    <>
      <div className="bg-white mx-5">
        {books.length > 0 ? (
          <table className="w-full" id="book_list">
            <thead>
              <tr>
                <th className="w-1/2">Name</th>
                <th className="w-[15%]">Author</th>
                <th className="w-[15%]">Topic</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="add_book">
              {currentBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.topic}</td>
                  <td className="text-button">
                    <div
                      className="underline cursor-pointer"
                      role="button"
                      tabIndex={0}
                    >
                      <Link href={`/book/${book.id}`}>Detail </Link>
                    </div>
                    |
                    <div
                      role="button"
                      className="underline cursor-pointer"
                      onClick={() => openDeleteModal(book)}
                      onKeyDown={() => openDeleteModal(book)}
                      tabIndex={0}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
        <ul className="flex list-none p-0 justify-end mt-2">
          {renderPageNumbers}
        </ul>
      </div>
      {deleteBookModalState && (
        <DeleteBookModal
          book={bookToDelete}
          setDeleteModalState={setDeleteBookModalState}
          confirm={remove}
        />
      )}
    </>
  )
}
