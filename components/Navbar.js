
import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav 
    className="flex flex-col sm:flex-row bg-slate-700 text-white min-h-16 justify-between p-3 items-center gap-3"
    >
      <Link href="/" className="logo font-bold text-xl sm:text-2xl">
        My Notes
      </Link>

      <ul className="flex flex-wrap justify-center gap-3 font-bold text-sm sm:text-base">
        <li className="hover:text-purple-300">
          <Link href="/">Home</Link>
        </li>

        <li className="hover:text-purple-300">
          <Link href="/my-notes">My Notes</Link>
        </li>

        <li className="hover:text-purple-300">
          <Link href="/about">About</Link>
        </li>

        <li className="hover:text-purple-300">
          <Link href="/contact">Contact Us</Link>
        </li>
      </ul>

      <Link
        href="/add-notes"
       className="bg-green-400 py-2 px-3 rounded-full text-white font-bold hover:bg-green-600 text-sm sm:text-base whitespace-nowrap"
      >
        + Add Notes
      </Link>
    </nav>
  )
}

export default Navbar
