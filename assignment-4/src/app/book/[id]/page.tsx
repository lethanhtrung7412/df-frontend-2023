'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'
import Header from '../../../components/Header/Header'
import useStorage from '../../../utils/useStorage'
import Book from '../../../types/books'
import { booksData } from '../../../data/books'
import DeleteBookModal from '../../../components/Modal/DeleteBook'
import Error from '../../../components/Error/Error'

const BookDetail = () => {
  const params = useParams()
  const router = useRouter()
  const [deleteBookModalState, setDeleteBookModalState] =
    useState<boolean>(false)
  const [
    books,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _add,
    remove,
  ] = useStorage<Book>('books', booksData)
  const detailBook: Book = books?.filter(
    (book) => book.id === Number(params.id),
  )[0]
  // console.log(detailBook.name)
  function deleteBook(id: number) {
    remove(id)
    setDeleteBookModalState(false)
    router.push('/')
  }
  return (
    <>
      <Header />
      {detailBook ? (
        <div>
          <Link
            href="/"
            className="flex items-center text-button gap-2 text-danger hover-opacity-desc absolute left-5 top-24"
          >
            <span>&lt;</span>
            <span>Back</span>
          </Link>
          <div className="px-5 flex flex-col items-start gap-2 w-fit text-mainTextColor mt-12">
            {/* Title */}
            <div className="capitalize text-xl font-bold break-all my-6">
              {detailBook?.name}
            </div>
            <div className="mb-6">
              <div>
                <span className="font-bold">Author: </span>
                {detailBook?.author}
              </div>
              <div>
                <span className="font-bold">Topic: </span>
                {detailBook?.topic}
              </div>
            </div>
          </div>
          <button
            className="px-5 underline text-button cursor-pointer"
            onClick={() => setDeleteBookModalState(true)}
          >
            Delete
          </button>
        </div>
      ) : (
        Error()
      )}
      {deleteBookModalState && (
        <DeleteBookModal
          book={detailBook}
          setDeleteModalState={setDeleteBookModalState}
          confirm={deleteBook} // eslint-disable-line
        />
      )}
    </>
  )
}

export default BookDetail
