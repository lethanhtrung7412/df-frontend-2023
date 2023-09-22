import React, {useState, useEffect} from 'react'
import "./Search.css"
export default function Search() {
    const [value, setValue] = useState("")


  return (
    <div class="search">
      <button class="button" id="add_book_open">Add book</button>
      <input type="text" placeholder="Search book" size="30" class="search-input" id="search" />
    </div>
  )
}
