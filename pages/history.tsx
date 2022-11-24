import React from 'react'
import Layout from '../components/Layout'
import Table from '../components/Table'
import { FaSortAmountUpAlt, FaChevronDown, FaSearch } from "react-icons/fa"
import jwtDecode from "jwt-decode"
import { useQuery } from "react-query"
import { getRequest } from "../api/apiCall"
import { TRANSACTIONS } from "../api/apiUrl"
import { queryKeys } from "../api/queryKey"
import Pagination from "../components/Pagination";

 
export default function History() {
  const mybank =
  typeof window !== "undefined" &&
  jwtDecode(localStorage?.getItem("my_bank_token"));
  const { data: transactionList, status, isFetching } = useQuery(
    [queryKeys.getTransactions],
    async () => await getRequest({ url: TRANSACTIONS }),
    {
      retry: 2,
    }
  );
  const [transactions, setTransactions] = React.useState(transactionList?.data)
  React.useEffect(()=>{
    setTransactions(transactionList?.data)
  },[transactionList?.data])
    return (
        <Layout>
        <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
    <h3 className="text-2xl font-medium leading-6 text-gray-900">Transaction History</h3>
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
        //   onClick={action}
          className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium border border-indigo-700 rounded-r-md bg-indigo-700 hover:bg-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-white hover:text-indigo-700"
        >
            Search
       
      </button>
      </div>
    </div>
  </div>
  <Pagination transactions={transactions} status={status} isFetching={isFetching} />
    </Layout>
    )
}