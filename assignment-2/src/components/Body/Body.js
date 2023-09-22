import React from 'react'
import Search from './Search/Search'
import "./Body.css"
import Table from './Table/Table'
export default function Body() {
    return (
        <div className='body'>
            <Search />
            <Table/>
        </div>
    )
}
