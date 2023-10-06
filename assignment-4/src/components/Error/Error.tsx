import Link from 'next/link'
import React from 'react'

export default function Error() {
  return (
    <div className="px-3 flex flex-col items-center justify-center gap-4 h-full w-full mx-auto text-mainTextColor">
      <h1 className="text-5xl md:text-7xl">404</h1>
      <p>Page not found</p>
      <Link
        href="/"
        className="flex items-center gap-2 text-sucess hover-opacity-desc text-button"
      >
        <span>&lt;</span>
        <span>Back to Home page</span>
      </Link>
    </div>
  )
}
