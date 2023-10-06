'use client'

import React from 'react'

interface Props {
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  setAddBookModalState: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Search({
  searchValue,
  setSearchValue,
  setAddBookModalState,
}: Props) {
  return (
    <div className="p-5 flex flex-row-reverse items-end">
      <button
        className="p-3 bg-button text-white ml-3 rounded-md"
        onClick={() => {
          setAddBookModalState(true)
        }}
      >
        Add book
      </button>
      <input
        type="text"
        placeholder="Search book"
        className="p-3 rounded-md ring-slate-300 focus:ring-4 ring-1 border-solid"
        id="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  )
}
