import React from 'react'
import Book from '../../types/books'

interface Props {
  book: Book
  setDeleteModalState: React.Dispatch<React.SetStateAction<boolean>>
  confirm: (id: number) => void
}

export default function DeleteBookModal({
  book,
  setDeleteModalState,
  confirm,
}: Props) {
  return (
    <div className="fixed top-0 left-0 z-10 pt-40 w-full h-full bg-black bg-opacity-40">
      <div className="relative m-auto p-0 bg-white w-1/4">
        <div>
          <div className="flex flex-row justify-between p-4">
            <h3 className=" text-xl font-bold text-black">Delete Book</h3>
            <button
              onClick={() => setDeleteModalState(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <span>&#x274c;</span>

              <span className="sr-only">Close Modal</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 text-center">
          <p>
            Are you sure you want to delete{' '}
            <span className="font-bold">{book.name}</span> item?
          </p>
        </div>
        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
            type="button"
            onClick={() => {
              confirm(book.id)
              setDeleteModalState(false)
            }}
            className="text-white bg-button hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => setDeleteModalState(false)}
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Cancle
          </button>
        </div>
      </div>
    </div>
  )
}
