import React from 'react'
import { FaSearch } from "react-icons/fa"

export default function Header({open, action, title, buttonValue}) {
  return (
    <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
    <h3 className="text-2xl font-medium leading-6 text-gray-900">{title}</h3>
    <div className="mt-3 sm:mt-0 sm:ml-4">
      <label htmlFor="seatch" className="sr-only">
        Search
      </label>
      <div className="flex rounded-md shadow-sm">
        <div className="relative flex-grow focus-within:z-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full h-full pl-10 border-gray-300 border rounded-none focus:ring-gray-500 focus:border-gray-500 rounded-l-md sm:hidden"
            placeholder="Search"
            // onChange={handleSearch}
          />
          <input
            type="text"
            name="search"
            id="search"
            className="hidden w-full h-full pl-10 border-gray-300 border rounded-none focus:ring-gray-500 focus:border-gray-500 rounded-l-md sm:block sm:text-sm"
            placeholder="Search"
            // onChange={handleSearch}
          />
        </div>
        <button
          type="button"
          onClick={action}
          className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium border border-indigo-700 rounded-r-md bg-indigo-700 hover:bg-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-white hover:text-indigo-700"
        >
            {buttonValue}
        {/* <FaSortAmountUpAlt className="w-5 h-5 text-gray-400" aria-hidden="true" />
        <span className="ml-2">Sort</span>
        <FaChevronDown className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
      </button>
      {/* <FormDialog handleChange={handleChange} handleSubmit={handleSubmit} open={open} setOpen={setOpen} /> */}
      </div>
    </div>
  </div>
  )
}
