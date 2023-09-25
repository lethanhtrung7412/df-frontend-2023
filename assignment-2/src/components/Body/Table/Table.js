import React, { useEffect, useState } from 'react'
import "./Table.css"

function ConfirmDeleteModal({bookName, onConfirm, onCancel}) {
  return (
    <div id="delete_book_popup_box">
      <div className="delete_modal-content">
        <div className="delete_modal-header">
          <span id="delete_book_close" className="close" onClick={onCancel}>×</span>

          <h2>Delete book<i className="fa fa-address-book-o" aria-hidden="true"></i></h2>
        </div>

        <div className="delete_modal-body">
          <p>Are you sure you want to delete {bookName} item?</p>
          <button onClick={onConfirm} className="button confirm">Yes</button>
          <button onClick={onCancel} className="button cancel">No</button>
        </div>
      </div>
    </div>
  );
}
export default function Table({books, removeBook}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(3)
  useEffect(() => {
    setCurrentPage(1);
  }, [books])

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }
  function openDeleteModal(book) {
    setBookToDelete(book);
    setShowDeleteModal(true);
  }
  
  function closeDeleteModal() {
    setShowDeleteModal(false);
  }
  
  function handleDeleteBook() {
    deleteBook(bookToDelete.id);
    closeDeleteModal();
  }
  
  function deleteBook(id) {

    removeBook(id)
  }
  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      className={currentPage === number ? 'active' : ''}
      onClick={() => setCurrentPage(number)}
    >
      {number}
    </li>
  ));

  return (
    <div className='book-list'>
      <table style={{ width: "100%" }} id="book_list">
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Name</th>
            <th style={{ width: "20%" }}>Author</th>
            <th style={{ width: "20%" }}>Topic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="add_book">
          {currentBooks.map(book => (
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
      <ul className='page-numbers'>{renderPageNumbers}</ul>
      {showDeleteModal && 
  <ConfirmDeleteModal 
    bookName={bookToDelete.name}
    onConfirm={handleDeleteBook}
    onCancel={closeDeleteModal} 
  />}
    </div>
  )
}
