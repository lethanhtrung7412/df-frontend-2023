import React, { useState } from 'react'

export default function useAddBook() {
    const [addBookIsOpen, setAddBookIsOpen] = useState(false);

    function addBookOpenPopup() {
        setAddBookIsOpen(true);
    }
    
    function addBookClosePopup() {
        setAddBookIsOpen(false);
    }
  
    return { addBookIsOpen, addBookOpenPopup, addBookClosePopup }
}
