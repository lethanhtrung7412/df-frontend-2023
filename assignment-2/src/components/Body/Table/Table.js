import React from 'react'
import "./Table.css"
export default function Table() {
  return (
    <div className='book-list'>
        <table style={{width: "100%"}} id="book_list">
        <thead>
          <tr>
            <th style={{width: "50%;"}}>Name</th>
            <th style={{width: "20%;"}}>Author</th>
            <th style={{width: "20%;"}}>Topic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="add_book">
          <tr>
                <td>Refactoring</td>
                <td>Martin Flower</td>
                <td>Programming</td>
                <td className="delete">
                  Delete
                </td>
              </tr> 
        </tbody>
      </table>
    </div>
  )
}
