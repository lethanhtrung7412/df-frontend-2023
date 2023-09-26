import { useEffect, useState } from 'react'
import { Book } from '../../../interface/book'
import './Table.css'

interface Props {
  books: Book[]
  removeBook: (id: number) => void
}

function ConfirmDeleteModal({
  bookName,
  onConfirm,
  onCancel,
}: {
  bookName: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div id="delete_book_popup_box">
      <div className="delete_modal-content">
        <div className="delete_modal-header">
          <button id="delete_book_close" className="close" onClick={onCancel}>
            ×
          </button>

          <h2>Delete book</h2>
        </div>

        <div className="delete_modal-body">
          <p>
            Are you sure you want to delete
            {bookName} item?
          </p>
          <button onClick={onConfirm} className="button confirm">
            Yes
          </button>
          <button onClick={onCancel} className="button cancel">
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Table({ books, removeBook }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage] = useState(3)

  useEffect(() => {
    setCurrentPage(1)
  }, [books])

  const openDeleteModal = (book: Book) => {
    setBookToDelete(book)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
  }

  const handleDeleteBook = () => {
    deleteBook(bookToDelete!.id)
    closeDeleteModal()
  }

  const deleteBook = (id: number) => {
    removeBook(id)
  }
  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook)

  const pageNumbers: any = []
  for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
    pageNumbers.push(i)
  }
  const renderPageNumbers = pageNumbers.map((number: any) => (
    <li
      role="menuitem"
      key={number}
      className={currentPage === number ? 'active' : ''}
      onClick={() => setCurrentPage(number)}
      onKeyDown={() => setCurrentPage(number)}
    >
      {number}
    </li>
  ))

  return (
    <div className="book-list">
      <table style={{ width: '100%' }} id="book_list">
        <thead>
          <tr>
            <th style={{ width: '50%' }}>Name</th>
            <th style={{ width: '20%' }}>Author</th>
            <th style={{ width: '20%' }}>Topic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="add_book">
          {currentBooks!.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.topic}</td>
              <td className="delete" onClick={() => openDeleteModal(book)}>
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="page-numbers">{renderPageNumbers}</ul>
      {showDeleteModal && (
        <ConfirmDeleteModal
          bookName={bookToDelete!.name}
          onConfirm={handleDeleteBook}
          onCancel={closeDeleteModal}
        />
      )}
    </div>
  )
}
